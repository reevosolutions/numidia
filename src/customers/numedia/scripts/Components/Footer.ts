import $ from "jquery";
import Log from "../../../../app/Utils/log";
import logo from "./../../assets/images/logo-big.png";
import Component from "../../../../app/Component";
import App from "./App";

export default class Footer extends Component {
	app: App;

	constructor(app: App) {
		super();
		this.app = app;
	}

	/**
	 * render
	 */
	public render(): JQuery {
		let tpl;
		if(this.app.mobile)
			tpl = require(`../../parts/footer/mobile.hbs`);
		else
			tpl = require(`../../parts/footer/desktop.hbs`);
		
		return $(tpl(this.app.data));
	}
}
