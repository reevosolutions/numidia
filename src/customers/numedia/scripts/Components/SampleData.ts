import $ from "jquery";
import App from "./App";
import logoBig from "@img/logo-big.png";
import logo from "@img/logo-small.png";
import logoBigTransparent from "@img/logo-big-transparent.png";
import logoTransparent from "@img/logo-small-transparent.png";
import icon from "@img/icon.png";
import moment = require("moment");
moment.locale("ar_dz");

let images: any[] = [];
// for (let i = 1; i < 41; i++) {
// 	images.push(require(`@img/samples/${i}.jpg`));
// }
import articleImage from "@img/article.jpg";
import authorImage from "@img/author.jpg";
const desc = "أعلنت اليوم وزارة الداخلية عن تنصيب المدير العام الجديد للشرطة";

for (let i = 0; i < 49; i++) {
	require(`@img/weather-icons/${i}d.png`);
	require(`@img/weather-icons/${i}n.png`);
}

class ArticleList {
	private static _defaultArticleObject = {
		id: null,
		title: "مقال تجريبي",
		href: "/article.html",
		description: desc,
		thumbs: {
			"thumb-400x250": {
				url: articleImage,
				width: 500,
				height: 300
			}
		},
		video: "",
		createdAt: "1551017551",
		timeStart: "08:00",
		timeEnd: "08:30",
		showDays: "كل سبت",
		showTimes: "20:00",
		author: {
			id: 1,
			name: "كريم آيت بلقاسم",
			href: "author.html",
			image: {
				url: authorImage,
				width: 48,
				height: 48
			}
		}
	};

	static get(count: number): any[] {
		let items: any[] = [];
		if (!count) return items;
		for (let i = 1; i <= count; i++) {
			items.push(
				$.extend({}, this._defaultArticleObject, {
					title: `${this._defaultArticleObject.title} ${i}`,
					id: i,
					timeStart: moment()
						.set("hour", i - 1)
						.set("minute", 30)
						.format("HH:mm"),
					timeEnd: moment()
						.set("hour", i)
						.set("minute", 30)
						.format("HH:mm")
					// image: {
					// 	url: images[i],
					// 	width: 500,
					// 	height: 300
					// },
				})
			);
		}
		return items;
	}
}

class Timeline {
	public static build(): any[] {
		let items: any[] = [];

		return items;
	}
}

