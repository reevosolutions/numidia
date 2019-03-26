import Component from "../../../../app/Component";
import $ from "jquery";
import * as CryptoJS from "crypto-js";
import moment from "moment";
import App from "./App";
import Log from "../../../../app/Utils/log";
import SampleData from "./SampleData";
moment.locale("ar_dz");

export default class Weather extends Component {
	private wetherTranslation: any = {
		tornado: "زوبعة",
		"tropical storm": "عاصفة استوائية",
		hurricane: "إعصار",
		"severe thunderstorms": "العواصف الرعدية الشديدة",
		thunderstorms: "العواصف الرعدية",
		"mixed rain and snow": "الأمطار والثلوج المختلطة",
		"mixed rain and sleet": "المطر المختلط ومطر متجمد",
		"mixed snow and sleet": "الثلوج والصقيع المختلط",
		"freezing drizzle": "رذاذ متجمد",
		drizzle: "رذاذ",
		"freezing rain": "الامطار المتجمدة",
		showers: "الاستحمام",
		"snow flurries": "هبات الثلوج",
		"light snow showers": "تساقط ثلوج خفيفة",
		"blowing snow": "تهب الثلوج",
		snow: "ثلج",
		hail: "برد",
		sleet: "مطر متجمد",
		dust: "غبار",
		foggy: "ضبابي",
		haze: "ضباب",
		smoky: "داخن",
		blustery: "متهيج",
		windy: "عاصف",
		cold: "بارد",
		cloudy: "غائم",
		"mostly cloudy": "غائم جزئيا",
		"mostly sunny": "مشمس جزئيا",
		clear: "صافي",
		sunny: "مشمس",
		fair: "معتدل",
		"mixed rain and hail": "المطر المختلط وحائل",
		hot: "حار",
		thunder: "رعد",
		"isolated thunderstorms": "هبوب عواصف رعدية متفرقة",
		"scattered thunderstorms": "العواصف الرعدية المتفرقة",
		"scattered showers": "أمطار متفرقة",
		"heavy snow": "الثلوج الكثيفة",
		"scattered snow showers": "زخات الثلوج المتناثرة",
		thundershowers: "غائم جزئيا",
		"snow showers": "تساقط ثلوج",
		"isolated thundershowers": "زخات مطر رعدية متفرقة",
		"light rain": "امطار خفيفة",
		"not available": "غير متوفرة",
		"partly cloudy": "غائم جزئيا",
		"partly cloudy/windy": "غائم جزئيا / عاصف",
		"light rain with thunder": "مطر خفيف مع رعود",
		"low drifting sand": "تطاير رمال خفيف",
		fog: "غائم"
	};
	locations: any = {
		"1253079": { ar: "الجزائر العاصمة", fr: "Alger" },
		"1256562": { ar: "وهران", fr: "Oran" },
		"1253867": { ar: "قسنطينة", fr: "Constantine" },
		"1254700": { ar: "وادي سوف", fr: "ElOued" },
		"1255366": { ar: "المسيلة", fr: "Msila" },
		"1257590": { ar: "تمنراست", fr: "Tamenrasset" }
	};
	private element: JQuery;
	private app: App;

	constructor(app: App) {
		super();
		this.app = app;
		this.element = $("");
	}

	render(): JQuery {
		let self = this;
		const tpl = require(`../../parts/weather/default-slider.hbs`);
		this.element = $(tpl(this.data));
		$.each(this.locations, (WOEID: string, location) => {
			self.element
				.find(".items")
				.append(`<div id="weather-location-${WOEID}"></div>`);
		});
		this.init();
		return this.element;
	}

	private init(): any {
		let self = this;
		$.each(this.locations, function(WOEID: string, location) {
			if (window.location.hostname === "localhost") {
				// Log.event("load Forecast from samples");
				self.onLoadForecast(
					WOEID,
					location,
					SampleData.getData("weather").content
				);
				return;
			}

			// Log.event("load Forecast from server");
			self.app.apiRequest(
				"GET",
				"weather",
				{
					woeid: WOEID,
					u: "c",
					t: moment()
						.set("minute", 0)
						.set("second", 0)
						.unix()
				},
				data => {
					self.onLoadForecast(WOEID, location, data);
				}
			);
		});
	}

	private directLoadForecast(WOEID: string, location: any, data: any): any {
		var url = "https://weather-ydn-yql.media.yahoo.com/forecastrss";
		var method = "GET";
		var app_id = "your-app-id";
		var consumer_key = "your-consumer-key";
		var consumer_secret = "your-consumer-secret";
		var concat = "&";
		var query = { location: "sunnyvale,ca", format: "json" };
		var oauth = {
			oauth_consumer_key: consumer_key,
			oauth_nonce: Math.random()
				.toString(36)
				.substring(2),
			oauth_signature_method: "HMAC-SHA1",
			oauth_timestamp: parseInt("" + new Date().getTime() / 1000).toString(),
			oauth_version: "1.0"
		};

		var merged = {};
		$.extend(merged, query, oauth);
		// Note the sorting here is required
		var merged_arr = Object.keys(merged)
			.sort()
			.map(function(k) {
				return [k + "=" + encodeURIComponent(merged[k])];
			});
		var signature_base_str =
			method +
			concat +
			encodeURIComponent(url) +
			concat +
			encodeURIComponent(merged_arr.join(concat));

		var composite_key = encodeURIComponent(consumer_secret) + concat;
		var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
		var signature = hash.toString(CryptoJS.enc.Base64);

		oauth["oauth_signature"] = signature;
		var auth_header =
			"OAuth " +
			Object.keys(oauth)
				.map(function(k) {
					return [k + '="' + oauth[k] + '"'];
				})
				.join(",");

		$.ajax({
			url: url + "?" + $.param(query),
			headers: {
				Authorization: auth_header,
				"X-Yahoo-App-Id": app_id
			},
			method: "GET",
			success: function(data) {
				console.log(data);
			}
		});
	}
	
	private onLoadForecast(WOEID: string, location: any, data: any): any {
		// Log.success("weather data", WOEID, location, data);
		let self = this;
		let currentDate: Date = new Date();
		let sgmwResult = $('<ul class="sg-multiple-weather"></ul>');
		let timeOfDay: string;
		var sunRise = new Date(
			currentDate.toDateString() +
				" " +
				data.current_observation.astronomy.sunrise
		);
		var sunSet = new Date(
			currentDate.toDateString() +
				" " +
				data.current_observation.astronomy.sunset
		);

		if (currentDate > sunRise && currentDate < sunSet) {
			timeOfDay = "d";
		} else {
			timeOfDay = "n";
		}

		var weather = {
			currently: data.current_observation.condition.text,
			temp: data.current_observation.condition.temperature,
			image: `${tplPath}/assets/images/weather-icons/${
				data.current_observation.condition.code
			}${timeOfDay}.png`
		};
		var w_now = self.wetherTranslation[weather.currently.toLowerCase()]
			? self.wetherTranslation[weather.currently.toLowerCase()]
			: weather.currently.toLowerCase();
		//
		const tpl = require(`../../parts/weather/default-item.hbs`);
		let item = $(
			tpl({
				wilayaId: location.fr.toLowerCase(),
				wilaya: location.ar,
				tmp: weather.temp,
				img: weather.image,
				now: w_now
			})
		);
		item.appendTo(self.element.find(`#weather-location-${WOEID}`));
		// Log.step(
		// 	`#weather-location-${WOEID}`,
		// 	item.html(),
		// 	self.element,
		// 	self.element.find(`#weather-location-${WOEID}`).length
		// );
	}
}
