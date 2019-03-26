import $ from "jquery";
import { View } from "../../../../../app/View";
import ArticleCard from "../../Components/ArticleCard";
import articleImage from "./../../../assets/images/article.jpg";
import Log from "../../../../../app/Utils/log";
import App from "../../Components/App";
import moment = require("moment");

// var $ = require('jquery');
require("jquery-mousewheel")($);
require("malihu-custom-scrollbar-plugin")($);

export default class Category implements View {
	app: App;
	constructor(app: App) {
		this.app = app;
		this.app.apiEndpoint = "desktop/category";
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
		this.renderFeatured();
		this.renderSlider();
		
		if(this.app.data.content.mostPopular) this.renderMostPopular();
		if(this.app.data.content.mainList) this.renderMainList();
		onSuccess();
	}

	renderHeader(): any {
		let section: JQuery = $(".section-category-header");
		const tpl = require(`../../../parts/category-header.hbs`);
		$(
			tpl({
				name: this.app.data.content.currentCategory.name,
				lastUpdateDate: moment(this.app.data.content.lastUpdate * 1000).format('YYYY/MM/DD'),
			})
		).appendTo(".section-category-header");
	}

	renderFeatured(): any {
		let section: JQuery = $(".section-archive-featured");
		let wrapper: JQuery = section.find(".subsection.main");
		let card = new ArticleCard();
		card.template = "article-card/category-featured";

		$.each(this.app.data.content.featured, (i: number, article) => {
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
				.appendTo(wrapper);
		});
	}
	renderSlider(): any {
		let section: JQuery = $(".section-archive-slider");
		let wrapper: JQuery = section.find(".subsection.main");
		const tplSlideshow = require(`../../../parts/uk/slideshow-videos.hbs`);
		let slideshow: JQuery = $(tplSlideshow({})).appendTo(wrapper);
		let item: JQuery = $("<div></div>");
		// main script
		$.each(this.app.data.content.slider, (i: number, article) => {
			if (i % 6 === 0) {
				item = $(
					'<div class="slide-item "><div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-small item" uk-grid ></div></div>'
				).appendTo(slideshow.find(".items"));
			}
			let card = new ArticleCard();
			card.template = "article-card/article-read-more";
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
	renderMostPopular(): any {
		
		Log.step('renderMostPopular');

		let section: JQuery = $(".section-archive-most-popular");
		let wrapper: JQuery = section.find(".subsection.main");
		// main script
		$.each(this.app.data.content.mostPopular, (i: number, article) => {
			let card = new ArticleCard();
			card.template = "article-card/category-most-popular";
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
				.appendTo(wrapper);
		});
		const options: MCustomScrollbar.CustomScrollbarOptions = {
			axis: "y",
			theme: "numedia"
		};
		wrapper.mCustomScrollbar(options);
	}
	renderMainList(): any {
		let section: JQuery = $(".section-archive-main-list");
		let wrapper: JQuery = section.find(".subsection.main");
		Log.step('renderMainList');
		
		// main script
		$.each(this.app.data.content.mainList, (i: number, article) => {
			let card = new ArticleCard();
			card.template = "article-card/category-main-item";
			card.data = $.extend(article, {
				image:
					article.thumbs["thumb-400x250"] ||
					this.app.getArticleImagePlaceholder(),
				description: $("<div>")
					.html(article.description)
					.text()
			});
			Log.event('main item data', card.data);
			$("<div>")
				.addClass("card-wrapper")
				.append(card.render())
				.appendTo(wrapper);
		});
		const options: MCustomScrollbar.CustomScrollbarOptions = {
			axis: "y",
			theme: "numedia"
		};
		wrapper.mCustomScrollbar(options);
	}
}
