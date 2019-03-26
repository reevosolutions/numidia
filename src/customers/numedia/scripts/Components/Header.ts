import $ from "jquery";
import Log from "../../../../app/Utils/log";
import Menu from "../../../../app/Utils/Menu";
import Component from "../../../../app/Component";
import App from "./App";

export default class Header extends Component {
	app: App;

	constructor(app: App) {
		super();
		this.app = app;
	}

	/**
	 * render
	 */
	public render(): JQuery {
		this.app.data.menus.main = Menu.mapIsActive(this.app.data.menus.main);
		window.data = this.app.data;
		let tpl;
		if (this.app.mobile) {
			this.app.data.menus.main = Menu.addIcons(this.app.data.menus.main);
			tpl = require(`../../parts/header/mobile.hbs`);
		} else tpl = require(`../../parts/header/desktop.hbs`);
		return $(tpl(this.app.data));
	}
}
