import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { erpDataService } from "./services/erp-data.service";
import { DROPBOX, DELIVERY, BILL_PAID, CHECK } from "./assets/icons/icons";
import { configureTheme, defineComponents, IgcAvatarComponent, IgcBadgeComponent, IgcButtonComponent, IgcDialogComponent, IgcIconComponent, IgcInputComponent, IgcLinearProgressComponent, IgcRatingComponent, registerIconFromText } from "igniteui-webcomponents";
import { FilteringLogic, GridSelectionMode, IgcCellTemplateContext, IgcColumnComponent, IgcExporterEventArgs, IgcFilteringExpressionsTree, IgcGridComponent, IgcGridToolbarTemplateContext, IgcRowIslandComponent, IgcStringFilteringOperand, SortingDirection } from "igniteui-webcomponents-grids/grids";

import "igniteui-webcomponents-grids/grids/combined.js";
import { OrderStatus } from './models/OrderStatus';
import { ModuleManager } from "igniteui-webcomponents-core";
import { IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule,
  IgcDataChartComponent, IgcLegendComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, 
  IgcCategoryXAxisModule,
  IgcNumericYAxisModule,
  IgcLineSeriesModule,
  IgcLineSeriesComponent,
  IgcColumnSeriesModule,
  IgcDataChartVisualDataModule} from 'igniteui-webcomponents-charts';

ModuleManager.register(
  IgcDataChartCoreModule,
  IgcCategoryXAxisModule,
  IgcNumericYAxisModule,
  IgcColumnSeriesModule,
  IgcDataChartVisualDataModule
);

import './chart';
// - igc-data-chart
// - igc-category-x-axis
// - igc-numeric-y-axis
// - igc-line-series

defineComponents(
  IgcAvatarComponent, 
  IgcIconComponent, 
  IgcLinearProgressComponent, 
  IgcInputComponent,
  IgcRatingComponent,
  IgcBadgeComponent,
  IgcDialogComponent,
  IgcButtonComponent
);
configureTheme("material");
@customElement('app-erp-hgrid')
export default class ErpHierarchicalGrid extends LitElement {

  private chart!: IgcDataChartComponent;
  private xAxis!: IgcNumericXAxisComponent;
  private yAxis!: IgcNumericYAxisComponent;
  private xAxisCrossLabel!: HTMLLabelElement;
  private yAxisCrossLabel!: HTMLLabelElement;
  
  private productImageClasses = {
    'product-img': true
  };

  @query("igc-hierarchical-grid")
  private hierarchicalGrid!: IgcGridComponent;

  @query("igc-row-island")
  private rowisland!: IgcGridComponent;

  @query("igc-dialog")
  private imageDialog!: IgcDialogComponent;

  @query('#imageCol')
  private imageColumn1!: IgcColumnComponent

  @state()
  private erpData = [];
  private selectionMode: GridSelectionMode = 'multiple';

  @state()
  private isLoading = true;

  public orderStatus = OrderStatus;

  // private excelExporter = new IgcExcelExporterService();
  
  constructor() {
    super();
 
    registerIconFromText("dropbox", DROPBOX, "material");
    registerIconFromText("delivery", DELIVERY, "material");
    registerIconFromText("bill-paid", BILL_PAID, "material");
    registerIconFromText("check", CHECK, "material");
    erpDataService.getErpData().then((data) => {
      this.erpData = data;
      this.isLoading = false;

      // this.chart = document.getElementById('chart') as IgcDataChartComponent;

      // this.xAxis = document.getElementById("xAxis") as IgcNumericXAxisComponent;
      // this.yAxis = document.getElementById("yAxis") as IgcNumericYAxisComponent;
  
      // // this.chart.dataSource = data;

      // let soldUnits = document.getElementById("unitsSold") as IgcColumnComponent;
      // unitsInStock.formatter = this.formatCurrency;
    });

    // var rowIsland1 = document.getElementById('rowIsland') as IgcRowIslandComponent;
    // rowIsland1.toolbarTemplate = this.rowIslandToolbarTemplate;
  }

  firstUpdated() {
    // Default sortings
    this.hierarchicalGrid.sortingExpressions = [
      {
          dir: SortingDirection.Asc, fieldName: 'sku',
          ignoreCase: true
      }
    ];
    this.rowisland.sortingExpressions = [
      {
          dir: SortingDirection.Desc, fieldName: 'delivery.dateOrdered',
          ignoreCase: true
      }
    ];

    // const imageColumn = document.getElementById('imageCol') as IgcColumnComponent;
 

    // this.chart = document.getElementById('chart') as IgcDataChartComponent;

    // this.xAxis = document.getElementById("xAxis") as IgcNumericXAxisComponent;
    // this.yAxis = document.getElementById("yAxis") as IgcNumericYAxisComponent;

    // // this.chart.dataSource = data;

    // let soldUnits = document.getElementById("unitsSold") as IgcColumnComponent;
    
    // this.requestUpdate();
  }

