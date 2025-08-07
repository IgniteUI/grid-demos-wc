import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IgcCategoryChartModule } from "igniteui-webcomponents-charts";
import { configureTheme } from "igniteui-webcomponents";
import { ModuleManager } from "igniteui-webcomponents-core";
import chartStyles from "./column-chart.scss?inline";

ModuleManager.register(IgcCategoryChartModule);

@customElement("app-column-chart")
export class ColumnChart extends LitElement {
  static styles = unsafeCSS(chartStyles);

  @property({ type: Array }) chartData = [
    { month: "January", temperature: 3 },
    { month: "February", temperature: 4 },
    { month: "March", temperature: 9 },
    { month: "April", temperature: 15 },
    { month: "May", temperature: 21 },
    { month: "June", temperature: 26 },
    { month: "July", temperature: 29 },
    { month: "August", temperature: 28 },
    { month: "September", temperature: 24 },
    { month: "October", temperature: 18 },
    { month: "November", temperature: 11 },
    { month: "December", temperature: 5 },
  ];

  render() {
    configureTheme("material");

    return html`
      <link
        rel="stylesheet"
        href="${import.meta.env.BASE_URL}themes/material.css"
      />
      <div class="container">
        <igc-category-chart
          .dataSource=${this.chartData}
          .chartType=${"Column"}
          y-Axis-Title="Temperature in °C"
          y-axis-title-left-margin="10"
          y-axis-title-right-margin="5"
          y-axis-label-left-margin="0"
          highlighting-mode="FadeOthersSpecific"
          highlighting-behavior="NearestItemsAndSeries"
          .isHorizontalZoomEnabled=${false}
          .isVerticalZoomEnabled=${false}
        >
        </igc-category-chart>
      </div>
    `;
  }
}
