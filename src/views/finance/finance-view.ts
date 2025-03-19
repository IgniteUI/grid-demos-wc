import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../projects/finance-grid/src/finance-grid";

@customElement("finance-view")
export default class FinanceView extends LitElement {
  render() {
    return html`
      <app-finance-grid></app-finance-grid>
    `;
  }
  static styles = css`
    :host {
    }
  `;
}
