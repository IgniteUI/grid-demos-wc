import { LitElement, css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { dataService } from "../services/data-service";
import { IgcCellTemplateContext, IgcColumnComponent, IgcGridComponent, IgcGridMasterDetailContext, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import { configureTheme, defineComponents, IgcAvatarComponent, IgcBadgeComponent, IgcButtonComponent, IgcCarouselComponent, IgcDividerComponent, IgcIconComponent, IgcInputComponent, IgcSelectComponent, IgcSelectHeaderComponent, IgcSelectItemComponent, IgcTabsComponent, registerIconFromText } from "igniteui-webcomponents";
import { check, delivery, wrench } from '@igniteui/material-icons-extended';
import { ModuleManager } from "igniteui-webcomponents-core";
import "./trip-history-grid";
import "./maintenance"

import 'igniteui-webcomponents-grids/grids/combined.js';
import { CLEAR } from "../assets/icons/icons";
import CAR_PHOTO_MANIFEST from '../assets/car_photo_manifest.json';
import CAR_IMAGES from '../assets/car_images.json';
import VEHICLE_DETAILS from '../assets/vehicle_details.json';
import { Period } from "../models/period-enum";
import { ChartType } from "../models/chart-type-enum";
import { IgcCategoryChartModule, IgcLegendComponent, IgcLegendModule, IgcPieChartModule } from "igniteui-webcomponents-charts";


defineComponents(IgcIconComponent, IgcButtonComponent, IgcIconComponent, IgcAvatarComponent, IgcBadgeComponent, IgcTabsComponent, IgcCarouselComponent, IgcDividerComponent, IgcSelectComponent, IgcSelectItemComponent, IgcSelectHeaderComponent)
configureTheme("material");

ModuleManager.register(IgcCategoryChartModule, IgcPieChartModule, IgcLegendModule)

@customElement("app-fleet-management")
export class FleetManagementGrid extends LitElement {
  private vehiclesData: any[] = []

  @state()
  private periods: { [vehicleId: string]: { costPerTypePeriod: Period, costPerMeterPeriod: Period, fuelCostPeriod: Period } | null } = {};

  constructor() {
    super();
    registerIconFromText("clear", CLEAR, "material");
    registerIconFromText(check.name, check.value, "imx-icons");
    registerIconFromText(wrench.name, wrench.value, "imx-icons");
    registerIconFromText(delivery.name, delivery.value, "imx-icons");
    
    this.vehiclesData = dataService.getVehiclesData();
  }


  @query('#main-grid') mainGrid!: IgcGridComponent;
  @query('#make-column') makeColumn!: IgcColumnComponent;
  @query('#status-column') statusColumn!: IgcColumnComponent;
  @query('#location-column') locationColumn!: IgcColumnComponent;
  @query('#legend') legend!: IgcLegendComponent;

  @state() private hasSorting = false;

  firstUpdated() {
    this.mainGrid.sortingExpressions = [
      { dir: SortingDirection.Asc, fieldName: "vehicleId", ignoreCase: true }
    ]

    this.mainGrid.addEventListener("sortingDone", () => {
      this.hasSorting = this.mainGrid.sortingExpressions.length > 0;
    });

    

    this.hasSorting = this.mainGrid.sortingExpressions.length > 0;

    this.makeColumn.bodyTemplate = this.makeCellTemplate;
    this.statusColumn.bodyTemplate = this.statusCellTemplate;
    this.locationColumn.bodyTemplate = this.locationCellTemplate;

    this.mainGrid.detailTemplate = this.masterDetailTemplate
  }

  clearSorting() {
    if (this.mainGrid) {
      this.mainGrid.sortingExpressions = [];
      this.hasSorting = false;
    }
  }

  private masterDetailTemplate = (ctx: IgcGridMasterDetailContext) => {
    const images: any[] = this.getPathToCarImage(ctx.implicit.vehicleId)

    return html`
      <igc-tabs>
        <igc-tab panel="details">
          <span>Details</span>
        </igc-tab>
        <igc-tab panel="trip-history"><span>Trip History</span></igc-tab>
        <igc-tab panel="maintenance"><span>Maintenance</span></igc-tab>
        <igc-tab panel="cost"><span>Cost</span></igc-tab>
        <igc-tab panel="utilization"><span>Utilization</span></igc-tab>


        <igc-tab-panel id="details">
          <div class="details-container">
            <div class="carousel-container">
              <igc-carousel>
                ${images.map(image => html`
                  <igc-carousel-slide>
                    <div class="image-container">
                      <img src="${ image }" alt="Vehicle Image" />
                    </div>
                  </igc-carousel-slide>  
                `)}
              </igc-carousel>
            </div>

            <div class="details-table">
              ${ [VEHICLE_DETAILS.detailsCategories, VEHICLE_DETAILS.engineCategories].map(categorySet => html`
                <div class="detail-block-container">
                  <div class="detail-category-container">
                    ${ categorySet.map(category => html`
                      <div class="detail-item">
                        <span class="detail-category">${ category.label }:</span>
                        <igc-divider></igc-divider>
                      </div>
                    `)}
                  </div>
                  <div class="detail-content-container">
                    ${ categorySet.map(category => html`
                      <div class="detail-item">
                        <span class="detail-value">${ this.getValueByPath(ctx.implicit, category.key) }</span>
                        <igc-divider></igc-divider>
                      </div>
                    `) }
                  </div>
                </div>    
              `) }
            </div>
          </div>
        </igc-tab-panel>

        <igc-tab-panel id="trip-history">
          <trip-history-grid .tripHistoryData="${ dataService.getTripHistoryData(ctx.implicit.vehicleId) }"></trip-history-grid>
        </igc-tab-panel>


        <igc-tab-panel id="maintenance">
          <maintenance-grid .maintenanceData="${ dataService.getMaintenanceData(ctx.implicit.vehicleId) }"></maintenance-grid>
        </igc-tab-panel>


        <igc-tab-panel id="cost">
          <div class="dashboard">
            <div class="chart-container pie-chart-container">
              <div class="chart-header">
                <span class="chart-title">Costs per Type</span>
                <igc-select #select class="chart-select" .value="${ this.periods[ctx.implicit.vehicleId]?.costPerTypePeriod || Period.YTD }"
                @igcChange="${ (event: any) => this.onPeriodChange(event, 'costsPerType', ctx.implicit.vehicleId) }">
                  <igc-select-header>Period</igc-select-header>
                  <igc-select-item value="${ Period.YTD }">YTD</igc-select-item>
                  <igc-select-item value="${ Period.ThreeMonths }">Last 3 Months</igc-select-item>
                  <igc-select-item value="${ Period.SixMonths }">Last 6 Months</igc-select-item>
                  <igc-select-item value="${ Period.TwelveMonths }">Last 12 Months</igc-select-item>
                </igc-select>
              </div>
              <div class="chart-content">
                <igc-pie-chart
                  name="chart"
                  class="pie-chart-canvas"
                  #chart
                  legend-label-member-path="category"
                  label-member-path="summary"
                  value-member-path="value"
                  labels-position="OutsideEnd"
                  radius-factor="0.7"
                  label-extent="15"
                  .dataSource="${dataService.getCostsPerTypeData(ctx.implicit.vehicleId, this.periods[ctx.implicit.vehicleId]?.costPerTypePeriod || Period.YTD)}"
                  actual-label-outer-color="#ededed"
                  >
                </igc-pie-chart>
              </div>
            </div>

            <div class="chart-container area-chart-container">
              <div class="chart-header">
                <span class="chart-title">Costs per Meter, per Quarter</span>
                <igc-select #select class="chart-select" .value="${this.periods[ctx.implicit.vehicleId]?.costPerMeterPeriod || Period.YTD}"
                @igcChange="${(event: any) => this.onPeriodChange(event, 'costsPerMeter', ctx.implicit.vehicleId)}">
                  <igc-select-header>Period</igc-select-header>
                  <igc-select-item value="ytd">YTD</igc-select-item>
                  <igc-select-item value="'2023'">2023</igc-select-item>
                  <igc-select-item value="'2022'">2022</igc-select-item>
                  <igc-select-item value="'2021'">2021</igc-select-item>
                  <igc-select-item value="'2020'">2020</igc-select-item>
                </igc-select>
              </div>
              <div class="chart-content">
                <igc-category-chart
                  name="chart"
                  class="chart-canvas"
                  .dataSource="${ dataService.getCostsPerMeterData(ctx.implicit.vehicleId, this.periods[ctx.implicit.vehicleId]?.costPerMeterPeriod || Period.YTD)}"
                  chart-type="Area"
                  is-horizontal-zoom-enabled="false"
                  is-vertical-zoom-enabled="false"
                  computed-plotArea-margin-mode="Series"
                  x-axis-label-text-color="#ededed"
                  y-axis-label-text-color="#ededed"
                  y-axis-interval="20"
                  y-axis-minimum-value="0"
                  y-axis-maximum-value="80"
                  y-axis-label-right-margin="15"
                  area-fill-opacity="100"
                  >
                </igc-category-chart>
              </div>
            </div>

            <div class="chart-container column-chart-container">
              <div class="chart-header">
                <span class="chart-title">Fuel Costs per Month</span>
                <igc-select #select class="chart-select" .value="${this.periods[ctx.implicit.vehicleId]?.fuelCostPeriod || Period.YTD}"
                @igcChange="${(event: any) => this.onPeriodChange(event, 'fuelCosts', ctx.implicit.vehicleId)}">
                  <igc-select-header>Period</igc-select-header>
                  <igc-select-item value="${Period.YTD}">YTD</igc-select-item>
                  <igc-select-item value="${Period.ThreeMonths}">Last 3 Months</igc-select-item>
                  <igc-select-item value="${Period.SixMonths}">Last 6 Months</igc-select-item>
                  <igc-select-item value="${Period.TwelveMonths}">Last 12 Months</igc-select-item>
                </igc-select>
              </div>
              <div class="chart-content">
                <igc-category-chart
                  name="chart"
                  class="column-chart"
                  #chart
                  chart-type="Column"
                  .dataSource="${ dataService.getFuelCostsData(ctx.implicit.vehicleId, this.periods[ctx.implicit.vehicleId]?.fuelCostPeriod || Period.YTD)}"
                  y-axis-title="Costs in USD"
                  is-horizontal-zoom-enabled="false"
                  is-vertical-zoom-enabled="false"
                  x-axis-label-text-color="#ededed"
                  y-axis-label-text-color="#ededed"
                  y-axis-title-text-color="#ededed"
                  y-axis-minimum-value="0"
                  x-axis-minimum-gap-size="30"
                  y-axis-label-right-margin="7.5"
                  >
                </igc-category-chart>
              </div>
            </div>
          </div>
        </igc-tab-panel>


        <igc-tab-panel id="utilization">
          <div class="content-wrapper">
            <div class="chart-content utilization-chart-container">
              <h3>Utilization per Month</h3>
              <igc-legend
                name="Legend"
                id="legend"
                orientation="Horizontal">
              </igc-legend>

              <igc-category-chart
                name="chart"
                class="column-chart-two-series"
                id="chart"
                chart-type="Column"
                .legend="${this.legend}"
                .dataSource="${ dataService.getUtilizationData(ctx.implicit.vehicleId)}"
                y-axis-title="Miles"
                is-horizontal-zoom-enabled="false"
                is-vertical-zoom-enabled="false"
                x-axis-label-text-color="#ededed"
                y-axis-label-text-color="#ededed"
                y-axis-title-text-color="#ededed"
                y-axis-minimum-value="0"
                y-axis-interval="200"
                x-axis-minimum-gap-size="20"
                y-axis-label-right-margin="7.5"
                >
              </igc-category-chart>
            </div>
          </div>
        </igc-tab-panel>
      </igc-tabs>
    `
  }

  private makeCellTemplate = (ctx: IgcCellTemplateContext) => {
    return html`
      <igc-avatar class="logo-avatar" shape="rounded" src="cars/logos/${ctx.implicit}.png"></igc-avatar>
      <span class="status-value">${ctx.implicit}</span>
    `
  }

  private statusCellTemplate = (ctx: IgcCellTemplateContext) => {    
    return html`
      <igc-badge variant="${this.getStatusType(ctx.implicit)}">
        <igc-icon class="icon-style" collection="imx-icons" name="${this.getStatusIcon(ctx.implicit)}"></igc-icon>
      </igc-badge>
      <span class="status-value">${ctx.implicit}</span>
    `
  }

  private locationCellTemplate = (ctx: IgcCellTemplateContext) => {
    return html`
      <a class="link-style" #coordinates href="#" (click)="$event.preventDefault();">${ctx.implicit}</a>
    `
  }

  private getStatusType(status: string): string {
    const types: Record<string, string> = {
      "Available": "success",
      "In Maintenance": "danger",
      "Active": "info",
    };
    return types[status] || "default";
  }

  private getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      "Available": "check",
      "In Maintenance": "wrench",
      "Active": "delivery"
    };
    return icons[status] || "info";
  }

  private getPathToCarImage(vehicleId: string): string[] {
    const carEntry = CAR_PHOTO_MANIFEST.find(car => car.id === vehicleId);

    if (!carEntry) {
      console.warn(`No vehicle found with ID: ${vehicleId}`);
      return [];
    }

    const folderName = carEntry.folder;

    const carPhotoNames = (CAR_IMAGES as Record<string, string[]>)[folderName];

    const carPathsToPhotos = carPhotoNames.map(photo => `cars/photos/${folderName}/${photo}`);

    return carPathsToPhotos;
  }

  private getValueByPath(obj: any, path: string) {
    return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : 'N/A', obj);
  }

  private onPeriodChange(event: any, chart: string, vehicleId: string): void {
    if (!this.periods[vehicleId]) {
      this.periods[vehicleId] = {
        costPerTypePeriod: Period.YTD,
        costPerMeterPeriod: Period.YTD,
        fuelCostPeriod: Period.YTD
      };
    }

    if (chart === ChartType.CostPerType) {
      this.periods[vehicleId].costPerTypePeriod = event.detail.value;
    } else if (chart === ChartType.CostPerMeter) {
      this.periods[vehicleId].costPerMeterPeriod = event.detail.value;
    } else if (chart === ChartType.FuelCosts) {
      this.periods[vehicleId].fuelCostPeriod = event.detail.value;
    }

    event.target.emitClosed()
  }

  render() {
    return html`
    <link rel="stylesheet" href="node_modules/igniteui-webcomponents-grids/grids/themes/dark/material.css" />
    <igc-grid class="main-grid" id="main-grid" .data="${ this.vehiclesData }" height="100%" width="100%">
      <igc-grid-toolbar>
        <igc-grid-toolbar-title>Fleet Management</igc-grid-toolbar-title>
        <igc-button
          variant="flat"
          ?hidden=${!this.hasSorting} 
          @click=${this.clearSorting}>
          <igc-icon name="clear" collection="material"></igc-icon>
          Clear Sort
        </igc-button>
        <igc-grid-toolbar-actions>
                <igc-grid-toolbar-hiding></igc-grid-toolbar-hiding>
                <igc-grid-toolbar-pinning></igc-grid-toolbar-pinning>
                <igc-grid-toolbar-exporter></igc-grid-toolbar-exporter>
                <igc-grid-toolbar-advanced-filtering></igc-grid-toolbar-advanced-filtering>
          </igc-grid-toolbar-actions>
      </igc-grid-toolbar>
      <igc-column field="vehicleId" header="Vehicle ID" sortable="true" width="9%"></igc-column>
      <igc-column field="licensePlate" header="License Plate" sortable="true" width="9%"></igc-column>
      <igc-column id="make-column" field="make" header="Make" sortable="true" width="11%"></igc-column>
      <igc-column field="model" header="Model" sortable="true" width="8%"></igc-column>
      <igc-column field="type" header="Type" sortable="true" width="10%"></igc-column>
      <igc-column field="vin" header="VIN" width="14%"></igc-column>
      <igc-column id="status-column" field="status" header="Status" sortable="true" width="14%"></igc-column>
      <igc-column field="locationCity" header="Location (City)" sortable="true" width="11%"></igc-column>
      <igc-column id="location-column" field="locationGps" header="Location (GPS)" width="14%"></igc-column>
    </igc-grid>
    `;
  }


  static styles = css`
    @use 'igniteui-angular/theming" as *;

    /* --------------------------------------------- */
    /* GLOBAL STYLES */
    /* --------------------------------------------- */

    :root {
      --primary-text-color: #f5f5f5;
    }

    :host {
      display: block;
      height: 100%;
      width: 100%;
    }

    igc-tabs {
      flex: 1;
      width: 100%;
    }

    igc-divider {
      color: var(--ig-gray-200);
      opacity: 24%;
    }

    /* Global Grid Styles */
    .main-grid {
      --ig-size: var(--ig-size-small)
    }


    /* --------------------------------------------- */
    /* COMMON ELEMENT STYLES */
    /* --------------------------------------------- */

    .icon-style {
      color: #000000;
    }

    .link-style {
      color: var(--primary-text-color);
    }

    .grid-container {
      padding: 16px;
    }

    .chart-canvas {
      width: 100%;
      height: 100%;
    }

    .pie-chart-canvas {
      width: 90%;
      height: 90%;
    }

    /* --------------------------------------------- */
    /* CHART STYLES */
    /* --------------------------------------------- */

    .dashboard {
      display: grid;
      grid-template-columns: 1fr 2.5fr;
      grid-template-rows: 1fr 1fr;
      padding: 16px;
      height: 100%;
    }

    .chart-container {
      display: grid;
      grid-template-rows: 40px auto;
      height: 100%;
      padding: 10px;
      padding-top: 20px;
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
    }

    .chart-select {
      width: 40%;
    }

    .chart-content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 15px;
      border-radius: 6px;
      border: 1px solid #8A8A8A;
    }

    .content-wrapper {
      padding: 16px;
    }

    /*Specfic Chart Types*/
    .pie-chart-container {
      grid-column: 1;
      grid-row: 1;
    }

    .area-chart-container {
      grid-column: 1;
      grid-row: 2;
    }

    .column-chart-container {
      grid-column: 2;
      grid-row: 1 / span 2;
    }

    .column-chart {
      width: 95%;
      height: 420px;
    }

    .column-chart-two-series {
      align-self: center;
      width: 95%;
      height: 390px;
    }

    .utilization-chart-container {
      flex-direction: column;
      align-items: start;
    }

    /* --------------------------------------------- */
    /* DETAILS & TABLE STYLES */
    /* --------------------------------------------- */

    .details-container {
      display: flex;
      align-items: flex-start;
      padding: 16px;
      width: 100%;
    }

    .details-table {
      display: flex;
      flex-direction: row;
      width: calc(100% * (2 / 3));
      height: auto;
      justify-content: space-around;
    }

    .detail-block-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 50%;
    }

    .detail-category-container,
    .detail-content-container {
      width: 50%;
    }

    .detail-category-container {
      padding-left: 25px;
    }

    .detail-item {
      padding: 5px 0;
      font-size: 0.8125rem;
    }

    .detail-category {
      font-weight: bold;
    }

    /* --------------------------------------------- */
    /* OVERLAYS & CARDS */
    /* --------------------------------------------- */

    .overlay {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      justify-items: center;
      align-content: center;
      width: 360px;
      height: 396px;
      box-shadow: var(--ig-elevation-24);
    }

    .overlay-driver {
      width: 327px;
      height: 360px;
      padding: 0px;
      margin: 0px;
    }

    /*Overlay Sections*/
    .overlay-text {
      font-size: 14px;
    }

    .overlay-location-header,
    .overlay-driver-header {
      height: 38%;
      width: 100%;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      align-content: space-around;
    }

    .overlay-location-content,
    .overlay-driver-content {
      height: 48%;
      width: 100%;
      padding: 0px;
      justify-content: center;
    }

    .overlay-location-actions,
    .overlay-driver-actions {
      height: 13%;
      width: 100%;
      justify-content: end;
      margin: 8px;
    }

    .overlay-location-actions {
      margin: 0px;
    }

    /* --------------------------------------------- */
    /* DRIVER STYLES */
    /* --------------------------------------------- */

    .driver-block-container {
      display: flex;
      flex-direction: row;
      justify-self: center;
      width: 85%;
    }

    .driver-category-container,
    .driver-detail-container {
      width: 50%;
    }

    .logo-avatar {
      --size: 22px;
      border-radius: 0.25rem;

    }

    /* --------------------------------------------- */
    /* MISC STYLES */
    /* --------------------------------------------- */

    .image-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .status-value {
      padding-left: 8px;
      color: var(--primary-text-color);
    }

    .carousel-container {
      width: 420px;
      height: 240px;
    }

    h3 {
      margin: 0 0;
    }

  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "app-fleet-management": FleetManagementGrid;
  }
}
