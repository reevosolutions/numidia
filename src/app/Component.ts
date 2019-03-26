import $ from "jquery";

export default class Component {
  protected _template: string;
  protected _data: any;


	constructor() {
    this._template = "article-card/default";
	}

  /**
   * Getter template
   * @return {string }
   */
  public get template(): string {
    return this._template;
  }

  /**
   * Setter template
   * @param {string } value
   */
  public set template(value: string) {
    this._template = value;
  }

/**
   * Getter data
   * @return {any }
   */
  public get data(): any {
    return this._data;
  }

  /**
   * Setter name
   * @param {any } value
   */
  public set data(value: any) {
    this._data = value;
  }
  

  public render(): JQuery{
    return $('<div>Default Component</div>');
  };
}
