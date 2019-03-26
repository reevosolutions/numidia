import $ from "jquery";
// require('jquery.easing')($);
import { View } from "../../../../../app/View";
import ArticleCard from "../../Components/ArticleCard";
import Weather from "../../Components/Weather";
import articleImage from "./../../../assets/images/article.jpg";
import sliderImage_0 from "./../../../assets/images/slider-1.jpg";
import sliderImage_1 from "./../../../assets/images/slider-2.jpg";
import ellipseSeparator from "./../../../assets/svg/ellipse-separator.svg";
import Log from "../../../../../app/Utils/log";
import App from "../../Components/App";
import "caroufredsel";
import moment = require("moment");
moment.locale("ar_dz");

const desc = "أعلنت اليوم وزارة الداخلية عن تنصيب المدير العام الجديد للشرطة";

export default class Homepage implements View {
	app: App;
	constructor(app: App) {
		this.app = app;
		this.app.apiEndpoint = "desktop/homepage";
	}

	/**
	 * start
	 */
	public start(onSuccess: Function, onFail: Function): void {
		var self = this;
		self.render(
			() => {
				onSuccess();
			},
			err => {
				onFail(err);
			}
		);
	}
	/**
	 * render
	 */
	public render(onSuccess: Function, onFila: Function): void {
		let wWeather = new Weather(this.app);
		wWeather.render().appendTo($(".widget-weather > .widget-content"));

		let sep = $("<img>").attr("src", ellipseSeparator);
		let scrollspyTimeoutHandle;

		$(".current-date").text(moment().format("DD MMMM YYYY"));
		$(".sidemenu.scrollspy").on("active.uk.scrollspy", function() {
			window.clearTimeout(scrollspyTimeoutHandle);
			let $active = $(this).children(".uk-active");
			scrollspyTimeoutHandle = window.setTimeout(function() {
				let o: any = $active.offset(),
					st: any = $("body, html").scrollTop(),
					t: number = o.top - st,
					w: any = $active.width();
				$(".indicator")
					.show()
					.html($active.children('a').html())
					.stop()
					.css({
						top: t,
						width: w
					});
			}, 100);
		});

		this.fixSidebar();
		// this.renderSlider();
		this.renderSliderV2();
		this.renderLastNews();
		this.renderTodayPrograms();
		this.renderVideos();
		this.renderOtherNews();
		this.renderPlaylist();
	}
	fixSidebar(): any {
		$('.section-last-news').find('.widget_polls-widget').addClass('uk-border-rounded uk-background-default uk-box-shadow-small uk-box-shadow-hover-medium uk-margin uk-margin-bottom')
	}

