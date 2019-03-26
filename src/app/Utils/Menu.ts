export default class Menu {
	static addIcons(arr: any[]): any {
		const mappedArr: any[] = [];
		for (let i = 0; i < arr.length; i++) {
			let mapped = arr[i];
			mappedArr.push(mapped);
			if (mapped.title === "-") mapped.divider = true;
			else if (mapped.title === "الرئيسية")
				mapped.title = `<span class="uk-inline uk-margin-small-left" uk-icon="icon: homepage"></span> ${
					mapped.title
				}`;
                else if (mapped.live)
				mapped.title = `<span class="uk-inline uk-margin-small-left" uk-icon="icon: tv-4"></span> ${
                    mapped.title
				}`;
                else if (mapped.title === "جدول البرامج")
                    mapped.title = `<span class="uk-inline uk-margin-small-left" uk-icon="icon: tv-1"></span> ${
                        mapped.title
                    }`;
                else if (mapped.title === "أخبار مميزة")
                    mapped.title = `<span class="uk-inline uk-margin-small-left" uk-icon="icon: star"></span> ${
                        mapped.title
                    }`;
                else if (mapped.title === "أخبار بالفيديو")
                    mapped.title = `<span class="uk-inline uk-margin-small-left" uk-icon="icon: play-2"></span> ${
                        mapped.title
                    }`;
                else if (mapped.title === "شاهد")
                    mapped.title = `<span class="uk-inline uk-margin-small-left" uk-icon="icon: tv-3"></span> ${
                        mapped.title
                    }`;
                else if (mapped.title === "من نحن")
                    mapped.title = `<span class="uk-inline uk-margin-small-left" uk-icon="icon: information"></span> ${
                        mapped.title
                    }`;
                else if (mapped.title === "اتصل بنا")
                    mapped.title = `<span class="uk-inline uk-margin-small-left" uk-icon="icon: call24"></span> ${
                        mapped.title
                    }`;
		}
		return mappedArr;
	}

	public static mapIsActive(arr: any[]): any[] {
		const mappedArr: any[] = [];
		for (let i = 0; i < arr.length; i++) {
			let mapped = arr[i];
			mapped.active = mapped.href === window.location.href;

			mappedArr.push(mapped);
			if (mapped.children && mapped.children.length) {
				mapped.children = this.mapIsActive(mapped.children);
			}
		}
		return mappedArr;
	}
}
