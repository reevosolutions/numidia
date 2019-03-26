import Component from "../../../../app/Component";
import Log from "../../../../app/Utils/log";
import $ from "jquery";
import SampleData from "./SampleData";
import is from "is_js";

export default class App extends Component {
	deferredPrompt: Event | null = null;
	_view: string;
	apiUrl: string | undefined = "/wp-json/dz/v1/";
	apiEndpoint: string = "";
	config = {
		youtubeApiKey: "AIzaSyDGUVrvcB_7BjQCZVl4Z1QDBqATh2EH_MY"
	};

	private _onSuccessLoadData!: () => void;
	private _onFailLoadData!: (err: any) => void;
	mobile: boolean;

	constructor(view: string) {
		super();
		this._view = view;
		this.mobile = App.isMobile();
		if (this.mobile) Log.notification("mobile", true);
		
	}

	static isMobile(): boolean {
		let sw: any = $(window).width();
		return sw < 959 || is.mobile();
	}


	static FilterInDevice($el: JQuery): JQuery {
		if (this.isMobile()) $el.find(".desktop-only").remove();
		else $el.find(".mobile-only").remove();
		Log.step('FilterInDevice', $el);
		return $el;
	}
	filterInDevice($el: JQuery): JQuery {
		if (this.mobile) $el.find(".desktop-only").remove();
		else $el.find(".mobile-only").remove();
		Log.step('FilterInDevice', (this.mobile) ? 'mobile' : 'desktop', $el);
		return $el;
	}

	registerServiceWorker(
		sw: string,
		onSuccess: (registration: any) => void,
		onFail: (err: any) => void
	): void {
		if ("serviceWorker" in navigator) {
			// window.addEventListener("load", function() {
			navigator.serviceWorker
				.register(sw)
				.then(registration => {
					onSuccess(registration);
				})
				.catch(err => {
					onFail(err);
				});
			// });
		} else {
			onFail(new Error("Service worker not disponible."));
		}
	}

	onBeforeInstallPrompt(onPrompt: (e: Event) => void): void {
		window.addEventListener("beforeinstallprompt", e => {
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault();
			// Stash the event so it can be triggered later.
			onPrompt(e);
		});
	}

	onLoadData(onSuccess: () => void, onFail: (err: any) => void): void {
		this._onSuccessLoadData = onSuccess;
		this._onFailLoadData = onFail;
	}

	loadData(): any {
		if (window.location.hostname === "localhost") {
			this.data = SampleData.getData(this._view);
			Log.event("load data from samples");
			window.data = this.data;
			this._onSuccessLoadData();
			setTimeout(()=>{
				// this._onSuccessLoadData();
			}, 100);
			return;
		}
		Log.event("load data from server");
		$.ajax({
			url: this.apiUrl + this.apiEndpoint,
			method: "GET",
			dataType: "json",
			data: vv
		})
			.done(response => {
				this.removePlaceHolders();
				this.data = response;
				window.data = this.data;
				this._onSuccessLoadData();
			})
			.fail(err => {
				Log.error("app.loadData error", err);
			});
	}
	removePlaceHolders(): any {
		$('.rv-placeholder').remove();
	}

	apiRequest(
		method: string,
		apiEndpoint: string,
		params: any,
		onSuccess: (res: any) => any,
		onFail?: (err: any) => any
	): any {
		if (window.location.hostname === "localhost") {
			this.data = SampleData.getData(this._view);
			Log.event("load data from samples");
			this._onSuccessLoadData();
			return;
		}
		Log.event("load data from server");
		$.ajax({
			url: this.apiUrl + apiEndpoint,
			method: method,
			dataType: "json",
			data: params
		})
			.done(response => {
				onSuccess(response);
			})
			.fail(err => {
				if (typeof onFail === "function") onFail(err);
			});
	}

	getArticleImagePlaceholder(): any {
		return {
			url: this.data.app.articleImagePlaceholder,
			width: 400,
			height: 250
		};
	}
}
