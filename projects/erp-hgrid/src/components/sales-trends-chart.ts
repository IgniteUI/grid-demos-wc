import { IgcCategoryXAxisComponent, IgcCategoryXAxisModule, IgcColumnSeriesComponent, IgcColumnSeriesModule, IgcDataChartCoreModule, IgcDataChartVisualDataModule, IgcNumericYAxisComponent, IgcNumericYAxisModule } from "igniteui-webcomponents-charts";
import { ModuleManager } from "igniteui-webcomponents-core";
import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcCategoryXAxisModule,
    IgcNumericYAxisModule,
    IgcColumnSeriesModule,
    IgcDataChartVisualDataModule
  );

@customElement("app-sales-trends-chart")
export class GridChart extends LitElement {

    @property({ type: Array }) trendData: any[] = [];

    @query("#xAxis", true) xAxis!: IgcCategoryXAxisComponent;
    @query("#yAxis", true) yAxis!: IgcNumericYAxisComponent;
    @query("igc-column-series", true) series!: IgcColumnSeriesComponent;

    render() {
        return html`
        <igc-data-chart width="100%" height="100%"
          plot-area-background="transparent"
          highlightingMode="FadeOthersSpecific"
          highlightingBehavior="NearestItemsAndSeries">
  
          <igc-category-x-axis 
            id="xAxis"
            name="xAxis"
            .dataSource=${this.trendData}
              label="month"
              label-visibility="collapsed"
              gap=".4"
              stroke="transparent">
          </igc-category-x-axis>
  
          <igc-numeric-y-axis
              id="yAxis"
              name="yAxis"
              label-visibility="collapsed"
              major-stroke="transparent"
              stroke="transparent"
              >
          </igc-numeric-y-axis>
  
          <igc-column-series
             x-axis-name="xAxis"
             y-axis-name="yAxis"
              .dataSource=${this.trendData}
              radiusX="2"
              radiusY="2"
              title="Sold Units"
              value-member-path="unitsSold"
              .showDefaultTooltip="${true}"
              brush="#8A8A8A"
              outline="#8A8A8A"
              highlighting-mode="fadeOthersOnHover"
              highlighting-fade-opacity="0.3">
          </igc-column-series>
      </igc-data-chart>
      `;
    }

    static styles = css`
        :host { 
          width: 100%;
          height: 100%; }
    `;
}