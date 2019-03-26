import $ from "jquery";
// require('jquery.easing')($);
import UIkit from "uikit";
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
		this.app.apiEndpoint = "mobile/homepage";
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
		$(".current-date").text(moment().format("DD MMMM YYYY"));

		this.renderHeaderContent();
		this.renderSlider();
		this.renderLastNews();
		this.renderTodayPrograms();
		this.renderVideos();
		this.renderOtherNews();
	}
	renderHeaderContent(): any {
		let tpl = require('../../../parts/mobile/header-content.hbs');
		$(tpl(this.app.data)).appendTo('.header-content');
	}
	public renderSlider(): void {
		let section: JQuery = $(".section-main-slider");
		let wrapper: JQuery = section.find(".subsection.main");

		const tplSlideshow = require(`../../../parts/uk/slideshow-main-slider-mobile.hbs`);
		let slideshow: JQuery = $(tplSlideshow({})).appendTo(wrapper);
		// main script
		$.each(this.app.data.content.slider, (i: number, article) => {
			let card = new ArticleCard();
			card.template = "article-card/mobile/main-slider";
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

		let $infos = $('.slideshow-main-slider-mobile-infos-wrapper');
		slideshow.find(".card-wrapper").on('beforeitemhide', function(){
			Log.event('slider beforeitemhide', $(this).data('article'));
			$infos.addClass('transition');
		});
		slideshow.find(".card-wrapper").on('beforeitemshow', function(){
			$infos.find('.title').text($(this).data('article').title);
			$infos.find('.times').text($(this).data('article').timeStart);
			$infos.find('.days').text($(this).data('article').showDays);
		 });
		slideshow.find(".card-wrapper").on('itemshown', function(){
			Log.event('slider itemshown', $(this).data('article'));
			$infos.removeClass('transition');
		 });
	}
	/**
	 * Last news
	 */
	public renderLastNews(): void {
		let section: JQuery = $(".section-last-news");
		let wrapper: JQuery = section.find(".subsection.main .items");
		let moreWrapper: JQuery = section.find(".subsection.more .items");
		// main script
		$.each(this.app.data.content.lastNews, (i: number, article) => {
			let card = new ArticleCard();
			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-800x500"] ||
					article.thumbs["thumb-400x250"] ||
					this.app.getArticleImagePlaceholder(),
				description: $("<div>")
					.html(article.description)
					.text()
			});

			card.template = "article-card/last-news-other";

			$("<div>")
				.addClass("card-wrapper")
				.append(card.render())
				.appendTo(i < 4 ? wrapper : moreWrapper);
		});
	}
	/**
	 * Last news
	 */
	public renderTodayPrograms(): void {
		let section: JQuery = $(".section-today-programs");
		let wrapper: JQuery = section.find(".subsection.main");
		const tplSlideshow = require(`../../../parts/uk/slideshow-timeline-mobile.hbs`);
		let slideshow: JQuery = $(tplSlideshow({})).appendTo(wrapper);
		window.slideshow = slideshow;
		let cTime = moment();
		let cId: number = 0;
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
				cId = article.id;
				cArticle = article;
				if (i > 0) nArticle = this.app.data.content.todayPrograms[i - 1];
				if (i > 1) lArticle = this.app.data.content.todayPrograms[i - 2];
			}

			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-800x500"] ||
					article.thumbs["thumb-400x250"] ||
					this.app.getArticleImagePlaceholder(),
				description: $("<div>")
					.html(article.description)
					.text()
			});

			card.template = "article-card/mobile/timeline";
			$("<div>")
			.addClass("card-wrapper")
			.addClass("card-" + article.id)
			.append(card.render())
			.prependTo(slideshow.find(".items"));
		});

		if(cArticle) $('.section-today-programs .subsection.footer .current > .value').text(cArticle.title);
		else $('.section-today-programs .subsection.footer .current').remove();
		if(nArticle) $('.section-today-programs .subsection.footer .next > .value').text(nArticle.title);
		else $('.section-today-programs .subsection.footer .next').remove();
		if(lArticle) $('.section-today-programs .subsection.footer .later > .value').text(lArticle.title);
		else $('.section-today-programs .subsection.footer .later').remove();

		if(cId){
			let cIndex = slideshow.find('.card-'+cId).index() || 0;
			UIkit.slider(slideshow).show(cIndex);
		}
		

		// end carousel
	}
	/**
	 * Videos
	 */
	public renderVideos(): void {
		let section: JQuery = $(".section-videos");
		let wrapper: JQuery = section.find(".subsection.main");
		// const tplSlideshow = require(`../../../parts/uk/slideshow-videos-mobile.hbs`);
		// let slideshow: JQuery = $(tplSlideshow({})).appendTo(wrapper);
		let item: JQuery = $("<div></div>");
		// main script
		$.each(this.app.data.content.videos, (i: number, article) => {
			let card = new ArticleCard();
			// 	item = $(
			// 		'<div class="slide-item"><div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-small item" uk-grid ></div></div>'
			// 	).appendTo(slideshow.find(".items"));
			if (i % 6 === 0) {
				card.template = "article-card/mobile/video-featured";
			}
			else{
				card.template = "article-card/mobile/video-other";
			}
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
				.addClass("card-wrapper uk-margin-small")
				.append(card.render())
				.appendTo(wrapper.find((i % 6 === 0) ? '.subsection.featured' : '.subsection.other'));
		});
	}
	/**
	 * other news
	 */
	public renderOtherNews(): void {
		let section: JQuery = $(".section-other-news");
		let firstWrapper: JQuery = section.find(".subsection.main > .first");
		let secondWrapper: JQuery = section.find(".subsection.main > .second");
		// main script
		$.each(this.app.data.content.otherNews, (i: number, article) => {
			let card = new ArticleCard();
			card.template = "article-card/mobile/article-related";
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
				.append(card.render())
				.appendTo(i < 2 ? firstWrapper : secondWrapper);
		});
	}
}
