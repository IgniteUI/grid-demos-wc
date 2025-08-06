import { LitElement, unsafeCSS, html } from "lit";
import { customElement } from "lit/decorators.js";
// import "../../../projects/charts/column-chart/src/column-chart";
import "../../../../projects/charts/column-chart/src/column-chart";
import namedStyles from "./column-chart-view.scss?inline";
// import sharedStyles from "../../shared/styles.scss?inline";
import sharedStyles from "../../../shared/styles.scss?inline";

@customElement("column-chart-view")
export default class ColumnChartView extends LitElement {
  constructor() {
    super();
  }

  private onLoad = (event: any) => {
    console.log('=> Column chart LOADING');
    event.target.parentElement.classList.remove("loading");
  };

  render() {
    const iframeSrc = `${import.meta.env.BASE_URL}charts/column-chart`;
    // console.log('=> iframeSrc', iframeSrc);
    return html` <div class="iframe-wrapper loading">
      <iframe src=${iframeSrc} @load=${this.onLoad}></iframe>
    </div>`;
  }
  static styles = [unsafeCSS(namedStyles), unsafeCSS(sharedStyles)];
}
