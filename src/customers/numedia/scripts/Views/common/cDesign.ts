import $ from "jquery";
import { View } from "../../../../../app/View";
import App from "../../Components/App";
import design_homepage from "./../../../assets/images/homepage.jpg";
import design_serie from "./../../../assets/images/serie.jpg";

export default class Design implements View {
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
		let comp = $('<img>').attr('src', design_homepage);
		let comp2 = $('<img>').attr('src', design_serie);
	}
}
