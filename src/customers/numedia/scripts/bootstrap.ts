// sass
import "./../sass/main.scss";
// dependecies
import Log from "../../../app/Utils/log";
import _ from "lodash";
import $ from "jquery";
window.jQuery = $;
import UIkit from "uikit";
const Icons = require("uikit/dist/js/uikit-icons");
UIkit.use(Icons);
// components
import App from "./Components/App";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// desktop
import dHomepage from "./Views/desktop/dHomepage";
import dArticle from "./Views/desktop/dArticle";
import dSearch from "./Views/desktop/dSearch";
import dCategory from "./Views/desktop/dCategory";
import dSerie from "./Views/desktop/dSerie";
// mobile
import mHomepage from "./Views/mobile/mHomepage";
import mArticle from "./Views/mobile/mArticle";
import mSearch from "./Views/mobile/mSearch";
import mCategory from "./Views/mobile/mCategory";
import mSerie from "./Views/mobile/mSerie";
// common
import cError404 from "./Views/common/cError404";
import cDesign from "./Views/common/cDesign";
import cWatch from "./Views/common/cWatch";
import cVideo from "./Views/common/cVideo";
import cFeatured from "./Views/common/cFeatured";
import cConstruction from "./Views/common/cConstruction";

const enableServiceWorker = false;

let app = new App(vv.view);

if (enableServiceWorker) {
	app.registerServiceWorker(
		"/sw.js",
		(registration: any) => {
			Log.success("SW registration", registration);
		},
		err => {
			Log.error("SW registration", err);
		}
	);
}
app.onBeforeInstallPrompt(e => {
	Log.step("onBeforeInstallPrompt", e);
});

$(document).ready(function() {
	Log.step("Document ready and news ticker");

	if(jQuery().breakingNews) {
		$('#urgent-news-ticker').breakingNews({
			direction: "rtl"
		});
		$('#breaking-news-ticker').breakingNews({
			direction: "rtl"
		});
		//run plugin dependent code
	}

	app.filterInDevice($('body'));
	let header = new Header(app);
	let footer = new Footer(app);
	let viewFound: boolean = true;
	let view;
	switch (vv.view) {
		case "homepage":
			view = app.mobile ? new mHomepage(app) : new dHomepage(app);
			break;
		case "article":
			view = app.mobile ? new mArticle(app) : new dArticle(app);
			break;
		case "category":
			view = app.mobile ? new mCategory(app) : new dCategory(app);
			break;
		case "search":
			view = app.mobile ? new mSearch(app) : new dSearch(app);
			break;
		case "serie":
			view = app.mobile ? new mSerie(app) : new dSerie(app);
			break;
		case "watch":
			view = new cWatch(app);
			break;
		case "video":
			view = new cVideo(app);
			break;
		case "featured":
			view = new cFeatured(app);
			break;
		case "error404":
			view = new cError404(app);
			break;
		case "design":
			view = new cDesign(app);
			break;
		default:
			view = new cConstruction(app);
			break;
	}
	app.onLoadData(
		() => {
			Log.green("load data", app.data, view);
			$("header.page-header")
				.empty()
				.append(header.render());
			$("footer.page-footer")
				.empty()
				.append(footer.render());

			view.render(
				() => {
					Log.success("view render", "Done.");
				},
				err => {
					Log.error("view.render", err);
				}
			);
		},
		err => {
			Log.error("app.onLoadData", err);
		}
	);

	app.loadData();
});
