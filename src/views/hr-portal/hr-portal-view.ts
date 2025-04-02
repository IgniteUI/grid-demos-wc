import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../../projects/hr-portal/src/hr-portal";
import namedStyles from "./hr-portal-view.scss?inline";

@customElement("hr-portal-view")
export default class HrPortalView extends LitElement {
  constructor() {
    super();
  }
  render() {
    return html` <iframe src="/hr-portal"></iframe> `;
  }

  static styles = unsafeCSS(namedStyles);
}
