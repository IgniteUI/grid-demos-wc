import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  IgcDataChartAnnotationModule,
  IgcDataChartCoreModule,
  IgcDataChartInteractivityModule,
  IgcDataChartPolarCoreModule,
  IgcDataChartPolarModule,
  IgcLegendModule
} from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import polarChartStyles from './polar-chart.scss?inline';
import { configureTheme } from 'igniteui-webcomponents';

ModuleManager.register(
  IgcLegendModule,
  IgcDataChartCoreModule,
  IgcDataChartPolarModule,
  IgcDataChartPolarCoreModule,
  IgcDataChartInteractivityModule,
  IgcDataChartAnnotationModule
);

@customElement('app-polar-chart')
export class PolarChart extends LitElement {
  @property({ type: Array })
  public boatSailingData = [
    { direction: 0, boatSpeed: 70, windSpeed: 90 },
    { direction: 45, boatSpeed: 35, windSpeed: 65 },
    { direction: 90, boatSpeed: 25, windSpeed: 45 },
    { direction: 135, boatSpeed: 15, windSpeed: 25 },
    { direction: 180, boatSpeed: 0, windSpeed: 0 },
    { direction: 225, boatSpeed: 15, windSpeed: 25 },
    { direction: 270, boatSpeed: 25, windSpeed: 45 },
    { direction: 315, boatSpeed: 35, windSpeed: 65 },
    { direction: 360, boatSpeed: 70, windSpeed: 90 }
  ];

  render() {
    configureTheme('fluent');

    return html`
    <div class="polar-chart-container">
    <div class="legend-title">
        Wind Speed vs Boat Speed
        <span class="legend-color-box wind-speed"></span>
        <span class="legend-color-box boat-speed"></span>
      </div>

      <div class="legend">
          <igc-legend
          name="legend"
          id="legend"
          orientation="Horizontal">
          </igc-legend>
      </div>
      
      <div class="chart-wrapper">
      <igc-data-chart
        width="100%"
        height="100%"
        name="chart"
        id="chart"
        legend="legend"
        .dataSource=${this.boatSailingData}
        is-horizontal-zoom-enabled="false"
        is-vertical-zoom-enabled="false">
            <igc-numeric-angle-axis
            name="angleAxis"
            id="angleAxis"
            start-angle-offset="-90"
            interval="30"
            minimum-value="0"
            maximum-value="360">
            </igc-numeric-angle-axis>
            <igc-numeric-radius-axis
            name="radiusAxis"
            id="radiusAxis"
            radius-extent-scale="0.9"
            inner-radius-extent-scale="0.1"
            interval="25"
            minimum-value="0"
            maximum-value="100">
            </igc-numeric-radius-axis>


            <igc-polar-area-series
            angle-member-path="direction"
            radius-member-path="windSpeed"
            angle-axis-name="angleAxis"
            radius-axis-name="radiusAxis"
            title="Wind Speed"
            marker-type="Circle"
          ></igc-polar-area-series>

          <igc-polar-area-series
            angle-member-path="direction"
            radius-member-path="boatSpeed"
            angle-axis-name="angleAxis"
            radius-axis-name="radiusAxis"
            title="Boat Speed"
            marker-type="Circle"
          ></igc-polar-area-series>


            <igc-data-tool-tip-layer
            name="dataToolTipLayer"
            id="dataToolTipLayer">
            </igc-data-tool-tip-layer>
        </igc-data-chart>
      </div>
    </div>
  `;
  }

  static styles = unsafeCSS(polarChartStyles);
}
