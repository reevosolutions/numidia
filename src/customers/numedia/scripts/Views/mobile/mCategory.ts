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
		this.app.apiEndpoint = "mobile/category";
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
		this.renderMainList();
		onSuccess();
	}

	renderHeader(): any {
		let section: JQuery = $(".section-category-header");
		const tpl = require(`../../../parts/mobile/category-header.hbs`);
		$(
			tpl({
				name: this.app.data.content.currentCategory.name,
				lastUpdateDate: moment(this.app.data.content.lastUpdate * 1000).format('YYYY/MM/DD'),
			})
		).appendTo(".section-category-header");
	}

	renderFeatured(): any {
		let section: JQuery = $(".section-archive-featured.mobile");
		let wrapper: JQuery = section.find(".subsection.main");
		let card = new ArticleCard();
		card.template = "article-card/last-news-other";

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
		// main script
		$.each(this.app.data.content.slider, (i: number, article) => {
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
				.addClass("card-wrapper uk-margin-small")
				.append(card.render())
				.appendTo(wrapper);
		});
	}
	renderMainList(): any {
		let section: JQuery = $(".section-archive-main-list");
		let wrapper: JQuery = section.find(".subsection.main");
		// main script
		$.each(this.app.data.content.mainList, (i: number, article) => {
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
				.addClass("card-wrapper uk-margin-remove")
				.append(card.render())
				.appendTo(wrapper);
		});
	}
}
