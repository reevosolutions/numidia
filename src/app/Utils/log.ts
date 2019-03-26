export default class Log {
	static conf = {
		gray:
			"background: transparent; color: #8a8a8a; font-size: 12px; padding: 2px 8px;",
		red: "background: #f98989; color: #000; font-size: 12px; padding: 2px 8px;",
		green:
			"background: #a5e8b5; color: #000; font-size: 12px; padding: 2px 8px;",
		blue:
			"background: #5697fb; color: #fff; font-size: 12px; padding: 2px 8px;",
		ajax:
			"background: #a52a9b; color: #000; font-size: 12px; padding: 2px 8px;",
		event: "background: #666; color: #fff; font-size: 12px; padding: 2px 8px;",
		step:
			"color: #d28f00; background: #fff; font-size: 12px; padding: 2px 8px;",
		yellow:
			"background: #ffe30d; color: #000; font-size: 12px; padding: 2px 8px;",
		notification:
			"background: #f76d8e; color: #000; font-size: 12px; padding: 2px 8px;"
	};
	static _log(
		title: string,
		conf: string,
		a?: any,
		b?: any,
		c?: any,
		d?: any
	): void {
		let trace: any = new Error("");
		trace = null;
		if (typeof d !== "undefined")
			console.log(
				"%c [" + title + "] " + a,
				conf,
				"\n",
				b,
				"\n",
				c,
				"\n",
				d,
				"\n",
				trace
			);
		else if (typeof c !== "undefined")
			console.log(
				"%c [" + title + "] " + a,
				conf,
				"\n",
				b,
				"\n",
				c,
				"\n",
				trace
			);
		else if (typeof b !== "undefined")
			console.log("%c [" + title + "] " + a, conf, "\n", b, "\n", trace);
		else console.log("%c [" + title + "] " + a, conf, "\n", trace);
	}
	static gray(a?: any, b?: any, c?: any, d?: any): void {
		Log._log(" ", Log.conf.gray, a, b, c, d);
	}

	static red(a?: any, b?: any, c?: any, d?: any) {
		Log._log(" ", Log.conf.red, a, b, c, d);
	}
	static green(a?: any, b?: any, c?: any, d?: any) {
		Log._log(" ", Log.conf.green, a, b, c, d);
	}
	static blue(a?: any, b?: any, c?: any, d?: any) {
		Log._log(" ", Log.conf.blue, a, b, c, d);
	}
	static ajax(a?: any, b?: any, c?: any, d?: any) {
		Log._log("AJAX", Log.conf.ajax, a, b, c, d);
	}
	static todo(a?: any, b?: any, c?: any, d?: any) {
		Log._log("TODO", Log.conf.yellow, a, b, c, d);
		// throw new Error('RvcTodo trace');
	}
	static step(a?: any, b?: any, c?: any, d?: any) {
		Log._log("STEP", Log.conf.step, a, b, c, d);
	}
	static event(a?: any, b?: any, c?: any, d?: any) {
		Log._log("EVENT", Log.conf.event, a, b, c, d);
	}
	static error(a?: any, b?: any, c?: any, d?: any) {
		Log._log("ERROR", Log.conf.red, a, b, c, d);
		// var err = typeof value === 'object' && value.message ? value.message : value;
		// UIkit.notification({
		//     message: err,
		//     status: 'danger',
		//     pos: 'bottom-center',
		//     timeout: 5000
		// });
	}
	static success(a?: any, b?: any, c?: any, d?: any) {
		Log._log("SUCCESS", Log.conf.green, a, b, c, d);
	}
	static notification(a?: any, b?: any, c?: any, d?: any) {
		Log._log("EVENT", Log.conf.notification, a, b, c, d);
	}
}