	public renderSlider(): void {
		let section: JQuery = $(".section-main-slider");
		let wrapper: JQuery = section.find(".subsection.main");

		const tplSlideshow = require(`../../../parts/uk/slideshow-main-slider.hbs`);
		let slideshow: JQuery = $(tplSlideshow(this.app.data)).appendTo(wrapper);
		// main script
		$.each(this.app.data.content.slider, (i: number, article) => {
			let card = new ArticleCard();
			card.template = "article-card/main-slider";
			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-800x500"] ||
					article.thumbs["thumb-400x250"] ||
					this.app.getArticleImagePlaceholder(),
				description: $("<div>")
					.html(article.description)
					.text()
			});
			$("<div>")
				.addClass("card-wrapper")
				.data("article", card.data)
				.append(card.render())
				.appendTo(slideshow.find(".items"));
		});

		let $infos = $('.slideshow-main-slider-infos-wrapper');
		slideshow.find(".card-wrapper").on('beforeitemhide', function(){
			Log.event('slider beforeitemhide', $(this).data('article'));
			$infos.addClass('transition');
		});
		slideshow.find(".card-wrapper").on('beforeitemshow', function(){
			$infos.find('.title').text($(this).data('article').title);
			$infos.find('.description').text($("<div>").html($(this).data('article').description).text());
			$infos.find('.times').text($(this).data('article').timeStart);
			$infos.find('.days').text($(this).data('article').showDays);
		 });
		slideshow.find(".card-wrapper").on('itemshown', function(){
			Log.event('slider itemshown', $(this).data('article'));
			$infos.removeClass('transition');
		 });
	}
	public renderSliderV2(): void {
		let section: JQuery = $(".section-main-slider");
		let wrapper: JQuery = section.find(".subsection.main");

		const tplSlideshow = require(`../../../parts/uk/slideshow-main-slider-v2.hbs`);
		let slideshow: JQuery = $(tplSlideshow(this.app.data)).appendTo(wrapper);
		// main script
		$.each(this.app.data.content.slider, (i: number, article) => {
			let card = new ArticleCard();
			card.template = "article-card/main-slider-v2";
			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-800x500"] ||
					article.thumbs["thumb-400x250"] ||
					article.thumbs["full"] ||
					this.app.getArticleImagePlaceholder(),
				description: $("<div>")
					.html(article.description)
					.text()
			});
			$("<div>")
				.addClass("card-wrapper")
				.data("article", card.data)
				.append(card.render())
				.appendTo(slideshow.find(".items"));
		});

		let articleData;
		slideshow.find(".card-wrapper").on('beforeitemhide', function(){
			Log.event('slider beforeitemhide', $(this).data('article'));
			wrapper.addClass('transition');
		});
		slideshow.find(".card-wrapper").on('beforeitemshow', function(){
			// articleData = $(this).data('article');
			// wrapper.find('.article-link').attr('href', articleData.href);
			// wrapper.find('.title').text(articleData.title);
			// wrapper.find('.description').text($("<div>").html(articleData.description).text());
			// wrapper.find('.times').text(articleData.timeStart);
			// wrapper.find('.days').text(articleData.showDays);
		 });
		slideshow.find(".card-wrapper").on('itemshown', function(){
			articleData = $(this).data('article');
			wrapper.find('.article-link').attr('href', articleData.href);
			wrapper.find('.title').text(articleData.title);
			wrapper.find('.description').text($("<div>").html(articleData.description).text());
			wrapper.find('.times').text(articleData.timeStart);
			wrapper.find('.days').text(articleData.showDays);
			Log.event('slider itemshown', $(this).data('article'));
			wrapper.removeClass('transition');
		 });
	}

	public renderSliderOld(): void {
		let section: JQuery = $(".section-main-slider");
		let wrapper: JQuery = section.find(".subsection.main");

		const tplSlideshow = require(`../../../parts/uk/slideshow-main-slider.hbs`);
		let slideshow: JQuery = $(tplSlideshow({})).appendTo(wrapper);
		// main script
		$.each(this.app.data.content.slider, (i: number, article) => {
			let card = new ArticleCard();
			card.template = "article-card/main-slider";
			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-1200"] || this.app.getArticleImagePlaceholder(),
				description: $("<div>")
					.html(article.description)
					.text()
			});
			$("<div>")
				.addClass("card-wrapper")
				.append(card.render())
				.appendTo(slideshow.find(".items"));
		});
	}
	/**
	 * Last news
	 */
	public renderLastNews(): void {
		let section: JQuery = $(".section-last-news");
		let wrapper: JQuery = section.find(".subsection.main");
		let item: JQuery = $("<div></div>");
		let places = {
			featured: wrapper.find(".place-featured").empty(),
			other: wrapper.find(".place-other").empty()
		};
		// main script
		$.each(this.app.data.content.lastNews, (i: number, article) => {
			const place: string = i === 0 ? "featured" : "other";

			if ((i-1) % 4 === 0) {
				item = $(
					'<div class="slide-item"><div class="uk-grid-small uk-child-width-1-2@s" uk-grid ></div></div>'
				).appendTo(places.other);
			}

			let card = new ArticleCard();
			card.template = "article-card/last-news-" + place;
			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-400x250"] ||
					this.app.getArticleImagePlaceholder(),
					description: $("<div>")
					.html(article.description)
					.text()
			});


			$("<div>")
				.addClass("card-wrapper")
				.append(card.render())
				.appendTo(i === 0 ? places.featured : item.children("*").first());
		});
	}
	/**
	 * Last news
	 */
	public renderTodayPrograms(): void {
		let section: JQuery = $(".section-today-programs");
		let wrapper: JQuery = section.find(".subsection.main");
		let carousel: JQuery = wrapper.find(".carousel");

		let cTime = moment();
		let index: number = -1;
		let cArticle, nArticle, lArticle;
		// main script
		$.each(this.app.data.content.todayPrograms, (i: number, article) => {
			let card = new ArticleCard();
			let st: any = article.timeStart.split(":"),
				et: any = article.timeEnd.split(":");
			if (
				cTime >=
					moment()
						.set("hour", st[0])
						.set("minute", st[1]) &&
				cTime <
					moment()
						.set("hour", et[0])
						.set("minute", et[1])
			) {
				index = i;
				cArticle = article;
				if (index > 0) nArticle = this.app.data.content.todayPrograms[i - 1];
				if (index > 1) lArticle = this.app.data.content.todayPrograms[i - 2];
			}

			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-800x500"] ||
					this.app.getArticleImagePlaceholder(),
				description: $("<div>")
					.html(article.description)
					.text()
			});

			card.template = "article-card/timeline";

			$("<div>")
				.addClass("card-wrapper")
				.append(card.render())
				.appendTo(carousel);
		});

		if(cArticle) $('.section-today-programs .subsection.footer .current > .value').text(cArticle.title);
		else $('.section-today-programs .subsection.footer .current').remove();
		if(nArticle) $('.section-today-programs .subsection.footer .next > .value').text(nArticle.title);
		else $('.section-today-programs .subsection.footer .next').remove();
		if(lArticle) $('.section-today-programs .subsection.footer .later > .value').text(lArticle.title);
		else $('.section-today-programs .subsection.footer .later').remove();


		// start carousel
		var defaultCss = {
			width: 300,
			height: 290,
			marginTop: 50,
			marginRight: 10,
			marginLeft: 10,
			opacity: 1
		};
		var selectedCss = {
			width: 580,
			height: 510,
			marginTop: 0,
			marginRight: 10,
			marginLeft: 10,
			opacity: 1
		};
		var aniOpts = {
			queue: false,
			duration: 1000,
			easing: "elastic"
		};
		for (var a = 0; a < 2; a++) {
			carousel.prepend('<div class="card-wrapper" />');
		}
		for (var b = 0; b < 2; b++) {
			carousel.append('<div  class="card-wrapper" />');
		}

		Log.success("tl length", carousel.find(".card-wrapper").length, index);
		Log.success("tl cArticles", cArticle, nArticle, lArticle);
		let cIndex = index || carousel.find(".card-wrapper").length - 2;
		carousel.find(".card-wrapper").css(defaultCss);
		carousel
			.find(".card-wrapper")
			.eq(2)
			.addClass("active")
			.css(selectedCss);
		carousel.carouFredSel({
			circular: false,
			infinite: false,
			width: "100%",
			height: 510,
			items: {
				visible: 5,
				start: cIndex
			},
			prev: "#tl-carousel-prev",
			next: "#tl-carousel-next",
			auto: false,
			scroll: {
				items: 1,
				duration: 1000,
				easing: "elastic",
				onBefore: function(data) {
					// Log.step("old", data.items.old.eq(2));
					// Log.step("visible", data.items.visible.eq(2));
					data.items.old
						.eq(2)
						.removeClass("active")
						.animate(defaultCss, aniOpts);
					data.items.visible
						.eq(2)
						.addClass("active")
						.animate(selectedCss, aniOpts);
				}
			}
		});

		// end carousel
	}
	/**
	 * Videos
	 */
	public renderVideos(): void {
		let section: JQuery = $(".section-videos");
		let wrapper: JQuery = section.find(".subsection.main");
		const tplSlideshow = require(`../../../parts/uk/slideshow-videos.hbs`);
		let slideshow: JQuery = $(tplSlideshow({})).appendTo(wrapper);
		let item: JQuery = $("<div></div>");
		// main script
		$.each(this.app.data.content.videos, (i: number, article) => {
			if (i % 6 === 0) {
				item = $(
					'<div class="slide-item"><div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-small item" uk-grid ></div></div>'
				).appendTo(slideshow.find(".items"));
			}
			let card = new ArticleCard();
			card.template = "article-card/video";
			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-400x250"] ||
					this.app.getArticleImagePlaceholder(),
				description: $("<div>")
					.html(article.description)
					.text()
			});

			$("<div>")
				.addClass("card-wrapper")
				.append(card.render())
				.appendTo(item.children("*").first());
		});
	}
	/**
	 * other news
	 */
	public renderOtherNews(): void {
		let section: JQuery = $(".section-other-news");
		let wrapper: JQuery = section.find(".subsection.main");
		const tplSlideshow = require(`../../../parts/uk/slideshow-videos.hbs`);
		let slideshow: JQuery = $(tplSlideshow({})).appendTo(wrapper);
		let item: JQuery = $("<div></div>");
		// main script
		$.each(this.app.data.content.otherNews, (i: number, article) => {
			if (i % 6 === 0) {
				item = $(
					'<div class="slide-item"><div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-small item" uk-grid ></div></div>'
				).appendTo(slideshow.find(".items"));
			}
			let card = new ArticleCard();
			card.template = "article-card/other-news";
			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-400x250"] ||
					this.app.getArticleImagePlaceholder(),
				description: $("<div>")
					.html(article.description)
					.text()
			});

			$("<div>")
				.addClass("card-wrapper")
				.append(card.render())
				.appendTo(item.children("*").first());
		});
	}
	/**
	 * other news
	 */
	public renderPlaylist(): void {
		let section: JQuery = $(".section-playlist");
		let wrapper: JQuery = section.find(".subsection.main");

		$.each(this.app.data.content.playlist, (i, cat) => {
			wrapper
				.find(".tabs")
				.append('<li><a href="#">' + cat.categoryName + "</a></li>");
			let content: JQuery = $(
				'<div class="uk-container-expand"></div>'
			).appendTo(wrapper.find(".contents"));

			const tplSlideshow = require(`../../../parts/uk/slideshow-playlist.hbs`);
			let slideshow: JQuery = $(tplSlideshow({})).appendTo(content);
			// main script
			$.each(cat.articles, (i, article) => {
				let card = new ArticleCard();
				card.template = "article-card/playlist";
				card.data = $.extend(article, {
					image:
						article.thumbs["thumb-800x500"] ||
						this.app.getArticleImagePlaceholder(),
					description: $("<div>")
						.html(article.description)
						.text()
				});

				$("<div>")
					.addClass("card-wrapper")
					.append(card.render())
					.appendTo(slideshow.find(".items"));
			});
		});
	}
}
