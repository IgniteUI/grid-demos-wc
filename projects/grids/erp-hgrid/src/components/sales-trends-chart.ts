import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ModuleManager } from "igniteui-webcomponents-core";
import { 
  IgcCategoryXAxisModule, 
  IgcColumnSeriesModule, 
  IgcDataChartCoreModule, 
  IgcDataChartInteractivityModule, 
  IgcDataChartVisualDataModule,
  IgcNumericYAxisModule
 } from "igniteui-webcomponents-charts";
import { DataPoint } from "../models/DataPoint";


ModuleManager.register(
    IgcDataChartCoreModule,
    IgcCategoryXAxisModule,
    IgcNumericYAxisModule,
    IgcColumnSeriesModule,
    IgcDataChartVisualDataModule,
    IgcDataChartInteractivityModule
  );

@customElement("app-sales-trends-chart")
export class GridChart extends LitElement {

    @property({ type: Array }) trendData: DataPoint[] = [];

    render() {
      return html`
        <igc-data-chart 
          width="100%" 
          height="100%"
          plot-area-background="transparent"
          highlighting-mode="FadeOthersSpecific"
          highlighting-behavior="NearestItemsAndSeries">
  
          <igc-category-x-axis 
            id="xAxis"
            name="xAxis"
            label="month"
            label-visibility="collapsed"
            gap=".4"
            stroke="transparent"
            .dataSource=${this.trendData}>
          </igc-category-x-axis>
  
          <igc-numeric-y-axis
            id="yAxis"
            name="yAxis"
            label-visibility="collapsed"
            major-stroke="transparent"
            stroke="transparent">
          </igc-numeric-y-axis>
  
          <igc-column-series
            x-axis-name="xAxis"
            y-axis-name="yAxis"
            radiusX="2"
            radiusY="2"
            title="Sold Units"
            value-member-path="unitsSold"
            show-default-tooltip="true"
            brush="#8A8A8A"
            outline="#8A8A8A"
            highlighting-fade-opacity="0.3"
            .dataSource=${this.trendData}>
          </igc-column-series>
        </igc-data-chart>
      `;
    }

    static styles = css`
      :host { 
        width: 100%;
        height: 100%;
      }


      igc-tooltip-container {
        background-color: white;
        color: black;
        padding: 8px 12px;
        font-size: 12px;
        border: 1px solid black;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      }
    `;
}