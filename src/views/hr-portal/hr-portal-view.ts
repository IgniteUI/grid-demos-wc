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
    const iframeSrc = `${import.meta.env.BASE_URL}hr-portal`;

    return html` <iframe src=${iframeSrc}></iframe> `;
  }

  static styles = unsafeCSS(namedStyles);
}
