import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { erpDataService } from "./services/erp-data.service";
// import { TRENDING_DOWN, TRENDING_UP } from "./assets/icons/icons";
import { configureTheme, defineComponents, IgcAvatarComponent, IgcIconComponent, IgcInputComponent, IgcLinearProgressComponent, registerIconFromText } from "igniteui-webcomponents";
import { FilteringLogic, GridSelectionMode, IgcCellTemplateContext, IgcFilteringExpressionsTree, IgcGridComponent, IgcStringFilteringOperand } from "igniteui-webcomponents-grids/grids";
import "igniteui-webcomponents-grids/grids/combined.js";

defineComponents(IgcAvatarComponent, IgcIconComponent, IgcLinearProgressComponent, IgcInputComponent);
configureTheme("material");

@customElement('app-erp-hgrid')
export default class ErpHierarchicalGrid extends LitElement {

  private productImageClasses = {
    'product-img': true
  };

  @query("igc-hierarchical-grid")
  private hgrid!: IgcGridComponent;

  @state()
  private erpData = [];
  private selectionMode: GridSelectionMode = 'multiple';

  @state()
  private isLoading = true;

  constructor() {
    super();
    // registerIconFromText("trending_up", TRENDING_UP, "material");
    // registerIconFromText("trending_down", TRENDING_DOWN, "material");
    erpDataService.getErpData().then((data) => {
      this.erpData = data;
      this.isLoading = false;
    });
  }

  private getPathToImage(val: string): string {
    const imageUrl = `${val.split(" ")[0]}`;
    console.log(imageUrl);
    return imageUrl;
  }
  
  private imageTemplate = (ctx: IgcCellTemplateContext) => {
    // #imageElement
    console.log('cell.value', ctx.cell.value);

    // @mouseenter=${(e: any) => this.onImageHover(e, this.imageDialog)} 
    // @mouseleave=${(e: any) => this.onImageLeave(e, this.imageDialog)}

    return html`
      <div class="assets-container">
          <img
            .src="${ctx.cell.value}"
            alt="Product"
            igc-ripple="white"

          />
        
      </div>
    `;
  };

  private filter(e: any) {
    const value = e.target.value;
    const expressionTree = new IgcFilteringExpressionsTree();
    expressionTree.operator = FilteringLogic.Or;
    const tickerExpression = {
      condition: IgcStringFilteringOperand.instance().condition("contains"),
      fieldName: "id",
      searchVal: value,
      ignoreCase: true,
    };
    const assetExpression = {
      condition: IgcStringFilteringOperand.instance().condition("contains"),
      fieldName: "holdingName",
      searchVal: value,
      ignoreCase: true,
    };
    expressionTree.filteringOperands.push(tickerExpression, assetExpression);
    if (value) {
      this.hgrid.filteringExpressionsTree = expressionTree;
    } else {
      this.hgrid.clearFilter();
    }
  }

  public exportStarted(event:any) {
    console.log('event', event);
  }

    // #hierarchicalGrid
  render() {
    return html`
        <link rel="stylesheet" href="node_modules/igniteui-webcomponents-grids/grids/themes/light/material.css" />

        <img alt="Product" src=" /products/adidas-sports-shoes-4762266_1920.jpg">
        

        <igc-hierarchical-grid
          .data="${this.erpData}" 
          primary-key="sku" 
          row-selection="multiple" 
          class="grid-sizing"
          width="100%"
          height="100%"
          row-height="32px"
          auto-generate="false"
          allow-filtering="true"
          allow-advanced-filtering="true"
          moving="true"
          row-selection="${this.selectionMode}">
  
          <igc-grid-toolbar>
            <igc-grid-toolbar-title>Inventory</igc-grid-toolbar-title>
            <igc-grid-toolbar-actions>
              <igc-grid-toolbar-hiding></igc-grid-toolbar-hiding>
              <igc-grid-toolbar-pinning></igc-grid-toolbar-pinning>
              <igc-grid-toolbar-exporter export-excel="true" export-csv="true" @exportStarted="${this.exportStarted}"></igc-grid-toolbar-exporter>
              <igc-grid-toolbar-advanced-filtering></igc-grid-toolbar-advanced-filtering>
            </igc-grid-toolbar-actions>
          </igc-grid-toolbar>

          <igc-column field="sku" header="SKU" ?sortable="${true}" data-type="string"></igc-column>
          <igc-column
              field="imageUrl"
              header="Image"
              width="5%"
              ?filterable="${false}"
              data-type="'image'"
              .cellClasses="${this.productImageClasses}"
              .bodyTemplate="${this.imageTemplate}">
          </igc-column>
          <igc-column field="productName" header="Product Name" data-type="string" ?sortable="${true}" width="12%"></igc-column>
          <igc-column field="category" header="Category" data-type="string" ?sortable="${true}"></igc-column>
          <igc-column field="unitsSold" header="Sold Units Last Month" data-type="number" width="10%" ?sortable="${true}"></igc-column>
          <igc-column field="grossPrice" header="Gross Price" data-type="currency" width="7%" ?sortable="${true}"></igc-column>
          <igc-column field="netPrice" header="Net Price" data-type="currency" width="7%" ?sortable="${true}"></igc-column>
          <igc-column field="totalNetProfit" header="Net Profit" data-type="currency" width="7%" ?sortable="${true}"></igc-column>

        </igc-hierarchical-grid>
    `;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
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
