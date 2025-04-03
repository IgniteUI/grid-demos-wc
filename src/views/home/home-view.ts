import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { defineComponents, IgcChipComponent, IgcIconButtonComponent, IgcRippleComponent, registerIconFromText } from "igniteui-webcomponents";
import { FILE_DOWNLOAD } from "../../assets/icons";
import styles from "./home-view.scss?inline";

import "../finance/finance-view";
import "../hr-portal/hr-portal-view";
import "../erp-hgrid/erp-hgrid-view";
import "../fleet-management/fleet-management-view";
import "../sales/sales-view";
import { classMap } from "lit/directives/class-map.js";

defineComponents(IgcIconButtonComponent, IgcChipComponent, IgcRippleComponent);

interface TabInfo {
  title: string;
  theme: string;
  content: string;
  moreLink: string;
  downloadLink: string;
}

@customElement("home-view")
export default class HomeView extends LitElement {
  constructor() {
    super();
    registerIconFromText("file_download", FILE_DOWNLOAD, "indigo_internal");
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("vaadin-router-location-changed", this.updateCurrentPath);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("vaadin-router-location-changed", this.updateCurrentPath);
  }

  public tabInfo = new Map<string, TabInfo>([
    [
      "inventory",
      {
        title: "ERP/ Inventory",
        theme: "Material Light",
        content: "Tracking and managing quantity, location and details of products in stock.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/hierarchicalgrid/hierarchical-grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/erp-inventory-sample-app",
      },
    ],
    [
      "hr-portal",
      {
        title: "Org Chart/HR Portal",
        theme: "Fluent Light",
        content: "Displaying company's hierarchical structure and showing employees data.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/treegrid/tree-grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/org-charthr-portal-sample-app",
      },
    ],
    [
      "finance",
      {
        title: "Financial Portfolio",
        theme: "Bootstrap Light",
        content: "Asset tracking, profit and loss analysis, featuring interactive dynamic charts.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/grid/grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/financial-portfolio-sample-app",
      },
    ],
    [
      "sales",
      {
        title: "Sales Dashboard",
        theme: "Indigo Light",
        content: "For trend analysis, KPIs and viewing sales summaries by region, product, etc.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/pivotGrid/pivot-grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/sales-grid-sample-app",
      },
    ],
    [
      "fleet",
      {
        title: "Fleet Management",
        theme: "Material Dark",
        content: "A master-detail grid for managing vehicle acquisition, operations, and maintenance.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-angular/angular/components/grid/master-detail",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/fleet-management-sample-app",
      },
    ],
  ]);

  @state()
  private routeName: string = "finance";

  private updateCurrentPath = (event: any) => {
    const { route } = event.detail.location;
    this.routeName = route.path;
  };

  private onLinkClick = (event: MouseEvent) => {
    const targetHTML = event.currentTarget as HTMLAnchorElement;
    window.open(targetHTML.href, "_blank")?.focus();

    event.preventDefault();
    event.stopPropagation();
  };

  private onDownloadClick = (event: MouseEvent, tabName: string) => {
    const downloadLink = this.tabInfo.get(tabName)?.downloadLink;
    window.open(downloadLink, "_blank")?.focus();

    event.preventDefault();
    event.stopPropagation();
  };

  private tabItemTemplate = (tabName: string) => {
    return html`
      <div class="tab-item ${classMap({ "tab-item--selected": this.routeName === tabName })}">
        <div class="tab-header ${classMap({ "tab-header--disabled": this.routeName !== tabName })}">
          ${this.tabInfo.get(tabName)?.title}
          <igc-chip ?disabled="${this.routeName !== tabName}">${this.tabInfo.get(tabName)?.theme}</igc-chip>
        </div>
        <div class="tab-content ${classMap({ "tab-content--disabled": this.routeName !== tabName })}">
          <span>${this.tabInfo.get(tabName)?.content}</span>
        </div>
        <div class="tab-actions">
          <a class="learn-text  ${classMap({ "link--disabled": this.routeName !== tabName })}" href="${this.tabInfo.get(tabName)?.moreLink}" @click="${this.onLinkClick}">Learn more</a>
          <div class="tooltip">
            <igc-icon-button class="${classMap({ "button--disabled": this.routeName !== tabName, "button--enabled": this.routeName === tabName })}" @click="${(e: any) => this.onDownloadClick(e, tabName)}">
              <igc-ripple></igc-ripple>
              <igc-icon name="file_download" collection="indigo_internal"></igc-icon>
            </igc-icon-button>
            <span class="tooltip--text"> Download sample. </span>
          </div>
        </div>
      </div>
    `;
  };

  render() {
    return html`
      <div class="demo-container">
        <div class="tab-container ">
          <div class="tab-item-container">
            <a href="/home/inventory">${this.tabItemTemplate("inventory")} </a>
          </div>
          <div class="tab-item-container">
            <a href="/home/hr-portal">${this.tabItemTemplate("hr-portal")} </a>
          </div>
          <div class="tab-item-container">
            <a href="/home/finance">${this.tabItemTemplate("finance")} </a>
          </div>
          <div class="tab-item-container">
            <a href="/home/sales">${this.tabItemTemplate("sales")} </a>
          </div>
          <div class="tab-item-container">
            <a href="/home/fleet">${this.tabItemTemplate("fleet")} </a>
          </div>
        </div>
        <div class="router-container">
          <slot></slot>
        </div>
      </div>
    `;
  }
  static styles = unsafeCSS(styles);
}
