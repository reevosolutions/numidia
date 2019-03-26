import $ from "jquery";
import { View } from "../../../../../app/View";
import ArticleCard from "../../Components/ArticleCard";
import articleImage from "./../../../assets/images/article.jpg";
import Log from "../../../../../app/Utils/log";
import App from "../../Components/App";

export default class Construction implements View {
	app: App;
	constructor(app: App) {
		this.app = app;
		this.app.apiEndpoint = this.app.mobile ? "mobile/any" : "desktop/any";
	}

	/**
	 * start
	 */
	public start(onSuccess: Function, onFail: Function): void {

	}
	/**
	 * render
	 */
	public render(onSuccess: Function, onFila: Function): void {
		$('.wpcf7-text').addClass('uk-input');
		$('.wpcf7-submit').addClass('uk-button uk-button-primary');
		$('.wpcf7-textarea').addClass('uk-textarea');
		$('.wpcf7-file').wrap('<div class="js-upload" uk-form-custom></div>').after('<button class="uk-button uk-button-secondary" type="button" tabindex="-1">اختر ملفا من جهازك</button>');
	}
}
