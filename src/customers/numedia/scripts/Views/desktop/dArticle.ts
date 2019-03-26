import $ from "jquery";
import moment from "moment";
moment.locale("ar_dz");
import { View } from "../../../../../app/View";
import ArticleCard from "../../Components/ArticleCard";
import articleImage from "./../../../assets/images/article.jpg";
import Log from "../../../../../app/Utils/log";
import App from "../../Components/App";
import { Share, ShareNetworks } from "../../Components/Share";

let desc = "أعلنت اليوم وزارة الداخلية عن تنصيب المدير العام الجديد للشرطة";
export default class Article implements View {
	app: App;
	constructor(app: App) {
		this.app = app;
		this.app.apiEndpoint = "desktop/article";
	}

	/**
	 * start
	 */
	public start(onSuccess: Function, onFail: Function): void {}
	/**
	 * render
	 */
	public render(onSuccess: Function, onFila: Function): void {
		const tpl = require(`../../../parts/article.hbs`);
		this.app.data.content.currentArticle.createdAgo = moment(
			this.app.data.content.currentArticle.createdAt * 1000
		).fromNow();

		this.app.data.content.currentArticle.image =
			this.app.data.content.currentArticle.thumbs["thumb-800x500"] ||
			this.app.data.content.currentArticle.thumbs["full"] ||
			null;

		Log.success("article", this.app.data.content.currentArticle);
		
		App.FilterInDevice($(tpl(this.app.data.content.currentArticle))).appendTo(
			$(".current-article-wrapper").empty()
		);

		this.enableShare();

		this.renderMostPopular();
		this.renderReadMore();
	}
	enableShare(): any {
		Share.enable($(".sn-facebook"), ShareNetworks.facebook);
		Share.enable($(".sn-twitter"), ShareNetworks.twitter);
		Share.enable($(".sn-google_plus"), ShareNetworks.googleplus);
	}

	/**
	 * read more
	 */
	public renderReadMore(): void {
		let section: JQuery = $(".section-article-read-more");
		let wrapper: JQuery = section.find(".subsection.main");
		// main script
		$.each(this.app.data.content.readMore, (i: number, article) => {
			let card = new ArticleCard();
			card.template = "article-card/article-read-more";
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
				.appendTo(wrapper.children("*").first());
		});
	}

	/**
	 * most popular
	 */
	public renderMostPopular(): void {
		let section: JQuery = $(".section-article-most-popular");
		let wrapper: JQuery = section.find(".subsection.main");
		// main script
		$.each(this.app.data.content.mostPopular, (i: number, article) => {
			let card = new ArticleCard();
			card.template = "article-card/article-most-popular";
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
				.appendTo(wrapper);
		});
	}
}
