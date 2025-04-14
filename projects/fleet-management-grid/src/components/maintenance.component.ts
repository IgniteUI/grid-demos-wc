import { configureTheme, defineComponents, IgcBadgeComponent, IgcIconComponent, registerIconFromText } from "igniteui-webcomponents";
import { IgcCellTemplateContext, IgcColumnComponent } from "igniteui-webcomponents-grids/grids";
import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import 'igniteui-webcomponents-grids/grids/combined.js';
import { check, gitIssue } from "@igniteui/material-icons-extended";
import { Maintenance } from "../models/maintenance-history.model";


defineComponents(IgcBadgeComponent, IgcIconComponent)
configureTheme("material")

@customElement("maintenance-grid")
export class TripHistoryGrid extends LitElement {
    constructor() {
        super();

        registerIconFromText(check.name, check.value, "imx-icons");
        registerIconFromText(gitIssue.name, gitIssue.value, 'imx-icons');
    }

    @property({ type: Array }) maintenanceData: Maintenance[] | undefined = [];

    private typeCellTemplate = (ctx: IgcCellTemplateContext) => {
        const value = ctx.implicit;
        const variant = value === "Regular" ? "success" : "warning";
        const iconName = value === "Regular" ? "check" : "git-issue";
        return html`
            <igc-badge .variant="${variant}">
                <igc-icon class="icon-style" collection="imx-icons" .name="${iconName}"></igc-icon>
            </igc-badge>
            <span class="status-value">${value}</span>
        `;        
    }

    private rightAlignedCellStyles = {
        'justify-content': 'flex-end',
        'display': 'flex'
    };

    private rightAlignedHeaderStyles = {
        'text-align': 'right'
    };

    render() {
        return html`
            <link rel="stylesheet" href="node_modules/igniteui-webcomponents-grids/grids/themes/dark/material.css" />
            <igc-grid class="child-grid" .data="${ this.maintenanceData }" height="100%" width="100%">
                <igc-column id="id-column" field="id" header="ID" width="5%" .cellStyles="${this.rightAlignedCellStyles}" .headerStyles="${this.rightAlignedHeaderStyles}"></igc-column>
                <igc-column field="event" header="Event" width="23%"></igc-column>
                <igc-column field="date" header="Date" width="10%"></igc-column>
                <igc-column field="location" header="Location" width="10%"></igc-column>
                <igc-column id="type-column" field="type" header="Type" width="12%" .bodyTemplate="${this.typeCellTemplate}"></igc-column>
                <igc-column field="remarks" header="Remarks" width="40%"></igc-column>
            </igc-grid>
        `
    }

    static styles = css`
        .icon-style {
            color: #000000;
        }

        .status-value {
            padding-left: 8px;
            color: var(--primary-text-color);
        }
    `;
}