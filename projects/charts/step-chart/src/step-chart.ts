import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  IgcCategoryChartModule,
  IgcLegendModule,
} from "igniteui-webcomponents-charts";
import { ModuleManager } from "igniteui-webcomponents-core";

import stepChartStyles from "./step-chart.scss?inline";
import { configureTheme } from "igniteui-webcomponents";

ModuleManager.register(IgcCategoryChartModule, IgcLegendModule);

@customElement("app-step-chart")
export class StepChart extends LitElement {
  @property({ type: Array }) countryRenewableElectricity = [
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
            .dataSource=${this.countryRenewableElectricity}
            legend="legend"
            chart-type="StepArea"
            title-alignment="Left"
            title-left-margin="25"
            title-top-margin="10"
            title-bottom-margin="10"
            y-axis-title="TWh"
            is-category-highlighting-enabled="true"
            is-series-highlighting-enabled="true"
            is-transition-in-enabled="true"
            is-horizontal-zoom-enabled="false"
            is-vertical-zoom-enabled="false"
            crosshairs-snap-to-data="true"
          >
          </igc-category-chart>
        </div>
      </div>
    `;
  }

  static styles = unsafeCSS(stepChartStyles);
}
