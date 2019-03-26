import Component from "../../../../app/Component";
import $ from "jquery";
import moment from "moment";
import App from "./App";
import Log from "../../../../app/Utils/log";
import SampleData from "./SampleData";
moment.locale("ar_dz");

interface ShareElements {
	url: string;
	text?: string;
	title?: string;
	to?: string;
	via?: string;
	hashtags?: string;
	media?: string;
}

export class ShareNetworks {
	static email: string = "email";
	static twitter: string = "twitter";
	static facebook: string = "facebook";
	static googleplus: string = "googleplus";
	static messenger: string = "messenger";
	static whatsapp: string = "whatsapp";
}

export class Share extends Component {
	public static strategy: string = "popup";
	private static _shareStrategies = {
		popup: function($el: JQuery, shareUrl: string) {
			return $el.on("click", function(e) {
				e.preventDefault();
				window.open(
					shareUrl,
					undefined,
					"width=600, height=400, location=0, menubar=0, resizeable=0, scrollbars=0, status=0, titlebar=0, toolbar=0"
				);
				return false;
			});
		},

		blank: function($el: JQuery, shareUrl: string) {
			return $el.attr({ target: "_blank", href: shareUrl });
		},

		self: function($el: JQuery, shareUrl: string) {
			return $el.attr({ target: "_self", href: shareUrl });
		}
	};

	private static _shares = {
		email: {
			label: "E-mail",
			logo: "fa fa-at",
			shareUrl: "mailto:{to}?subject={text}&body={url}",
			countUrl: "",
			shareIn: "self"
		},

		twitter: {
			label: "Tweet",
			logo: "fa fa-twitter",
			shareUrl:
				"https://twitter.com/share?url={url}&text={text}&via={via}&hashtags={hashtags}",
			countUrl: ""
		},

		facebook: {
			label: "Like",
			logo: "fa fa-facebook",
			shareUrl: "https://facebook.com/sharer/sharer.php?u={url}",
			countUrl: "https://graph.facebook.com/?id={url}",
			getCount: function(data) {
				return (data.share && data.share.share_count) || 0;
			}
		},

		vkontakte: {
			label: "Like",
			logo: "fa fa-vk",
			shareUrl:
				"https://vk.com/share.php?url={url}&title={title}&description={text}",
			countUrl: "https://vk.com/share.php?act=count&index=1&url={url}",
			getCount: function(data) {
				return parseInt(data.slice(15, -2).split(", ")[1]);
			}
		},

		googleplus: {
			label: "+1",
			logo: "fa fa-google",
			shareUrl: "https://plus.google.com/share?url={url}",
			countUrl: ""
		},

		linkedin: {
			label: "Share",
			logo: "fa fa-linkedin",
			shareUrl: "https://www.linkedin.com/shareArticle?mini=true&url={url}",
			countUrl:
				"https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
			getCount: function(data) {
				return data.count;
			}
		},

		pinterest: {
			label: "Pin it",
			logo: "fa fa-pinterest",
			shareUrl:
				"https://pinterest.com/pin/create/bookmarklet/?media={media}&url={url}&description={text}",
			countUrl:
				"https://api.pinterest.com/v1/urls/count.json?&url={url}&callback=?",
			getCount: function(data) {
				return data.count;
			}
		},

		stumbleupon: {
			label: "Share",
			logo: "fa fa-stumbleupon",
			shareUrl: "http://www.stumbleupon.com/submit?url={url}&title={title}",
			countUrl:
				"https://cors-anywhere.herokuapp.com/https://www.stumbleupon.com/services/1.01/badge.getinfo?url={url}",
			getCount: function(data) {
				return data.result && data.result.views;
			}
		},

		telegram: {
			label: "Telegram",
			logo: "fa fa-telegram",
			shareUrl: "tg://msg?text={url} {text}",
			countUrl: "",
			shareIn: "self"
		},

		whatsapp: {
			label: "WhatsApp",
			logo: "fa fa-whatsapp",
			shareUrl: "whatsapp://send?text={url} {text}",
			countUrl: "",
			shareIn: "self"
		},

		line: {
			label: "LINE",
			logo: "fa fa-comment",
			shareUrl: "http://line.me/R/msg/text/?{text} {url}",
			countUrl: ""
		},

		viber: {
			label: "Viber",
			logo: "fa fa-volume-control-phone",
			shareUrl: "viber://forward?text={url} {text}",
			countUrl: "",
			shareIn: "self"
		},

		pocket: {
			label: "Pocket",
			logo: "fa fa-get-pocket",
			shareUrl: "https://getpocket.com/save?url={url}&title={title}",
			countUrl: ""
		},

		messenger: {
			label: "Share",
			logo: "fa fa-commenting",
			shareUrl: "fb-messenger://share?link={url}",
			countUrl: "",
			shareIn: "self"
		},
		rss: {
			label: "RSS",
			logo: "fa fa-rss",
			shareUrl: "/feeds/",
			countUrl: "",
			shareIn: "blank"
		}
	};

	private static _URL_PARAMS_REGEX = /(&?[a-zA-Z0-9]+=)?\{([a-zA-Z0-9]+)\}/g;

	private static _formatShareUrl($el: JQuery, network: string): string {
		let data: any = $el.data();
		data.text = data.text || data.title;
		data.url = data.url || window.location.href;
		// Log.success(network, this._shares[network].shareUrl, data);
		return this._shares[network].shareUrl.replace(
			this._URL_PARAMS_REGEX,
			function(match, key, field) {
				var value = data[field] || "";
				return value ? (key || "") + window.encodeURIComponent(value) : "";
			}
		);
	}

	static enable($el: JQuery, network: string): JQuery {
		$el.each(() => {
			let shareUrl = Share._formatShareUrl($el, network);
			// Log.success(network, shareUrl);
			switch (this.strategy) {
				case "self":
					this._shareStrategies.self($el, shareUrl);
					break;
				case "blank":
					this._shareStrategies.blank($el, shareUrl);
					break;
				default:
					this._shareStrategies.popup($el, shareUrl);
					break;
			}
		});
		return $el;
	}
}
