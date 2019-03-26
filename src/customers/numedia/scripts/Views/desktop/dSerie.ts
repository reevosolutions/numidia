import $ from "jquery";
import { View } from "../../../../../app/View";
import ArticleCard from "../../Components/ArticleCard";
import articleImage from "./../../../assets/images/article.jpg";
import otherProgramsBGImage from "./../../../assets/images/serie-other-programs-bg.png";
import Log from "../../../../../app/Utils/log";
import App from "../../Components/App";
import moment from "moment";
import UIkit from "uikit";
moment.locale("ar_dz");

export default class Serie implements View {
	app: App;
	pageToken: any = "";
	lastEpisode: any;
	constructor(app: App) {
		this.app = app;
		this.app.apiEndpoint = "desktop/serie";
	}

	/**
	 * start
	 */
	public start(onSuccess: Function, onFail: Function): void {}
	/**
	 * render
	 */
	public render(onSuccess: Function, onFila: Function): void {
		this.renderHeader();
		this.loadEpisodes((episodes: any[]) => {
			if (episodes.length && !this.lastEpisode) {
				this.lastEpisode = episodes[0].ytid;
			}
			this.renderEpisodes(episodes);
		});
		this.renderOtherPrograms();
	}

	renderHeader(): void {
		let self = this;
		const tpl = require(`../../../parts/serie-header.hbs`);

		if (this.app.data.content.currentSerie.createdAt) {
			this.app.data.content.currentSerie.createdAgo = moment(
				this.app.data.content.currentSerie.createdAt * 1000
			).fromNow();
			this.app.data.content.currentSerie.showTimesText = `يعرض ${
				this.app.data.content.currentSerie.showDays
			} على الساعة ${this.app.data.content.currentSerie.showTimes}`;
			this.app.data.content.currentSerie.image =
				this.app.data.content.currentSerie.thumbs["thumb-800x500"] ||
				(this.app.data.content.currentSerie.thumbs["thumb-400x250"] ||
					this.app.getArticleImagePlaceholder());
		}
		$(tpl(this.app.data.content.currentSerie)).appendTo(
			".section-serie-header > .subsection.main"
		);

		$(".play-current-episode").on("click", function(e) {
			e.preventDefault();
			Log.event("play-current-episode", "click");
			$("#youtube-player").attr(
				"src",
				`https://www.youtube.com/embed/${self.lastEpisode}?autoplay=1`
			);
			UIkit.modal("#modal-youtube-player").show();
		});
	}

	renderOtherPrograms(): any {
		let bg = $("<img>").attr("src", otherProgramsBGImage);
		let section: JQuery = $(".section-other-programs");
		let wrapper: JQuery = section.find(".subsection.main");
		const tplSlideshow = require(`../../../parts/uk/slideshow-serie-other-programs.hbs`);
		let slideshow: JQuery = $(tplSlideshow({})).appendTo(wrapper);

		$.each(this.app.data.content.otherPrograms, (i, article) => {
			// main script
			let card = new ArticleCard();
			card.template = "article-card/serie-other-program";
			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-400x250"] ||
					this.app.getArticleImagePlaceholder(),
				description: ""
			});

			$("<div>")
				.addClass("card-wrapper")
				.append(card.render())
				.appendTo(slideshow.find(".items"));
		});
	}

	renderEpisodes(episodes: any[]): any {
		let section: JQuery = $(".section-serie-episodes");
		let wrapper: JQuery = section.find(".subsection.main");
		const tplSlideshow = require(`../../../parts/uk/slideshow-videos.hbs`);
		let slideshow: JQuery = $(
			tplSlideshow({
				slidenavLabel: "مرر للمزيد من الحلقات"
			})
		).appendTo(wrapper);
		let item: JQuery = $("<div></div>");
		// main script
		$("#modal-youtube-player").on({
			"hide.uk.modal": function() {
				$("#youtube-player").attr("src", ``);
			}
		});
		$.each(episodes, (i: number, article) => {
			if (i % 6 === 0) {
				item = $(
					'<div class="slide-item"><div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-small item" uk-grid ></div></div>'
				).appendTo(slideshow.find(".items"));
			}
			let card = new ArticleCard();
			card.template = "article-card/episode";
			card.data = $.extend(article, {
				description: $("<div>")
					.html(article.description)
					.text()
			});

			let $card = card.render();
			$card.on("click", function(e) {
				e.preventDefault();
				$("#youtube-player").attr(
					"src",
					`https://www.youtube.com/embed/${article.ytid}?autoplay=1`
				);
				UIkit.modal("#modal-youtube-player").show();
			});
			$("<div>")
				.addClass("card-wrapper")
				.append($card)
				.appendTo(item.children("*").first());
		});
	}

	loadEpisodes(onSuccess: (episodes: any[]) => void): any {
		let self = this;
		let videoIDS: any[] = [];
		var apiPL = `https://www.googleapis.com/youtube/v3/playlistItems?maxResults=48&pageToken=${
			this.pageToken
		}&part=contentDetails&playlistId=${
			this.app.data.content.currentSerie.plid
		}&key=${this.app.config.youtubeApiKey}`;

		$.getJSON(apiPL, function(res, textStatus, jqXHR) {
			Log.todo("apiPL", apiPL, res);
			self.pageToken = res.nextPageToken;
			if (res.items && res.items.length) {
				$.each(res.items, function(i, v) {
					videoIDS.push(v.contentDetails.videoId);
				});
			}

			if (videoIDS.length) {
				var apiVideos =
					"https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
					videoIDS.join(",") +
					"&key=" +
					self.app.config.youtubeApiKey;

				$.getJSON(apiVideos, function(res, textStatus, jqXHR) {
					let episodes: any[] = [];
					Log.todo("apiVideos", apiVideos, res);
					if (res.items && res.items.length) {
						$.each(res.items, function(i, v) {
							episodes.push({
								ytid: v.id,
								id: 0,
								href: "#",
								title: v.snippet.title,
								image: v.snippet.thumbnails.maxres
									? v.snippet.thumbnails.maxres
									: v.snippet.thumbnails.medium,
								createdAt: moment(v.snippet.publishedAt).unix(),
								createdDate: moment(v.snippet.publishedAt).format("YYYY/MM/DD"),
								createdAgo: moment(v.snippet.publishedAt).fromNow(),
								// 'date' => $date,
								episodeNumber: "",
								snippet: v.snippet
							});
						});
						episodes.sort(function(a, b) {
							return a.createdAt < b.createdAt ? 1 : -1;
						});
						onSuccess(episodes);
					} else {
					}
				});
			}
		});
	}
}
