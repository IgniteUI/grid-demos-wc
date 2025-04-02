import { LitElement, css, html } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { computePosition, offset, shift, flip } from '@floating-ui/dom';
import { DROPBOX, DELIVERY, BILL_PAID, CHECK } from "../assets/icons/icons";
import "igniteui-webcomponents-grids/grids/combined.js";
import { 
  configureTheme, 
  defineComponents, 
  IgcAvatarComponent, 
  IgcBadgeComponent, 
  IgcButtonComponent, 
  IgcDialogComponent, 
  IgcIconComponent, 
  IgcInputComponent, 
  IgcLinearProgressComponent, 
  IgcRatingComponent, 
  registerIconFromText
} from "igniteui-webcomponents";
import { 
  GridSelectionMode, 
  IgcCellTemplateContext, 
  IgcGridComponent, 
  SortingDirection 
} from "igniteui-webcomponents-grids/grids";
import { 
  IgcDataChartCoreModule,
  IgcCategoryXAxisModule,
  IgcNumericYAxisModule,
  IgcColumnSeriesModule,
  IgcDataChartVisualDataModule
} from 'igniteui-webcomponents-charts';
import { ModuleManager } from "igniteui-webcomponents-core";
import './sales-trends-chart';
import { FullAddressFilteringOperand } from '../custom-filtering-operands';
import { TemplateDataItemExtended } from '../models/TemplateDataItem';
import { OrderStatus } from '../models/OrderStatus';
import { erpDataService } from "../services/erp-data.service";
import { DataPoint } from '../models/DataPoint';
import { OrderDetails } from '../models/OrderDetails';