  public rowIslandToolbarTemplate = () => {
    return html`   
      <igc-grid-toolbar>
        <igc-grid-toolbar-title>Sales data for the last month</igc-grid-toolbar-title>
      </igc-grid-toolbar>`;
  }

  private imageTemplate = (ctx: IgcCellTemplateContext) => {
    const imageUrl = ctx.cell.value;
    const productName = ctx.cell.row.data.productName;
  
    return html`
      <div>
        <img 
          id="imageElement"
          src="${imageUrl}" 
          alt="Product" 
          style="width: 40px; height: 40px"
          @mouseenter="${(e: any) => this.onImageHover(e)}"
          @mouseleave="${() => this.onImageLeave()}"/>

        <igc-dialog >
          <h5 slot="title">TITLE 1</h5>
          <img src="${imageUrl}" alt="Product View"/>
        </igc-dialog>
      </div>
    `;
  };

private onImageHover(event: MouseEvent) {

  const targetEl = event.target as HTMLElement;

  if (this.imageDialog) {
    this.imageDialog.show();
  }
}

private onImageLeave() {
  if (this.imageDialog) {
    this.imageDialog.hide();
  }
}

  private ratingTemplate = (ctx: IgcCellTemplateContext) => {
    return html`
      <div class="rating-container">
        <igc-rating value="${ctx.cell.value}" readonly="${true}" min="0" max="5"></igc-rating>
      </div>
    `;
  };

  private statusTemplate = (ctx: IgcCellTemplateContext) => {
    const cellValue = ctx.cell.value;

    return html`
      <div class="status-cell">
          <span>
          <igc-badge
            variant="primary"
            shape="rounded"
            ?hidden="${cellValue !== this.orderStatus.PACKED}"
          >
            <igc-icon name="dropbox" collection="material" class="custom-icon"></igc-icon>
          </igc-badge>

          <igc-badge
            variant="warning"
            shape="rounded"
            ?hidden="${cellValue !== this.orderStatus.IN_TRANSIT}"
          >
            <igc-icon name="delivery" collection="material" class="custom-icon"></igc-icon>
          </igc-badge>

          <igc-badge
            variant="error"
            shape="rounded"
            ?hidden="${cellValue !== this.orderStatus.CUSTOMS}"
          >
            <igc-icon name="bill-paid" collection="material" class="custom-icon"></igc-icon>
          </igc-badge>

          <igc-badge
            variant="success"
            shape="rounded"
            ?hidden="${cellValue !== this.orderStatus.DELIVERED}"
          >
            <igc-icon name="check" collection="material" class="custom-icon"></igc-icon>
          </igc-badge>

          </span>
          <span>${cellValue}</span>
      </div>
    `;
  };

  private countryTemplate = (ctx: IgcCellTemplateContext) => {
    const cellValue = ctx.cell.value;
    const flagPath = `country-flags/${cellValue}.svg`;
    // [src]="'country-flags/' + cell.row.data.orderInformation.country + '.svg'"
    return html`
      <div class="country-cell">
          <span class="cup">
              <img .src="${flagPath}"/>
          </span>
          <span>${cellValue}</span>
      </div>
    `;
  };

  private salesTrendsChartTemplate = (ctx: IgcCellTemplateContext) => {
    const trendData = ctx.cell.value;
    

    if (!trendData || trendData.length === 0) {
      return html`<span>No data</span>`;
    }

    return html`
      <app-grid-chart .trendData=${trendData}></app-grid-chart>
    `;
  };


  // private tooltipTemplate = (ctx: IgcCellTemplateContext) => {
  //   return html`
  //     <igc-icon
  //       id="tooltipTarget"
  //       igcTooltipTarget="tooltipRef"
  //       draggable=${false}
  //       showDelay="0"
  //       hideDelay="0"
  //       @click=${this.toggleExpand}
  //     >
  //       ${this.column.expanded ? 'expand_more' : 'chevron_right'}
  //     </igc-icon>

  //     <div id="tooltipRef" igcTooltip>
  //       <span style="width: 200px">${this.getTooltipText(this.column.expanded)}</span>
  //     </div>
  //   `;
  // };

  public exportStarted(args: any) {
    args.detail.exporter.columnExporting.subscribe((columnArgs: any) => {
      // Don't export Performance column
      columnArgs.cancel = columnArgs.field === 'salesTrendData';
    });
  }

