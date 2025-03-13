import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { dataService } from "./services/data.service";
import { defineComponents, IgcAvatarComponent } from "igniteui-webcomponents";
import { IgcCellTemplateContext } from "igniteui-webcomponents-grids/grids";
import "igniteui-webcomponents-grids/grids/combined.js";

defineComponents(IgcAvatarComponent);

@customElement("app-finance-grid")
export default class FinanceGrid extends LitElement {
  constructor() {
    super();
    dataService.getFinanceData().then((data) => {
      this.financeData = data;
      this.isLoading = false;
    });
  }

  @state()
  private financeData = [];

  @property()
  private isLoading = true;

  private getPathToImage(val: string): string {
    return `companies/${val.split(" ")[0]}.png`;
  }

  private assetTemplate = (ctx: IgcCellTemplateContext) => {
    return html`
      <div class="assets-container">
        <igc-avatar .src=${this.getPathToImage(ctx.cell.value)} shape="rounded"></igc-avatar>
        <span>${ctx.cell.value}</span>
      </div>
    `;
  };

  render() {
    return html`
      <link rel="stylesheet" href="./node_modules/igniteui-webcomponents/themes/light/bootstrap.css" />
      <link rel="stylesheet" href="./node_modules/igniteui-webcomponents-grids/grids/themes/light/bootstrap.css" />
      <igc-grid .data="${this.financeData}" primary-key="id" row-selection="multiple" .isLoading="${this.isLoading}" class="grid-sizing">
        <igc-column field="id" header="Symbol" ?sortable="${true}" width="7%"></igc-column>
        <igc-column field="holdingName" header="Asset" ?sortable="${true}" width="15%" .bodyTemplate="${this.assetTemplate}"></igc-column>
      </igc-grid>
    `;
  }

  static styles = css`
    .assets-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      & igc-avatar {
        --size: 24px;
      }
    }

    .grid-sizing {
      --ig-size: var(--ig-size-small);
    }
  `;
}