ModuleManager.register(
  IgcDataChartCoreModule,
  IgcCategoryXAxisModule,
  IgcNumericYAxisModule,
  IgcColumnSeriesModule,
  IgcDataChartVisualDataModule
);

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

  @query("igc-hierarchical-grid")
  private hierarchicalGrid!: IgcGridComponent;

  @query("igc-row-island")
  private rowisland!: IgcGridComponent;

  @query('#product-image-tooltip')
  private productImageTooltip!: HTMLElement;

  @state()
  private erpData: TemplateDataItemExtended[] = [];

  @state()
  private isLoading = true;

  private selectionMode: GridSelectionMode = 'multiple';
  private orderStatus = OrderStatus;

  // Image tooltip for each product fields
  private hoveredImageUrl: string = '';
  private hoveredImageProductName: string = '';
  
  // Custom filtering for templated Address column
  public fullAddressFilteringOperand = FullAddressFilteringOperand.instance();
  public shortAddressFilteringOperand = new FullAddressFilteringOperand(true);
  
  constructor() {
    super();
    
    // Icons
    registerIconFromText("dropbox", DROPBOX, "material");
    registerIconFromText("delivery", DELIVERY, "material");
    registerIconFromText("bill-paid", BILL_PAID, "material");
    registerIconFromText("check", CHECK, "material");

    // Data
    erpDataService.getErpData().then((data) => {
      this.erpData = data;
      this.isLoading = false;
    });
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
  }

  private exportStarted = (args: any) => {
    args.detail.exporter.columnExporting.subscribe((columnArgs: any) => {
      // Don't export Performance column
      columnArgs.cancel = columnArgs.field === 'salesTrendData';
    });
  }

  // TEMPLATES

  /* Grid */
  private imageTemplate = (ctx: IgcCellTemplateContext) => {
    const imageUrl: string = ctx.cell.value;
  
    return html`
      <div id="image-container">
        <img 
          id="imageElement"
          src="${imageUrl}" 
          alt="Product" 
          style="width: 22px; height: 22px"
          @mouseenter="${(event: MouseEvent) => this.showTooltip(event, ctx)}"
          @mouseleave="${this.hideTooltip}"/>
      </div>
    `;
  };

  private ratingTemplate = (ctx: IgcCellTemplateContext) => {
    return html`
      <div class="rating-container">
        <igc-rating value="${ctx.cell.value}" ?readonly="${true}" min="0" max="5"></igc-rating>
      </div>
    `;
  };

  private salesTrendsChartTemplate = (ctx: IgcCellTemplateContext) => {
    const trendData: DataPoint[] = ctx.cell.value;
    
    if (!trendData || trendData.length === 0) {
      return html`<span>No data</span>`;
    }

    return html`
      <app-sales-trends-chart .trendData=${trendData}></app-sales-trends-chart>
    `;
  };

  /* RowIsland */
  private rowIslandToolbarTemplate = () => {
    return html`   
      <igc-grid-toolbar>
        <igc-grid-toolbar-title>Sales data for the last month</igc-grid-toolbar-title>
      </igc-grid-toolbar>`;
  }

  private statusTemplate = (ctx: IgcCellTemplateContext) => {
    const cellValue: string = ctx.cell.value;

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
            variant="danger"
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
    const cellValue: string = ctx.cell.value;
    const flagPath: string = `country-flags/${cellValue}.svg`;

    return html`
      <div class="country-cell">
          <span class="cup">
              <img .src="${flagPath}"/>
          </span>
          <span>${cellValue}</span>
      </div>
    `;
  };

  // FORMATTERS
  private formatNumberAsIs = (value: number): number => {
    // Bypassing the default formatting of larger numbers
    // Example for 4-digit numbers: 1,234 => 1234
    return value;
  }

  private formatDate = (value: string): string => {
    return value || 'N/A';
  }

  private formatAddress = (value: OrderDetails): string =>  {
    return `${value.streetName} ${value.streetNumber}`;
  }

  private formatFullAddress = (value: OrderDetails): string => {
    return `${value.streetNumber} ${value.streetName}, ${value.zipCode} ${value.city}, ${value.country}`;
  }
  
  // PRODUCT IMAGE COLUMN OVERLAYS
  private showTooltip = (event: MouseEvent, context: IgcCellTemplateContext): void => {
    const targetEl: HTMLElement = event.target as HTMLElement;
    const imageUrl: string = context.implicit;

    // Set current hovered image properties
    this.hoveredImageUrl = imageUrl;
    const productName: string = context.cell.row?.cells?.find((c: any) => c.column.field === 'productName')?.value;
    this.hoveredImageProductName = productName;

    // Add floating-ui setups and styles
    this.setupImageDialog(targetEl, this.productImageTooltip);
    this.requestUpdate();
  }

  private setupImageDialog = (targetElement: HTMLElement, tooltip: HTMLElement): void => {
    computePosition(targetElement, tooltip, {
      placement: 'right-start',
      middleware: [
        offset(6),
        flip(),
        shift({padding: 5}),
      ],
    }).then(({x, y}) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });

    tooltip.style.display = 'block';
    tooltip.style.zIndex = '9999';
  }

  private hideTooltip = (): void => {
    this.productImageTooltip.style.display = 'none';
  }

  render() {
    return html`
      <link rel="stylesheet" href="node_modules/igniteui-webcomponents-grids/grids/themes/light/material.css" />

      <div class="wrappper">
        <igc-hierarchical-grid
          id="hierarchicalGrid"
          primary-key="sku" 
          row-selection="multiple"
          width="100%"
          height="1000px"
          row-height="32px"
          allow-filtering="${true}"
          allow-advanced-filtering="${true}"
          moving="${true}"
          row-selection="${this.selectionMode}"
          .data="${this.erpData}" >
  
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
            data-type="image"
            filterable="${false}"
            .cellClasses="${{'product-img': true}}"
            .bodyTemplate="${this.imageTemplate}">
          </igc-column>

          <igc-column 
            field="productName"
            header="Product Name"
            width="12%"
            data-type="string" 
            ?sortable="${true}">
          </igc-column>

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
            header="Monthly Sales Trends"
            width="15%" 
            filterable="${false}" 
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
                    .formatter="${this.formatAddress}"
                    .filters="${this.shortAddressFilteringOperand}">
                </igc-column>

                <!-- Show this column when collapsed -->
                <igc-column
                    field="orderInformation"
                    header="Address"
                    dataType="string"
                    ?sortable=${true}
                    ?resizable=${true}
                    visible-when-collapsed=${true}
                    .formatter="${this.formatFullAddress}"
                    .filters="${this.fullAddressFilteringOperand}">
                </igc-column>

            </igc-column-group>

          </igc-row-island>

          
        </igc-hierarchical-grid>

        <!-- Overay shown when hovering on product image -->
        <div id="product-image-tooltip" role="tooltip">
          <div class="dialog-header"> ${this.hoveredImageProductName} </div>
          <div class="dialog-body">
            <img src="${this.hoveredImageUrl}" alt="${this.hoveredImageProductName}"/>
          </div>
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

      igc-badge[variant="danger"]::part(base) {
        background-color: var(--ig-error-50);
      }

      igc-badge[variant="success"]::part(base) {
        background-color: var(--ig-success-100);
      }
    }

    .product-img {
      display: flex;
      justify-content: center;

      img {
        border: 1px solid pink;
        height: 22px;
        border-radius: 4px;
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

    #product-image-tooltip {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      background: white;
      font-weight: bold;
      padding: 5px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      font-size: 90%;
      animation: fadeIn 0.4s ease-in-out forwards;

      .dialog-header {
        padding: 16px;
        font-size: 18px;
        font-weight: bold;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      .dialog-body {
        padding: 16px;
        font-size: 14px;
        color: #555;
        overflow-y: auto;

        img {
          width: 312px;
          height: 312px;
        }
      }
    }

    @keyframes fadeIn {
      0% { opacity: 0; transform: scale(0.9); }
      100% { opacity: 1; transform: scale(1); }
    }
  `
}