  // FORMATTERS
  public formatNumberAsIs(value: number): number {
    // Bypassing the default formatting of larger numbers
    // Example for 4-digit numbers: 1,234 => 1234
    return value;
  }

  public formatDate(value: string): string {
    return value || 'N/A';
  }

  public formatAddress(value: any): string {
    return `${value.streetName} ${value.streetNumber}`;
  }

  public formatFullAddress(value: any): string {
    return `${value.streetNumber} ${value.streetName}, ${value.zipCode} ${value.city}, ${value.country}`;
  }
  
  render() {
    return html`
        <link rel="stylesheet" href="node_modules/igniteui-webcomponents-grids/grids/themes/light/material.css" />

        <div class="wrappper">
        <igc-hierarchical-grid
          id="hierarchicalGrid"
          .data="${this.erpData}" 
          primary-key="sku" 
          row-selection="multiple"
          width="100%"
          height="100%"
          row-height="32px"
          allow-filtering="${true}"
          allow-advanced-filtering="${true}"
          moving="${true}"
          row-selection="${this.selectionMode}">
  
          <igc-grid-toolbar>
            <igc-grid-toolbar-title>Inventory</igc-grid-toolbar-title>
            <igc-grid-toolbar-actions>
              <igc-grid-toolbar-hiding></igc-grid-toolbar-hiding>
              <igc-grid-toolbar-pinning></igc-grid-toolbar-pinning>
              <igc-grid-toolbar-exporter export-excel="${true}" export-csv="${true}" @exportStarted="${this.exportStarted}"></igc-grid-toolbar-exporter>
              <igc-grid-toolbar-advanced-filtering></igc-grid-toolbar-advanced-filtering>
            </igc-grid-toolbar-actions>
          </igc-grid-toolbar>

          <igc-column field="sku" header="SKU" ?sortable="${true}" data-type="string"></igc-column>
          <igc-column
              id="imageCol"
              field="imageUrl"
              header="Image"
              width="5%"
              filterable="${false}"
              data-type="image"
              .cellClasses="${this.productImageClasses}"
              .bodyTemplate="${this.imageTemplate}">
          </igc-column>
          <igc-column field="productName" header="Product Name" data-type="string" ?sortable="${true}" width="12%"></igc-column>
          <igc-column field="category" header="Category" data-type="string" ?sortable="${true}"></igc-column>
          
          <igc-column
            field="rating"
            header="Rating"
            min-width="165px"
            data-type="number"
            ?sortable="${true}"
            .bodyTemplate="${this.ratingTemplate}">
          </igc-column>

          <igc-column id="unitsSold" field="unitsSold" header="Sold Units Last Month" data-type="number" width="10%" ?sortable="${true}"></igc-column>
          <igc-column 
            field="salesTrendData" 
            header="Mothly Sales Trends" 
            filterable="${false}" 
            width="15%"
            .bodyTemplate="${this.salesTrendsChartTemplate}">
          </igc-column>
          <igc-column field="grossPrice" header="Gross Price" data-type="currency" width="7%" ?sortable="${true}"></igc-column>
          <igc-column field="netPrice" header="Net Price" data-type="currency" width="7%" ?sortable="${true}"></igc-column>
          <igc-column field="totalNetProfit" header="Net Profit" data-type="currency" width="7%" ?sortable="${true}"></igc-column>


          <!-- INNER GRID -->
          <igc-row-island
            id="rowIsland"
            key="orders"
            allow-filtering="${true}"
            row-selection="${this.selectionMode}"
            .toolbarTemplate=${this.rowIslandToolbarTemplate}>

            <igc-column
                field="orderId"
                header="Order ID"
                data-type="number"
                width="7%"
                .formatter="${this.formatNumberAsIs}">
            </igc-column>

            <igc-column
                field="status"
                header="Status"
                width="11%"
                .bodyTemplate="${this.statusTemplate}">
            </igc-column>

            <igc-column-group header="Delivery" ?collapsible="${true}">
                <!-- <ng-template igcCollapsibleIndicator let-column="column">
                    <igc-icon
                        #target="tooltipTarget"
                        [igcTooltipTarget]="tooltipRef"
                        [attr.draggable]=${false}
                        [showDelay]="0"
                        [hideDelay]="0">
                            {{column.expanded ? 'expand_more' : 'chevron_right'}}
                    </igc-icon>
                    <div #tooltipRef="tooltip" igcTooltip>
                        <span style="width: 200px"> {{getTooltipText(column.expanded)}}</span>
                    </div>
                </ng-template> -->

                <!-- Show this column when collapsed -->
                <igc-column
                    field="delivery.dateOrdered"
                    header="Date Ordered"
                    data-type="date"
                    width="12%"
                    ?sortable="${true}"
                    ?resizable="${true}"
                    visible-when-collapsed="${true}"
                    .formatter="${this.formatDate}">
                </igc-column>

                <!-- Show next 3 columns when expanded -->
                <igc-column
                    field="delivery.dateOrdered"
                    header="Date Ordered"
                    data-type="date"
                    width="12%"
                    ?sortable=${true}
                    ?resizable=${true}
                    visible-when-collapsed=${false}
                    .formatter="${this.formatDate}">
                </igc-column>
                <igc-column
                    field="delivery.dateShipped"
                    header="Date Shipped"
                    data-type="date"
                    width="12%"
                    ?sortable=${true}
                    ?resizable=${true}
                    visible-when-collapsed=${false}
                    .formatter="${this.formatDate}">
                </igc-column>
                <igc-column
                    field="delivery.dateDelivered"
                    header="Date Delivered"
                    data-type="date"
                    width="12%"
                    ?sortable=${true}
                    ?resizable=${true}
                    visible-when-collapsed=${false}
                    .formatter="${this.formatDate}">
                </igc-column>
            </igc-column-group>


            <igc-column-group header="Order Information" ?collapsible="${true}">
                <!-- <ng-template igcCollapsibleIndicator let-column="column">
                    <igc-icon
                        #target="tooltipTarget"
                        [igcTooltipTarget]="tooltipRef"
                        [attr.draggable]="false"
                        [showDelay]="0"
                        [hideDelay]="0">
                            {{column.expanded ? 'expand_more' : 'chevron_right'}}
                    </igc-icon>
                    <div #tooltipRef="tooltip" igcTooltip>
                        <span style="width: 200px"> {{getTooltipText(column.expanded)}}</span>
                    </div>
                </ng-template> -->

                <!-- Show next 4 columns when expanded -->
                <igc-column
                    field="orderInformation.country"
                    header="Country"
                    width="12%"
                    ?sortable=${true}
                    visible-when-collapsed=${false}
                    .bodyTemplate=${this.countryTemplate}>
                </igc-column>

                <igc-column
                    field="orderInformation.city"
                    header="City"
                    data-type="string"
                    width="13%"
                    ?sortable=${true}
                    ?resizable=${true}
                    visible-when-collapsed=${false}>
                </igc-column>
                <igc-column
                    field="orderInformation.zipCode"
                    header="Zip Code"
                    data-type="number"
                    width="9%"
                    ?sortable=${true}
                    ?resizable=${true}
                    visible-when-collapsed=${false}
                    .formatter="${this.formatNumberAsIs}">
                </igc-column>
                <igc-column
                    field="orderInformation"
                    header="Address"
                    data-type="string"
                    ?sortable=${true}
                    ?resizable=${true}
                    visible-when-collapsed=${false}
                    .formatter="${this.formatAddress}">
                </igc-column>

                <!-- Show this column when collapsed -->
                <igc-column
                    field="orderInformation"
                    header="Address"
                    dataType="string"
                    ?sortable=${true}
                    ?resizable=${true}
                    visible-when-collapsed=${true}
                    .formatter="${this.formatFullAddress}">
                </igc-column>

            </igc-column-group>

          </igc-row-island>

          
        </igc-hierarchical-grid>

        <div class="container sample center">
    </div>
      </div>
    `;
  }