export default class SampleData {
	private static _dataDesktop = {
		app: {
			url: "/",
			name: "نوميديا",
			slogan: "شبكة نوميديا الإعلامية",
			logo: logo,
			icon: icon,
			social: {
				facebook: "#facebook",
				instagram: "#instagram",
				twitter: "#twitter"
			},
			email: "numedia@gmail.com",
			phoneNumbers: ["+213666661616", "+213666661617"],
			copyrights: "كل الحقوق محفوظة لمؤسسة نوميديا للإعلام",
			channelInfos: {
				satellite: "النايلسات",
				frequency: "10922",
				polarity: "عمودي",
				symbolRate: "27500"
			}
		},
		menus: {
			main: [
				{
					title: "الرئيسية",
					href: "/",
					active: true
				},
				{
					title: "أخبار",
					href: "category.html",
					active: false,
					children: [
						{
							ID: 336,
							parentId: 275,
							order: 3,
							title: "سياسة",
							href: "https://numedia.nabd-algerie.com/category/politique/",
							object: "category",
							objectId: 2,
							classes: [""],
							children: []
						},
						{
							ID: 337,
							parentId: 275,
							order: 4,
							title: "مجتمع",
							href: "https://numedia.nabd-algerie.com/category/societe/",
							object: "category",
							objectId: 5,
							classes: [""],
							children: []
						},
						{
							ID: 338,
							parentId: 275,
							order: 5,
							title: "اقتصاد",
							href: "https://numedia.nabd-algerie.com/category/economie/",
							object: "category",
							objectId: 3,
							classes: [""],
							children: []
						},
						{
							ID: 339,
							parentId: 275,
							order: 6,
							title: "رياضة",
							href: "https://numedia.nabd-algerie.com/category/sport/",
							object: "category",
							objectId: 4,
							classes: [""],
							children: []
						}
					]
				},
				{
					title: "جدول البرامج",
					href: "programs.html",
					active: false
				},
				{
					title: "شاهد",
					href: "watch.html",
					active: false
				},
				{
					title: "بث مباشر",
					href: "/live.html",
					active: false,
					live: true
				}
			],
			sidemenu: []
		},
		homepage: {
			content: {
				slider: ArticleList.get(5),
				lastNews: ArticleList.get(9),
				todayPrograms: ArticleList.get(23).reverse(),
				videos: ArticleList.get(18),
				otherNews: ArticleList.get(18),
				playlist: [
					{
						categoryId: 1,
						categoryName: "دراما",
						articles: ArticleList.get(5)
					},
					{
						categoryId: 2,
						categoryName: "اكشن",
						articles: ArticleList.get(5)
					},
					{
						categoryId: 3,
						categoryName: "الزمن الجميل",
						articles: ArticleList.get(5)
					},
					{
						categoryId: 4,
						categoryName: "رياضة",
						articles: ArticleList.get(5)
					},
					{
						categoryId: 5,
						categoryName: "مسلسلات",
						articles: ArticleList.get(5)
					},
					{
						categoryId: 6,
						categoryName: "برامج",
						articles: ArticleList.get(5)
					}
				]
			}
		},
		article: {
			content: {
				currentArticle: {
					id: 13,
					title: "هذا ما قالته حنون حول المشاركة في الرئاسيات القادمة",
					body:
						"<h2 ><span>اجلت &nbsp;الأمينة العامة لحزب العمال لويزة حنون الفصل في مشاركتها في الرئاسيات المقبلة .</span></h2><p ><span>ولم تعلن لوزيرة حنون خلال اجتماع اليوم &nbsp;للمكتب الوطني للحزب صراحة المشاركة من عدمها، على اعتبار أن قرار المشاركة أو عدمها يتطلب موافقة حزبها، قائلة “سيتم اتخاذ القرار لاحقا من قبل اللجنة المركزية” في حين&nbsp; اكدت&nbsp; أن المحطة السياسية القادمة مفصلية في تاريخ الجزائر</span></p><p ><span>وفي ما تعلق &nbsp;بمؤسسة الجيش وموقفها فيما يخص الانتخابات الرئاسية أوضحت حنوت “ان رئيس أركان الجيش، الفريق أحمد قايد صالح دخل في الحملة السياسية من أجل عهدة جديدة لرئيس الجمهورية، قائلة ” ان رئيس الأركان أعلن مؤخرا أن الجيش لن يتدخل في السياسة ولا سيسمح لأي شخص بجر المؤسسة في هذا المجال من خلال التذكير بمهامه الدستورية، مستطردة بتسائل مفاده”أين هو حياد الجيش الوطني الشعبي”.</span></p><p ><span>ولم تعلن لوزيرة حنون خلال اجتماع اليوم &nbsp;للمكتب الوطني للحزب صراحة المشاركة من عدمها، على اعتبار أن قرار المشاركة أو عدمها يتطلب موافقة حزبها، قائلة “سيتم اتخاذ القرار لاحقا من قبل اللجنة المركزية” في حين&nbsp; اكدت&nbsp; أن المحطة السياسية القادمة مفصلية في تاريخ الجزائر</span></p><p ><span>وفي ما تعلق &nbsp;بمؤسسة الجيش وموقفها فيما يخص الانتخابات الرئاسية أوضحت حنوت “ان رئيس أركان الجيش، الفريق أحمد قايد صالح دخل في الحملة السياسية من أجل عهدة جديدة لرئيس الجمهورية، قائلة ” ان رئيس الأركان أعلن مؤخرا أن الجيش لن يتدخل في السياسة ولا سيسمح لأي شخص بجر المؤسسة في هذا المجال من خلال التذكير بمهامه الدستورية، مستطردة بتسائل مفاده”أين هو حياد الجيش الوطني الشعبي”.</span></p><p ><span>ولم تعلن لوزيرة حنون خلال اجتماع اليوم &nbsp;للمكتب الوطني للحزب صراحة المشاركة من عدمها، على اعتبار أن قرار المشاركة أو عدمها يتطلب موافقة حزبها، قائلة “سيتم اتخاذ القرار لاحقا من قبل اللجنة المركزية” في حين&nbsp; اكدت&nbsp; أن المحطة السياسية القادمة مفصلية في تاريخ الجزائر</span></p><p ><span>وفي ما تعلق &nbsp;بمؤسسة الجيش وموقفها فيما يخص الانتخابات الرئاسية أوضحت حنوت “ان رئيس أركان الجيش، الفريق أحمد قايد صالح دخل في الحملة السياسية من أجل عهدة جديدة لرئيس الجمهورية، قائلة ” ان رئيس الأركان أعلن مؤخرا أن الجيش لن يتدخل في السياسة ولا سيسمح لأي شخص بجر المؤسسة في هذا المجال من خلال التذكير بمهامه الدستورية، مستطردة بتسائل مفاده”أين هو حياد الجيش الوطني الشعبي”.</span></p>",
					createdAt: "1550188800",
					thumbs: {
						// 'thumb-800x500': {
						// 	url: articleImage,
						// 	width: 800,
						// 	height: 450
						// }
					},
					author: {
						id: 1,
						name: "كريم آيت بلقاسم",
						href: "author.html",
						image: {
							url: authorImage,
							width: 150,
							height: 150
						}
					},
					video: "ZnvGuYQXQj8",
					categories: [
						{
							id: 15,
							name: "سياسة",
							href: "category.html"
						}
					]
				},
				mostPopular: ArticleList.get(5),
				readMore: ArticleList.get(6)
			}
		},
		category: {
			content: {
				currentCategory: {
					id: 15,
					name: "سياسة",
					href: "category.html"
				},
				lastUpdate: "1551017551",
				featured: ArticleList.get(1),
				slider: ArticleList.get(12),
				mostPopular: ArticleList.get(12),
				// mostPopular: [],
				mainList: ArticleList.get(20)
			}
		},
		search: {
			content: {
				results: ArticleList.get(24)
			}
		},

		serie: {
			content: {
				currentSerie: {
					id: 13,
					title: "هذا ما قالته حنون حول المشاركة في الرئاسيات القادمة",
					plid: "PLZf2GQshwCvi-JTb_q_rfC7gDA-m_yw5k",
					body:
						"<h2 ><span>اجلت &nbsp;الأمينة العامة لحزب العمال لويزة حنون الفصل في مشاركتها في الرئاسيات المقبلة .</span></h2><p ><span>ولم تعلن لوزيرة حنون خلال اجتماع اليوم &nbsp;للمكتب الوطني للحزب صراحة المشاركة من عدمها، على اعتبار أن قرار المشاركة أو عدمها يتطلب موافقة حزبها، قائلة “سيتم اتخاذ القرار لاحقا من قبل اللجنة المركزية” في حين&nbsp; اكدت&nbsp; أن المحطة السياسية القادمة مفصلية في تاريخ الجزائر</span></p><p ><span>وفي ما تعلق &nbsp;بمؤسسة الجيش وموقفها فيما يخص الانتخابات الرئاسية أوضحت حنوت “ان رئيس أركان الجيش، الفريق أحمد قايد صالح دخل في الحملة السياسية من أجل عهدة جديدة لرئيس الجمهورية، قائلة ” ان رئيس الأركان أعلن مؤخرا أن الجيش لن يتدخل في السياسة ولا سيسمح لأي شخص بجر المؤسسة في هذا المجال من خلال التذكير بمهامه الدستورية، مستطردة بتسائل مفاده”أين هو حياد الجيش الوطني الشعبي”.</span></p><p ><span>ولم تعلن لوزيرة حنون خلال اجتماع اليوم &nbsp;للمكتب الوطني للحزب صراحة المشاركة من عدمها، على اعتبار أن قرار المشاركة أو عدمها يتطلب موافقة حزبها، قائلة “سيتم اتخاذ القرار لاحقا من قبل اللجنة المركزية” في حين&nbsp; اكدت&nbsp; أن المحطة السياسية القادمة مفصلية في تاريخ الجزائر</span></p><p ><span>وفي ما تعلق &nbsp;بمؤسسة الجيش وموقفها فيما يخص الانتخابات الرئاسية أوضحت حنوت “ان رئيس أركان الجيش، الفريق أحمد قايد صالح دخل في الحملة السياسية من أجل عهدة جديدة لرئيس الجمهورية، قائلة ” ان رئيس الأركان أعلن مؤخرا أن الجيش لن يتدخل في السياسة ولا سيسمح لأي شخص بجر المؤسسة في هذا المجال من خلال التذكير بمهامه الدستورية، مستطردة بتسائل مفاده”أين هو حياد الجيش الوطني الشعبي”.</span></p><p ><span>ولم تعلن لوزيرة حنون خلال اجتماع اليوم &nbsp;للمكتب الوطني للحزب صراحة المشاركة من عدمها، على اعتبار أن قرار المشاركة أو عدمها يتطلب موافقة حزبها، قائلة “سيتم اتخاذ القرار لاحقا من قبل اللجنة المركزية” في حين&nbsp; اكدت&nbsp; أن المحطة السياسية القادمة مفصلية في تاريخ الجزائر</span></p><p ><span>وفي ما تعلق &nbsp;بمؤسسة الجيش وموقفها فيما يخص الانتخابات الرئاسية أوضحت حنوت “ان رئيس أركان الجيش، الفريق أحمد قايد صالح دخل في الحملة السياسية من أجل عهدة جديدة لرئيس الجمهورية، قائلة ” ان رئيس الأركان أعلن مؤخرا أن الجيش لن يتدخل في السياسة ولا سيسمح لأي شخص بجر المؤسسة في هذا المجال من خلال التذكير بمهامه الدستورية، مستطردة بتسائل مفاده”أين هو حياد الجيش الوطني الشعبي”.</span></p>",
					description:
						"مؤسسة الجيش وموقفها فيما يخص الانتخابات الرئاسية أوضحت حنوت “ان رئيس أركان الجيش، الفريق أحمد قايد صالح دخل في الحملة",
					createdAt: "1550188800",
					image: {
						url: articleImage,
						width: 800,
						height: 450
					},
					thumbs: {},
					author: {
						id: 1,
						name: "كريم آيت بلقاسم",
						href: "author.html",
						image: {
							url: authorImage,
							width: 150,
							height: 150
						}
					},
					categories: [
						{
							id: 15,
							name: "سياسة",
							href: "category.html"
						}
					]
				},
				otherPrograms: ArticleList.get(12)
			}
		},
		watch: {
			content: {
				items: ArticleList.get(24)
			}
		},
		video: {
			content: {
				items: ArticleList.get(24)
			}
		},
		featured: {
			content: {
				items: ArticleList.get(24)
			}
		},
		weather: {
			content: {
				location: {
					woeid: 1253867,
					city: "Constantine",
					region: " Constantine",
					country: "Algeria",
					lat: 36.360008,
					long: 6.60945,
					timezone_id: "Africa/Algiers"
				},
				current_observation: {
					wind: { chill: 3, direction: 270, speed: 3 },
					atmosphere: {
						humidity: 91,
						visibility: 14.2,
						pressure: 948,
						rising: 0
					},
					astronomy: { sunrise: "7:06 am", sunset: "6:27 pm" },
					condition: { text: "Cloudy", code: 26, temperature: 3 },
					pubDate: 1551254400
				},
				forecasts: [
					{
						day: "Wed",
						date: 1551222000,
						low: 0,
						high: 11,
						text: "Partly Cloudy",
						code: 30
					},
					{
						day: "Thu",
						date: 1551308400,
						low: 0,
						high: 15,
						text: "Mostly Sunny",
						code: 34
					},
					{
						day: "Fri",
						date: 1551394800,
						low: 0,
						high: 16,
						text: "Mostly Sunny",
						code: 34
					},
					{
						day: "Sat",
						date: 1551481200,
						low: 2,
						high: 14,
						text: "Mostly Sunny",
						code: 34
					},
					{
						day: "Sun",
						date: 1551567600,
						low: 0,
						high: 16,
						text: "Mostly Sunny",
						code: 34
					},
					{
						day: "Mon",
						date: 1551654000,
						low: 1,
						high: 21,
						text: "Sunny",
						code: 32
					},
					{
						day: "Tue",
						date: 1551740400,
						low: 3,
						high: 20,
						text: "Mostly Sunny",
						code: 34
					},
					{
						day: "Wed",
						date: 1551826800,
						low: 7,
						high: 18,
						text: "Partly Cloudy",
						code: 30
					},
					{
						day: "Thu",
						date: 1551913200,
						low: 4,
						high: 18,
						text: "Mostly Cloudy",
						code: 28
					},
					{
						day: "Fri",
						date: 1551999600,
						low: 5,
						high: 15,
						text: "Rain",
						code: 12
					}
				]
			}
		}
	};
	private static _dataMobile = {
		app: {
			url: "/",
			name: "نوميديا",
			slogan: "شبكة نوميديا الإعلامية mobile",
			logo: logo,
			logoTransparent: logoTransparent,
			icon: icon,
			social: {
				facebook: "#facebook",
				instagram: "#instagram",
				twitter: "#twitter"
			},
			email: "numedia@gmail.com",
			phoneNumbers: ["+213666661616", "+213666661617"],
			copyrights: "كل الحقوق محفوظة لمؤسسة نوميديا للإعلام"
		},

		menus: {
			main: [
				{
					ID: 346,
					parentId: 0,
					order: 1,
					title: "الرئيسية",
					href: "https://numidia.moudjib.com/",
					object: "custom",
					objectId: 346,
					classes: [""],
					children: [],
					active: true,
					divider: false
				},
				{
					ID: 366,
					parentId: 0,
					order: 2,
					title: "بث مباشر",
					href: "https://numidia.moudjib.com/live/",
					object: "page",
					objectId: 264,
					classes: [""],
					children: [],
					live: true,
					active: false,
					divider: false
				},
				{
					ID: 347,
					parentId: 0,
					order: 3,
					title: "جدول البرامج",
					href: "https://numidia.moudjib.com/programmes/",
					object: "page",
					objectId: 266,
					classes: [""],
					children: [],
					active: false,
					divider: false
				},
				{
					ID: 365,
					parentId: 0,
					order: 4,
					title: "أخبار مميزة",
					href: "https://numidia.moudjib.com/featured-news/",
					object: "page",
					objectId: 363,
					classes: [""],
					children: [],
					active: false,
					divider: false
				},
				{
					ID: 370,
					parentId: 0,
					order: 5,
					title: "-",
					href: "#",
					object: "custom",
					objectId: 370,
					classes: [""],
					children: [],
					active: false,
					divider: true
				},
				{
					ID: 367,
					parentId: 0,
					order: 6,
					title: "أخبار بالفيديو",
					href: "https://numidia.moudjib.com/video/",
					object: "page",
					objectId: 349,
					classes: [""],
					children: [],
					active: false,
					divider: false
				},
				{
					ID: 371,
					parentId: 0,
					order: 7,
					title: "-",
					href: "#",
					object: "custom",
					objectId: 371,
					classes: [""],
					children: [],
					active: false,
					divider: true
				},
				{
					ID: 368,
					parentId: 0,
					order: 8,
					title: "من نحن",
					href: "#about",
					object: "custom",
					objectId: 368,
					classes: [""],
					children: [],
					active: false,
					divider: false
				},
				{
					ID: 369,
					parentId: 0,
					order: 9,
					title: "اتصل بنا",
					href: "#contact",
					object: "custom",
					objectId: 369,
					classes: [""],
					children: [],
					active: false,
					divider: false
				}
			],
			sidemenu: []
		},
		homepage: {
			content: {
				slider: ArticleList.get(7),
				lastNews: ArticleList.get(8),
				todayPrograms: ArticleList.get(23),
				otherNews: ArticleList.get(6),
				videos: ArticleList.get(5)
			}
		},
		article: {
			content: {
				currentArticle: {
					id: 13,
					title: "هذا ما قالته حنون حول المشاركة في الرئاسيات القادمة",
					body:
						"<h2 ><span>اجلت &nbsp;الأمينة العامة لحزب العمال لويزة حنون الفصل في مشاركتها في الرئاسيات المقبلة .</span></h2><p ><span>ولم تعلن لوزيرة حنون خلال اجتماع اليوم &nbsp;للمكتب الوطني للحزب صراحة المشاركة من عدمها، على اعتبار أن قرار المشاركة أو عدمها يتطلب موافقة حزبها، قائلة “سيتم اتخاذ القرار لاحقا من قبل اللجنة المركزية” في حين&nbsp; اكدت&nbsp; أن المحطة السياسية القادمة مفصلية في تاريخ الجزائر</span></p><p ><span>وفي ما تعلق &nbsp;بمؤسسة الجيش وموقفها فيما يخص الانتخابات الرئاسية أوضحت حنوت “ان رئيس أركان الجيش، الفريق أحمد قايد صالح دخل في الحملة السياسية من أجل عهدة جديدة لرئيس الجمهورية، قائلة ” ان رئيس الأركان أعلن مؤخرا أن الجيش لن يتدخل في السياسة ولا سيسمح لأي شخص بجر المؤسسة في هذا المجال من خلال التذكير بمهامه الدستورية، مستطردة بتسائل مفاده”أين هو حياد الجيش الوطني الشعبي”.</span></p><p ><span>ولم تعلن لوزيرة حنون خلال اجتماع اليوم &nbsp;للمكتب الوطني للحزب صراحة المشاركة من عدمها، على اعتبار أن قرار المشاركة أو عدمها يتطلب موافقة حزبها، قائلة “سيتم اتخاذ القرار لاحقا من قبل اللجنة المركزية” في حين&nbsp; اكدت&nbsp; أن المحطة السياسية القادمة مفصلية في تاريخ الجزائر</span></p><p ><span>وفي ما تعلق &nbsp;بمؤسسة الجيش وموقفها فيما يخص الانتخابات الرئاسية أوضحت حنوت “ان رئيس أركان الجيش، الفريق أحمد قايد صالح دخل في الحملة السياسية من أجل عهدة جديدة لرئيس الجمهورية، قائلة ” ان رئيس الأركان أعلن مؤخرا أن الجيش لن يتدخل في السياسة ولا سيسمح لأي شخص بجر المؤسسة في هذا المجال من خلال التذكير بمهامه الدستورية، مستطردة بتسائل مفاده”أين هو حياد الجيش الوطني الشعبي”.</span></p><p ><span>ولم تعلن لوزيرة حنون خلال اجتماع اليوم &nbsp;للمكتب الوطني للحزب صراحة المشاركة من عدمها، على اعتبار أن قرار المشاركة أو عدمها يتطلب موافقة حزبها، قائلة “سيتم اتخاذ القرار لاحقا من قبل اللجنة المركزية” في حين&nbsp; اكدت&nbsp; أن المحطة السياسية القادمة مفصلية في تاريخ الجزائر</span></p><p ><span>وفي ما تعلق &nbsp;بمؤسسة الجيش وموقفها فيما يخص الانتخابات الرئاسية أوضحت حنوت “ان رئيس أركان الجيش، الفريق أحمد قايد صالح دخل في الحملة السياسية من أجل عهدة جديدة لرئيس الجمهورية، قائلة ” ان رئيس الأركان أعلن مؤخرا أن الجيش لن يتدخل في السياسة ولا سيسمح لأي شخص بجر المؤسسة في هذا المجال من خلال التذكير بمهامه الدستورية، مستطردة بتسائل مفاده”أين هو حياد الجيش الوطني الشعبي”.</span></p>",
					createdAt: "1550188800",
					image: {
						url: articleImage,
						width: 800,
						height: 450
					},
					author: {
						id: 1,
						name: "كريم آيت بلقاسم",
						href: "author.html",
						image: {
							url: authorImage,
							width: 150,
							height: 150
						}
					},
					categories: [
						{
							id: 15,
							name: "سياسة",
							href: "category.html"
						}
					]
				},
				readMore: ArticleList.get(10)
			}
		},

		category: {
			content: {
				currentCategory: {
					id: 15,
					name: "سياسة",
					href: "category.html"
				},
				lastUpdate: "1551017551",
				featured: ArticleList.get(1),
				slider: ArticleList.get(4),
				mainList: ArticleList.get(24)
			}
		},
		search: {
			content: {
				results: ArticleList.get(24)
			}
		},
		watch: {
			content: {
				items: ArticleList.get(24)
			}
		},
		video: {
			content: {
				items: ArticleList.get(24)
			}
		},
		featured: {
			content: {
				items: ArticleList.get(24)
			}
		},
		serie: {
			content: {
				currentSerie: {
					id: 332,
					title: "كسر الروتين",
					href:
						"https://numidia.moudjib.com/serie/%d9%83%d8%b3%d8%b1-%d8%a7%d9%84%d8%b1%d9%88%d8%aa%d9%8a%d9%86/",
					createdAt: 1551157921,
					body:
						"<h2>بيل غيتس” يكشف عن عشرة اختراقات تقنية ستغير العالم في 2019″</h2> <p>أتاحت مجلة معهد ماساتشوستس للتنقية “أم.آي.تي تكنولوجي ريفيو” للمرة الأولى في تاريخها الذي يمتد 18 عاما، للرئيس التنفيذي السابق بيل غيتس مؤسس شركة مايكروسوفت بالكتابة والتحرير الذي وضع بين أيدي القراء قائمة هذا العام للاختراقات التقنية قد تغير العالم في 2019 حسب رأيه.</p> <p>لقد تنبأ بيل غيتس في مقاله بشكل صحيح بنهضة الحاسوب المنزلي، ونظام تشغيل سطح المكتب الرسومي، وشبكة الإنترنت، حيث انتقى مؤسس شركة مايكروسوفت القائمة التي ستنشرها بالتفصيل المجلة يوم 5 مارس المقبل وهي:</p> <p>1- براعة الروبوت: أيادٍ روبوتية يمكن أن تتعلم كيفية التعامل مع أشياء غير مألوفة من تلقاء نفسها.<br /> 2- موجة جديدة من الطاقة النووية: تصاميم جديدة لمفاعلات كل من الانشطار والانصهار النوويين يمكن أن تساعد في خفض انبعاثات الكربون.<br /> 3- التنبؤ بالخدج: اختبار دم بسيط للتحذير من الولادة قبل الأوان، مما قد ينقذ حياة العديد من الأطفال.<br /> 4- مسبار القناة الهضمية في حبة دواء: جهاز يمكن ابتلاعه يستطيع تصوير الجهاز الهضمي وحتى أخذ الخزعات.<br /> 5- لقاحات السرطان المخصصة: علاج يستخدم جهاز المناعة في الجسم لاستهداف الخلايا الخبيثة فقط.<br /> 6- البرغر الخالي من لحم البقر: بدائل للحوم يمكن أن تخفض بشكل كبير الانبعاثات الناجمة عن صناعة الأغذية.<br /> 7- صائد لغاز ثاني أكسيد الكربون: تقنيات امتصاص ثاني أكسيد الكربون من الهواء وحجزه قد تصبح اقتصادية أخيرا.<br /> 8- مخطط للقلب على معصمك: مقدرة الأشخاص الذين يعانون من أمراض القلب على مراقبة صحتهم باستمرار والحصول على تحذيرات مبكرة من المشاكل.<br /> 9- صرف صحي بدون شبكات صرف صحي: مرحاض قائم بذاته لا يحتاج إلى ماء ويحول الفضلات البشرية إلى سماد، كما يمكنه معالجة الأمراض والظروف المعيشية السيئة في كثير من دول العالم النامي.<br /> 10- مساعدات رقمية ذكية طليقة اللسان: تطورات جديدة في معالجة اللغة الطبيعية ستجعل أنظمة المساعدة الرقمية قادرة على التصرف باستقلالية أكبر.</p> ",
					description:
						"بيل غيتس” يكشف عن عشرة اختراقات تقنية ستغير العالم في 2019″ أتاحت مجلة معهد ماساتشوستس للتنقية “أم.آ",
					image: {
						url: articleImage,
						width: 800,
						height: 450
					},
					thumbs: {
						"thumb-800x500": {
							url: articleImage,
							width: 500,
							height: 300
						},
						"thumb-400x250": {
							url: articleImage,
							width: 500,
							height: 300
						}
					},
					video: null,
					timeStart: "19:40",
					timeEnd: "",
					showDays: "كل يوم",
					showTimes: "19:40",
					plid: "PLZf2GQshwCvi-JTb_q_rfC7gDA-m_yw5k",
					author: {
						id: 1,
						name: "كريم آيت بلقاسم",
						href: "author.html",
						image: {
							url: authorImage,
							width: 150,
							height: 150
						}
					},
					categories: [
						{
							id: 15,
							name: "سياسة",
							href: "category.html"
						}
					]
				},
				otherPrograms: ArticleList.get(12)
			}
		},
		weather: {
			content: {
				location: {
					woeid: 1253867,
					city: "Constantine",
					region: " Constantine",
					country: "Algeria",
					lat: 36.360008,
					long: 6.60945,
					timezone_id: "Africa/Algiers"
				},
				current_observation: {
					wind: { chill: 3, direction: 270, speed: 3 },
					atmosphere: {
						humidity: 91,
						visibility: 14.2,
						pressure: 948,
						rising: 0
					},
					astronomy: { sunrise: "7:06 am", sunset: "6:27 pm" },
					condition: { text: "Cloudy", code: 26, temperature: 3 },
					pubDate: 1551254400
				},
				forecasts: [
					{
						day: "Wed",
						date: 1551222000,
						low: 0,
						high: 11,
						text: "Partly Cloudy",
						code: 30
					},
					{
						day: "Thu",
						date: 1551308400,
						low: 0,
						high: 15,
						text: "Mostly Sunny",
						code: 34
					},
					{
						day: "Fri",
						date: 1551394800,
						low: 0,
						high: 16,
						text: "Mostly Sunny",
						code: 34
					},
					{
						day: "Sat",
						date: 1551481200,
						low: 2,
						high: 14,
						text: "Mostly Sunny",
						code: 34
					},
					{
						day: "Sun",
						date: 1551567600,
						low: 0,
						high: 16,
						text: "Mostly Sunny",
						code: 34
					},
					{
						day: "Mon",
						date: 1551654000,
						low: 1,
						high: 21,
						text: "Sunny",
						code: 32
					},
					{
						day: "Tue",
						date: 1551740400,
						low: 3,
						high: 20,
						text: "Mostly Sunny",
						code: 34
					},
					{
						day: "Wed",
						date: 1551826800,
						low: 7,
						high: 18,
						text: "Partly Cloudy",
						code: 30
					},
					{
						day: "Thu",
						date: 1551913200,
						low: 4,
						high: 18,
						text: "Mostly Cloudy",
						code: 28
					},
					{
						day: "Fri",
						date: 1551999600,
						low: 5,
						high: 15,
						text: "Rain",
						code: 12
					}
				]
			}
		}
	};

	static getData(view: string): any {
		let __data: any = App.isMobile() ? this._dataMobile : this._dataDesktop;
		let data = {
			app: __data.app,
			menus: __data.menus,
			content: __data[view] ? __data[view].content : {}
		};
		return data;
	}
}
