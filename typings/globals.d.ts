declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}


interface JQuery {
  carouFredSel(options?: any): JQuery;
  breakingNews(options?: any): JQuery;
}

interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64, GlobalFetch, WindowOrWorkerGlobalScope, WindowEventHandlers {
  jQuery: JQueryStatic;
  encodeURIComponent: any;
  data: any;
  slideshow: any;
}


/**
 * variables on page header
 */
interface VV {
  view: string;
  id?: number;
  query?: string;
}
declare let vv:VV;
declare let tplPath: string;
declare let url: string;