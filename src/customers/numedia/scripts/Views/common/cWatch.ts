
import $ from "jquery";
import { View } from "../../../../../app/View";
import ArticleCard from "../../Components/ArticleCard";
import articleImage from "./../../../assets/images/article.jpg";
import Log from "../../../../../app/Utils/log";
import App from "../../Components/App";

export default class Watch implements View {
	app: App;
	constructor(app: App) {
		this.app = app;
		this.app.apiEndpoint = this.app.mobile ? "mobile/watch" : "desktop/watch";
	}

	/**
	 * start
	 */
	public start(onSuccess: Function, onFail: Function): void {}
	/**
	 * render
	 */
	public render(onSuccess: Function, onFila: Function): void {
		let q:any = vv.query;
		$('.section-search-header .query').text(q);
		this.renderContent();
	}
	renderContent(): any {
		let section: JQuery = $(".section-search-results");
		let wrapper: JQuery = section.find(".subsection.main");
		let list = wrapper.find(".content-items").empty();
		// main script
		$.each(this.app.data.content.items, (i: number, article) => {
			let card = new ArticleCard();
			card.template = "article-card/serie-other-program";

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
				.appendTo(list);
		});
	}
}
