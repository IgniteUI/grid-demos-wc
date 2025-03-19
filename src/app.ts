import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Router } from "@vaadin/router";
import { routes } from "./app-routing";

import "./views/home/home-view";

@customElement("app-root")
export default class App extends LitElement {
  firstUpdated() {
    const outlet = this.shadowRoot?.querySelector("router-outlet");
    const router = new Router(outlet);
    router.setRoutes(routes);
  }

  render() {
    return html` <router-outlet></router-outlet> `;
  }

  static styles = css`
    :host {
    }
  `;
}
