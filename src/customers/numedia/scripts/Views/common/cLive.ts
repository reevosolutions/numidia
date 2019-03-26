
import $ from "jquery";
import { View } from "../../../../../app/View";
import ArticleCard from "../../Components/ArticleCard";
import Log from "../../../../../app/Utils/log";
import App from "../../Components/App";

export default class Live implements View {
	app: App;
	constructor(app: App) {
		this.app = app;
		this.app.apiEndpoint = this.app.mobile ? "mobile/any" : "desktop/any";
	}

	/**
	 * start
	 */
	public start(onSuccess: Function, onFail: Function): void {}
	/**
	 * render
	 */
	public render(onSuccess: Function, onFila: Function): void {
		
	}
}
