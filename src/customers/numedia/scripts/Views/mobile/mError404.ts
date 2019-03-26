import $ from "jquery";
import { View } from "../../../../../app/View";
import ArticleCard from "../../Components/ArticleCard";
import articleImage from "./../../../assets/images/article.jpg";
import Log from "../../../../../app/Utils/log";
import App from "../../Components/App";

export default class Error404 implements View {
	app: App;
	constructor(app: App) {
		this.app = app;
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
		
	}
}
