import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { defineComponents, IgcChipComponent, IgcIconButtonComponent, IgcRippleComponent, registerIconFromText } from "igniteui-webcomponents";
import { FILE_DOWNLOAD, FULL_SCREEN, VIEW_MORE } from "../../assets/icons";
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
  content: string;
  theme: string;
  themeMode: string;
  moreLink: string;
  downloadLink: string;
}

@customElement("home-view")
export default class HomeView extends LitElement {
  constructor() {
    super();
    registerIconFromText("file_download", FILE_DOWNLOAD, "indigo_internal");
    registerIconFromText("view_more", VIEW_MORE, "indigo_internal");
    registerIconFromText("full_screen", FULL_SCREEN, "indigo_internal");
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
        theme: "Material",
        themeMode: 'Light',
        content: "Tracking and managing quantity, location and details of products in stock.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/grids/hierarchical-grid/overview",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/erp-inventory-sample-app-web-components",
      },
    ],
    [
      "hr-portal",
      {
        title: "Org Chart/HR Portal",
        theme: "Fluent",
        themeMode: 'Light',
        content: "Displaying company's hierarchical structure and showing employees data.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/grids/tree-grid/overview",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/org-charthr-portal-sample-app-web-components",
      },
    ],
    [
      "finance",
      {
        title: "Financial Portfolio",
        theme: "Bootstrap",
        themeMode: 'Light',
        content: "Asset tracking, profit and loss analysis, featuring interactive dynamic charts.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/grids/data-grid",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/financial-portfolio-sample-app-web-components",
      },
    ],
    [
      "sales",
      {
        title: "Sales Dashboard",
        theme: "Indigo",
        themeMode: 'Light',
        content: "For trend analysis, KPIs and viewing sales summaries by region, product, etc.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/grids/pivot-grid/overview",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/sales-grid-sample-app-web-components",
      },
    ],
    [
      "fleet",
      {
        title: "Fleet Management",
        theme: "Material",
        themeMode: 'Dark',
        content: "A master-detail grid for managing vehicle acquisition, operations, and maintenance.",
        moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/grids/grid/master-detail",
        downloadLink: "https://www.infragistics.com/resources/sample-applications/fleet-management-sample-app-web-components",
      },
    ],
  ]);

  @state()
  private routeName: string = "inventory";

  private updateCurrentPath = (event: any) => {
    const { route } = event.detail.location;
    this.routeName = route.path;
  };

  private onDownloadClick = (event: MouseEvent, tabName: string) => {
    const downloadLink = this.tabInfo.get(tabName)?.downloadLink;
    window.open(downloadLink, "_blank")?.focus();

    event.preventDefault();
    event.stopPropagation();
  };

  public onViewMoreClick(event: MouseEvent, tabName: string) {
    const viewMoreLink = this.tabInfo.get(tabName)?.moreLink;
    window.open(viewMoreLink, '_blank')?.focus();

    event.preventDefault();
    event.stopPropagation();
  }

  public onFullscreenClick = () => {
    const fullPath = window.location.pathname;
    const pathSegments = fullPath.split('/').filter(Boolean);
    const newPathSegments = pathSegments.filter(segment => segment !== 'home');
    const trimmedPath = '/' + newPathSegments.join('/');
    const newUrl = window.location.origin + trimmedPath;
  
    window.open(newUrl, '_blank');
  };
  
  
  private tabItemTemplate = (tabName: string) => {
    return html`
      <div class="tab-item ${classMap({ "tab-item--selected": this.routeName === tabName })}">
        <div class="tab-header ${classMap({ "tab-header--disabled": this.routeName !== tabName })}">
          ${this.tabInfo.get(tabName)?.title}
        </div>
      </div>
    `;
  };

  private tabInfoTemplate = (tabName: string, info: TabInfo | undefined) => {
    return html`
      <div class="current-tab-info">
        <div class="sample-info">
          <div class="tab-header">${info?.title}</div>
          <div class="tab-description">${info?.content}</div>
        </div>
  
        <div class="sample-actions">
          <div class="theme-info">Theme: ${info?.theme}</div>
          <div class="theme-info">Mode: ${info?.themeMode}</div>
  
          <div>
            <igc-button
              variant="outlined"
              class="custom-button"
              style="margin-right: 8px"
              @click="${(e: MouseEvent) => this.onDownloadClick(e, tabName)}"
            >
            <igc-icon name="file_download" collection="indigo_internal"></igc-icon>
              Download
            </igc-button>
  
            <igc-button
              variant="outlined"
              class="custom-button"
              style="margin-right: 8px"
              @click="${(e: MouseEvent) => this.onViewMoreClick(e, tabName)}"
            >
              <igc-icon name="view_more" collection="indigo_internal"></igc-icon>
              View More
            </igc-button>
  
            <igc-button
              variant="outlined"
              class="custom-button"
              @click="${this.onFullscreenClick}"
            >
              <igc-icon name="full_screen" collection="indigo_internal"></igc-icon>
              Fullscreen
            </igc-button>
          </div>
        </div>
      </div>
    `;
  };


  render() {
    return html`
      <div class="demo-container">
        <div class="tabs-info-wrapper-element">
          <div class="tab-container ">
            <div class="tab-item-container">
              <a href="${import.meta.env.BASE_URL}home/inventory">${this.tabItemTemplate("inventory")} </a>
            </div>
            <div class="tab-item-container">
              <a href="${import.meta.env.BASE_URL}home/hr-portal">${this.tabItemTemplate("hr-portal")} </a>
            </div>
            <div class="tab-item-container">
              <a href="${import.meta.env.BASE_URL}home/finance">${this.tabItemTemplate("finance")} </a>
            </div>
            <div class="tab-item-container">
              <a href="${import.meta.env.BASE_URL}home/sales">${this.tabItemTemplate("sales")} </a>
            </div>
            <div class="tab-item-container">
              <a href="${import.meta.env.BASE_URL}home/fleet">${this.tabItemTemplate("fleet")} </a>
            </div>
          </div>

          <div> ${this.tabInfoTemplate(this.routeName, this.tabInfo?.get(this.routeName))}
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
