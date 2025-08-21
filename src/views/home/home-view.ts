import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { defineComponents, IgcChipComponent, IgcIconButtonComponent, IgcRippleComponent, registerIconFromText } from "igniteui-webcomponents";
import { EXIT_FULL_SCREEN, FILE_DOWNLOAD, FULL_SCREEN, VIEW_MORE } from "../../assets/icons";
import styles from "./home-view.scss?inline";

import "../grids/finance/finance-view";
import "../grids/hr-portal/hr-portal-view";
import "../grids/erp-hgrid/erp-hgrid-view";
import "../grids/fleet-management/fleet-management-view";
import "../grids/sales/sales-view";

import "../charts/bar-chart/bar-chart-view";
import "../charts/column-chart/column-chart-view";
import "../charts/line-chart/line-chart-view";
import "../charts/pie-chart/pie-chart-view";
import "../charts/polar-chart/polar-chart-view";
import "../charts/step-chart/step-chart-view";

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

  @query('#fullscreenElement') fullscreenElement!: HTMLElement;
  @property({ type: Boolean }) isFullscreen = false;
  @property({ type: Boolean }) isChartsSection = false;
  @property({type: Array}) tabsGrids = [
    { key: 'inventory' },
    { key: 'hr-portal' },
    { key: 'finance' },
    { key: 'sales' },
    { key: 'fleet' },
  ];
  @property({type: Array}) tabsCharts = [
    { key: 'column-chart' },
    { key: 'bar-chart' },
    { key: 'line-chart' },
    { key: 'pie-chart' },
    { key: 'step-chart' },
    { key: 'polar-chart' }
  ];
  @state()
  private routeName: string = "inventory";

  public tabInfoGrids = new Map<string, TabInfo>([
    [
      "grids/inventory",
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
      "grids/hr-portal",
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
      "grids/finance",
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
      "grids/sales",
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
      "grids/fleet",
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

  public tabInfoCharts = new Map<string, TabInfo>([
    ['charts/column-chart', {
      title: "Column Chart",
      theme: "Material",
      themeMode: 'Light',
      content: "Render a collection of data points connected by a straight line to emphasize the amount of change over a period of time",
      moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/column-chart",
      downloadLink: ""
    }],
    ['charts/bar-chart', {
      title: "Bar Chart",
      theme: "Material",
      themeMode: 'Light',
      content: "Quickly compare frequency, count, total, or average of data in different categories",
      moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/bar-chart",
      downloadLink: ""
    }],
    ['charts/line-chart', {
      title: "Line Chart",
      theme: "Material",
      themeMode: 'Light',
      content: "Show trends and perform comparative analysis of one or more quantities over a period of time",
      moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/line-chart",
      downloadLink: ""
    }],
    ['charts/pie-chart', {
      title: "Pie Chart",
      theme: "Material",
      themeMode: 'Light',
      content: "Part-to-whole chart that shows how categories (parts) of a data set add up to a total (whole) value.",
      moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/pie-chart",
      downloadLink: ""
    }],
    ['charts/step-chart', {
      title: "Step Chart",
      theme: "Material",
      themeMode: 'Light',
      content: "Emphasizes the amount of change over a period of time or compares multiple items at once.",
      moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/step-chart",
      downloadLink: ""
    }],
    ['charts/polar-chart', {
      title: "Polar Chart",
      theme: "Material",
      themeMode: 'Light',
      content: "Emphasizes the amount of change over a period of time or compares multiple items at once.",
      moreLink: "https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/polar-chart",
      downloadLink: ""
    }],
  ]);

  public tabInfo = this.tabInfoGrids;
  public activeTabs = this.tabsGrids;
  
  constructor() {
    super();
    registerIconFromText("file_download", FILE_DOWNLOAD, "indigo_internal");
    registerIconFromText("view_more", VIEW_MORE, "indigo_internal");
    registerIconFromText("full_screen", FULL_SCREEN, "indigo_internal");
    registerIconFromText("exit_full_screen", EXIT_FULL_SCREEN, "indigo_internal");
  }

  connectedCallback(): void {
    super.connectedCallback();
  
    if (typeof window !== 'undefined') {
      window.addEventListener('vaadin-router-location-changed', this.updateCurrentPath);
      window.addEventListener('resize', this.onResize);

      // Initial setting of the correct route
      const path = window.location.pathname;
      this.routeName = this.extractRouteKey(path);
      this.updateTabsBasedOnRoute(path);
    }
  
    if (typeof document !== 'undefined') {
      document.addEventListener('fullscreenchange', this.onFullscreenChange);
    }
  }
  
  disconnectedCallback(): void {
    super.disconnectedCallback();
  
    if (typeof window !== 'undefined') {
      window.removeEventListener('vaadin-router-location-changed', this.updateCurrentPath);
      window.removeEventListener('resize', this.onResize);
      this.updateTabsBasedOnRoute(window.location.pathname);
    }
  
    if (typeof document !== 'undefined') {
      document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    }
  }

  private extractRouteKey(path: string): string {
    // Get the part after '/home/', (for example 'charts/column-chart')
    const base = path.split('/home/')[1] || '';
    return base;
  }
  
  private updateCurrentPath = (_event: any) => {
    // The full pathname -> like '/webcomponents-grid-examples/home/charts/line-chart'
    const fullPath = window.location.pathname; 
  
    // Extract the last segment as routeName for tab selection -> like 'line-chart'
    const segments = fullPath.split('/').filter(Boolean); 
    const lastSegment = segments[segments.length - 1] || '';
    this.routeName = lastSegment;

    this.updateTabsBasedOnRoute(fullPath);
  };
  
  private onDownloadClick = (event: MouseEvent, tabName: string) => {
    event.preventDefault();
    event.stopPropagation();
  
    const downloadLink = this.tabInfo.get(tabName)?.downloadLink;
    if (typeof window !== 'undefined' && downloadLink) {
      window.open(downloadLink, "_blank")?.focus();
    }
  };
  
  private onViewMoreClick = (event: MouseEvent, tabName: string) => {
    event.preventDefault();
    event.stopPropagation();
  
    const viewMoreLink = this.tabInfo.get(tabName)?.moreLink;
    if (typeof window !== 'undefined' && viewMoreLink) {
      window.open(viewMoreLink, '_blank')?.focus();
    }
  };
  
  private async onToggleFullscreen() {
    if (typeof document === 'undefined') return;

    if (!document.fullscreenElement) {
      await this.fullscreenElement?.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  }
  
  private onResize = () => {
    if (typeof window === 'undefined' || typeof screen === 'undefined') return;

    const isF11 =
      window.innerWidth === screen.width &&
      window.innerHeight === screen.height;

    if (this.isFullscreen !== isF11) {
      this.isFullscreen = isF11;
    }
  };

  private onFullscreenChange = () => {
    if (typeof document === 'undefined') return;
    this.isFullscreen = !!document.fullscreenElement;
  };

  private updateTabsBasedOnRoute(url: string) {
    this.routeName = url.replace(/^.*home\//, '');
    
    if (url.includes('charts')) {
      this.tabInfo = this.tabInfoCharts;
      this.activeTabs = this.tabsCharts;
      this.isChartsSection = true;
    } else {
      this.tabInfo = this.tabInfoGrids;
      this.activeTabs = this.tabsGrids;
      this.isChartsSection = false;
    }
  }

  private tabItemTemplate = (tabName: string) => {
    const currentTabName  = this.routeName.startsWith('charts/')
      ? this.routeName.substring('charts/'.length)
      : this.routeName.substring('grids/'.length);
  
    const isSelected = currentTabName  === tabName;
    const fullTabKey = this.isChartsSection ? `charts/${tabName}` : `grids/${tabName}`;
    const info = this.tabInfo.get(fullTabKey);
  
    return html`
      <div class="tab-item ${classMap({ "tab-item--selected": isSelected })}">
        <div class="tab-header ${classMap({ "tab-header--disabled": !isSelected })}">
          ${info?.title?.toUpperCase() ?? tabName}
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
  
          <div class="action-buttons">
            <igc-button
              variant="outlined"
              class="custom-button"
              @click="${(e: MouseEvent) => this.onDownloadClick(e, tabName)}"
            >
            <igc-icon name="file_download" collection="indigo_internal"></igc-icon>
              Download
            </igc-button>
  
            <igc-button
              variant="outlined"
              class="custom-button"
              @click="${(e: MouseEvent) => this.onViewMoreClick(e, tabName)}"
            >
              <igc-icon name="view_more" collection="indigo_internal"></igc-icon>
              View More
            </igc-button>
  
            <igc-button
              variant="outlined"
              class="custom-button"
              @click="${this.onToggleFullscreen}"
            >
              <igc-icon
                name="${this.isFullscreen ? 'exit_full_screen' : 'full_screen'}"
                collection="indigo_internal"
              ></igc-icon>
              ${this.isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </igc-button>
          </div>
        </div>
      </div>
    `;
  };

  render() {
    return html`
      <div class="demo-container" id="fullscreenElement">
        <div class="tabs-info-wrapper-element">
        ${!this.isFullscreen ? html`
          <div class="tab-container">
            ${this.activeTabs.map(
              (tab) => html`
                <div class="tab-item-container">
                  <a href="${import.meta.env.BASE_URL}home/${this.isChartsSection ? 'charts/' : 'grids/'}${tab.key}">
                    ${this.tabItemTemplate(tab.key)}
                  </a>
                </div>
              `
            )}
          </div>
        ` : ''}
  
          <div>
            ${this.tabInfoTemplate(this.routeName, this.tabInfo?.get(this.routeName))}
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
