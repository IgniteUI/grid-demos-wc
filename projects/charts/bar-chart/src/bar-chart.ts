import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  IgcLegendModule,
  IgcBarSeriesModule,
  IgcCategoryYAxisModule,
  IgcNumericXAxisModule,
  IgcDataChartCoreModule,
  IgcDataChartCategoryModule,
  IgcDataChartInteractivityModule,
  IgcDataToolTipLayerModule,
  IgcCategoryHighlightLayerModule,
} from "igniteui-webcomponents-charts";

import { configureTheme } from "igniteui-webcomponents";
import { ModuleManager } from "igniteui-webcomponents-core";

import styles from "./bar-chart.scss?inline";

ModuleManager.register(
  IgcLegendModule,
  IgcBarSeriesModule,
  IgcCategoryYAxisModule,
  IgcNumericXAxisModule,
  IgcDataChartCoreModule,
  IgcDataChartCategoryModule,
  IgcDataChartInteractivityModule,
  IgcDataToolTipLayerModule,
  IgcCategoryHighlightLayerModule
);

@customElement("app-bar-chart")
export class BarChartSample extends LitElement {
  @property({ type: Array }) highestGrossingMovies = [
    { franchise: "Marvel Universe", totalRevenue: 22.55, highestGrossing: 2.8 },
    { franchise: "Star Wars", totalRevenue: 10.32, highestGrossing: 2.07 },
    { franchise: "Harry Potter", totalRevenue: 9.19, highestGrossing: 1.34 },
    { franchise: "Avengers", totalRevenue: 7.76, highestGrossing: 2.8 },
    { franchise: "Spider Man", totalRevenue: 7.22, highestGrossing: 1.28 },
    { franchise: "James Bond", totalRevenue: 7.12, highestGrossing: 1.11 },
  ];

  firstUpdated() {
    const legendEl = this.renderRoot.querySelector('#legend') as any;
    const chartEl = this.renderRoot.querySelector('igc-data-chart') as any;
    chartEl.legend = legendEl;
  }
  
  render() {
    configureTheme("material");

    return html`
      <link
        rel="stylesheet"
        href="${import.meta.env.BASE_URL}themes/material.css"
      />

      <div class="container">
        <div class="legend-title">Highest Grossing Movie Franchises</div>

        <div class="legend">
          <igc-legend orientation="Horizontal" id="legend" name="legend"></igc-legend>
        </div>

        <div class="chart-wrapper">
          <igc-data-chart width="100%" height="100%">
            <igc-category-y-axis
              name="yAxis"
              label="franchise"
              .dataSource=${this.highestGrossingMovies}
              is-inverted="true"
              use-enhanced-interval-management="true"
              enhanced-interval-prefer-more-category-labels="true"
              gap="0.5"
              overlap="-0.1"
            ></igc-category-y-axis>

            <igc-numeric-x-axis
              name="xAxis"
              title="Billions of U.S. Dollars"
            ></igc-numeric-x-axis>

            <igc-category-highlight-layer></igc-category-highlight-layer>

            <igc-bar-series
              name="BarSeries1"
              title="Total Revenue of Franchise"
              x-axis-name="xAxis"
              y-axis-name="yAxis"
              .dataSource=${this.highestGrossingMovies}
              value-member-path="totalRevenue"
              show-default-tooltip="true"
              is-transition-in-enabled="true"
              is-highlighting-enabled="true"
            ></igc-bar-series>

            <igc-bar-series
              name="BarSeries2"
              title="Highest Grossing Movie in Series"
              x-axis-name="xAxis"
              y-axis-name="yAxis"
              .dataSource=${this.highestGrossingMovies}
              value-member-path="highestGrossing"
              show-default-tooltip="true"
              is-transition-in-enabled="true"
              is-highlighting-enabled="true"
            ></igc-bar-series>

            <igc-data-tool-tip-layer></igc-data-tool-tip-layer>
          </igc-data-chart>
        </div>
      </div>
    `;
  }

  static styles = unsafeCSS(styles);
}
