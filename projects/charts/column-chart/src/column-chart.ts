import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  IgcCategoryChartModule,
} from 'igniteui-webcomponents-charts';
import { configureTheme } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
import chartStyles from './column-chart.scss?inline';

ModuleManager.register(
  IgcCategoryChartModule
);

@customElement('app-column-chart')
export class ColumnChart extends LitElement {
  static styles = unsafeCSS(chartStyles);

  @property({ type: Array }) chartData = [
    { month: 'January', temperature: 3 },
    { month: 'February', temperature: 4 },
    { month: 'March', temperature: 9 },
    { month: 'April', temperature: 15 },
    { month: 'May', temperature: 21 },
    { month: 'June', temperature: 26 },
    { month: 'July', temperature: 29 },
    { month: 'August', temperature: 28 },
    { month: 'September', temperature: 24 },
    { month: 'October', temperature: 18 },
    { month: 'November', temperature: 11 },
    { month: 'December', temperature: 5 },
  ];

  render() {
    configureTheme('fluent');
    
    return html`
      <div class="container">
        <igc-category-chart
          .dataSource=${this.chartData}
          .chartType=${"Column"} 
          yAxisTitle="Temperature in °C"
          yAxisTitleLeftMargin="10"
          yAxisTitleRightMargin="5"
          yAxisLabelLeftMargin="0"
          highlightingMode="FadeOthersSpecific"
          highlightingBehavior="NearestItemsAndSeries"
          .isHorizontalZoomEnabled=${false}
          .isVerticalZoomEnabled=${false}>
        </igc-category-chart>
      </div>
    `;
  }
}
