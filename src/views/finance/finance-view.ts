import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../../projects/finance-grid/src/finance-grid";
import namedStyles from "./finance-view.scss?inline";

@customElement("finance-view")
export default class FinanceView extends LitElement {
  constructor() {
    super();
  }
  render() {
    return html` <iframe src="/finance"></iframe> `;
  }

  static styles = unsafeCSS(namedStyles);
}