  static styles = css`
  @use 'igniteui-angular/theming" as *;
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      height: 1800px;
      width: 100%;
    }

    .product-img {
      display: flex;
      justify-content: center;

      img {
        height: 22px;
        border-radius: 4px;
      }
    }

    #hierarchicalGrid {
      --ig-size: var(--ig-size-medium);
      height: 100%;
      width: 100%;

      igc-badge[variant="primary"]::part(base) {
        background-color: var(--ig-primary-50);
      }

      igc-badge[variant="warning"]::part(base) {
        background-color: var(--ig-warn-100);
      }

      igc-badge[variant="error"]::part(base) {
        background-color: var(--ig-error-50);
      }

      igc-badge[variant="success"]::part(base) {
        background-color: var(--ig-success-100);
      }
    }

    .custom-icon {
      --size: 12px;
      color:  black;
    }


    .country-cell {
      display: flex;
      align-items: center;
      width: fit-content;
      padding: 0px 4px;
      gap: 8px;

      img {
        font-size: 16px;
        width: 18px;
        height: 14px;
        margin-top: 2px;
        box-shadow: var(--ig-elevation-1);
      }
    }
      
    .status-cell {
      display: flex;
      align-items: center;
      width: fit-content;
      padding: 0px 4px;
      gap: 8px;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `
}
