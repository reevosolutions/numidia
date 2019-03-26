import Component from "../../../../app/Component";
import $ from "jquery";
import moment from "moment";
moment.locale("ar_dz");
import {Share, ShareNetworks} from "../Components/Share";

export default class ArticleCard extends Component {
	_data!: {
		id: number;
		title: string;
		description: string;
		href: string;
		image: {
			url: string;
			width: number;
			height: number;
		};
	};

	constructor() {
		super();
		this._template = "article-card-default";
	}

	render(): JQuery {
		const tpl = require(`../../parts/${this.template}.hbs`);
		if (this.data.createdAt) {
			this.data.createdAgo = moment(this.data.createdAt * 1000).fromNow();
		}
		let $el = $(tpl(this.data));
		this.enableShare($el);
		return $el;
	}
	
	enableShare($el): any {
		Share.enable($el.find('.sn-facebook'), ShareNetworks.facebook);
		Share.enable($el.find('.sn-twitter'), ShareNetworks.twitter);
		Share.enable($el.find('.sn-google_plus'), ShareNetworks.googleplus);
	}
}
