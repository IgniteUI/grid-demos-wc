import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import {
  IgcPieChartModule,
  IgcItemLegendModule,
  SliceClickEventArgs,
  IgcPieChartComponent,
} from "igniteui-webcomponents-charts";
import { configureTheme } from "igniteui-webcomponents";
import pieChartStyles from "./pie-chart.scss?inline";
import { ModuleManager } from "igniteui-webcomponents-core";

ModuleManager.register(IgcItemLegendModule, IgcPieChartModule);

@customElement("app-pie-chart")
export class PieChartSample extends LitElement {
  static styles = unsafeCSS(pieChartStyles);

  private energyGlobalDemand = [
    { value: 37, category: "Cooling", summary: "Cooling 37%" },
    { value: 25, category: "Residential", summary: "Residential 25%" },
    { value: 12, category: "Heating", summary: "Heating 12%" },
    { value: 11, category: "Lighting", summary: "Lighting 11%" },
    { value: 15, category: "Other", summary: "Other 15%" },
  ];

  private secondChartData = [
    { MarketShare: 37, Company: "Cooling", Summary: "Cooling 37%" },
    { MarketShare: 25, Company: "Residential", Summary: "Residential 25%" },
    { MarketShare: 12, Company: "Heating", Summary: "Heating 12%" },
    { MarketShare: 8, Company: "Lighting", Summary: "Lighting 8%" },
    { MarketShare: 18, Company: "Other", Summary: "Other 18%" },
  ];

  firstUpdated() {
    const pieChart = this.renderRoot.querySelector("#chart2") as any;

    pieChart.sliceClick = (
      _: IgcPieChartComponent,
      args: SliceClickEventArgs
    ) => {
      args.isExploded = !args.isExploded;
    };

    // Adding legend to the first pie chart
    const legendEl = this.renderRoot.querySelector('#legend') as any;
    const chartEl = this.renderRoot.querySelector('#chart') as any;
    chartEl.legend = legendEl;

    // Adding legend to the second pie chart
    const legendEl2 = this.renderRoot.querySelector('#legend2') as any;
    const chartEl2 = this.renderRoot.querySelector('#chart2') as any;
    chartEl2.legend = legendEl2;
  }

  render() {
    configureTheme("material");

    return html`
      <link
        rel="stylesheet"
        href="${import.meta.env.BASE_URL}themes/material.css"
      />

      <div class="charts-container">
        <div class="chart-wrapper">
          <div class="pie-chart-variant">PIE CHART</div>
          <div class="legend-title">
            Global Electricity Demand by Energy Use
          </div>

          <div class="legend">
            <igc-item-legend
              id="legend"
              name="legend"
              orientation="Horizontal"
            ></igc-item-legend>
          </div>

          <div class="pie-chart">
            <igc-pie-chart
              name="chart"
              id="chart"
              .dataSource=${this.energyGlobalDemand}
              legend-label-member-path="category"
              label-member-path="summary"
              labels-position="BestFit"
              value-member-path="value"
              radius-factor="0.7"
            >
            </igc-pie-chart>
          </div>
        </div>

        <div class="chart-wrapper">
          <div class="pie-chart-variant">PIE CHART EXPLOSION</div>
          <div class="legend-title">
            Global Electricity Demand by Energy Use
          </div>

          <div class="legend">
            <igc-item-legend
              id="legend2"
              name="legend2"
              orientation="Horizontal"
            ></igc-item-legend>
          </div>
          <div class="pie-chart chart2">
            <igc-pie-chart
              name="chart2"
              id="chart2"
              .dataSource=${this.secondChartData}
              label-member-path="Summary"
              legend-label-member-path="Company"
              value-member-path="MarketShare"
              labels-position="OutsideEnd"
              label-extent="30"
              exploded-slices="3"
            >
            </igc-pie-chart>
          </div>
        </div>
      </div>
    `;
  }
}
