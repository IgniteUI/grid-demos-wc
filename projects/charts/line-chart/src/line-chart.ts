import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  IgcCategoryChartModule,
  IgcLegendModule,
} from "igniteui-webcomponents-charts";
import { ModuleManager } from "igniteui-webcomponents-core";

import lineChartStyles from "./line-chart.scss?inline";
import { configureTheme } from "igniteui-webcomponents";

ModuleManager.register(IgcCategoryChartModule, IgcLegendModule);

@customElement("app-line-chart")
export class LineChart extends LitElement {
  @property({ type: Array }) data = [
    { year: "2009", europe: 34, china: 21, america: 19 },
    { year: "2010", europe: 43, china: 26, america: 24 },
    { year: "2011", europe: 66, china: 29, america: 28 },
    { year: "2012", europe: 69, china: 32, america: 26 },
    { year: "2013", europe: 58, china: 47, america: 38 },
    { year: "2014", europe: 40, china: 46, america: 31 },
    { year: "2015", europe: 78, china: 50, america: 19 },
    { year: "2016", europe: 13, china: 90, america: 52 },
    { year: "2017", europe: 78, china: 132, america: 50 },
    { year: "2018", europe: 40, china: 134, america: 34 },
    { year: "2019", europe: 80, china: 96, america: 38 },
  ];

  render() {
    configureTheme("fluent");

    return html`
      <div class="container">
        <div class="legend-title">Renewable Electricity Generated</div>

        <div class="legend">
          <igc-legend id="legend" orientation="Horizontal"></igc-legend>
        </div>

        <div class="chart-wrapper">
          <igc-category-chart
            id="chart"
            width="100%"
            height="100%"
            .dataSource=${this.data}
            .chartType=${"Line"}
            includedProperties='["year", "europe", "china", "america"]'
            .isHorizontalZoomEnabled=${false}
            .isVerticalZoomEnabled=${false}
            yAxisTitle="TWh"
            yAxisTitleLeftMargin="10"
            yAxisTitleRightMargin="5"
            yAxisLabelLeftMargin="0"
            computedPlotAreaMarginMode="Series"
            legend="legend"
          >
          </igc-category-chart>
        </div>
      </div>
    `;
  }

  static styles = unsafeCSS(lineChartStyles);
}
