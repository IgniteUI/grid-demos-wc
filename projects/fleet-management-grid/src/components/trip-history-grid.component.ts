import { configureTheme, defineComponents, IgcAvatarComponent, IgcBadgeComponent } from "igniteui-webcomponents";
import { IgcCellTemplateContext, IgcColumnComponent } from "igniteui-webcomponents-grids/grids";
import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { dataService } from "../services/data.service";
import 'igniteui-webcomponents-grids/grids/combined.js';

defineComponents(IgcAvatarComponent, IgcBadgeComponent)
configureTheme('material');

@customElement('trip-history-grid')
export class TripHistoryGrid extends LitElement {

    constructor() {
        super();        
    }

    @property({ type: Array }) tripHistoryData: any[] = []

    @query("#id-column") idColumn!: IgcColumnComponent;
    @query("#driver-column") driverColumn!: IgcColumnComponent;
    @query("#start-meter-column") startMeterColumn!: IgcColumnComponent;
    @query("#end-meter-column") endMeterColumn!: IgcColumnComponent;
    @query("#distance-column") distanceColumn!: IgcColumnComponent;
    @query("#total-time-column") totalTimeColumn!: IgcColumnComponent;

    firstUpdated() {
        this.idColumn.cellStyles = this.rightAlignedCellStyles;
        this.startMeterColumn.cellStyles = this.rightAlignedCellStyles;
        this.endMeterColumn.cellStyles = this.rightAlignedCellStyles;
        this.distanceColumn.cellStyles = this.rightAlignedCellStyles;
        this.totalTimeColumn.cellStyles = this.rightAlignedCellStyles;


        this.idColumn.headerStyles = this.rightAlignedHeaderStyles;
        this.startMeterColumn.headerStyles = this.rightAlignedHeaderStyles;
        this.endMeterColumn.headerStyles = this.rightAlignedHeaderStyles;
        this.distanceColumn.headerStyles = this.rightAlignedHeaderStyles;
        this.totalTimeColumn.headerStyles = this.rightAlignedHeaderStyles;

        this.driverColumn.bodyTemplate = this.driverCellTemplate;
    }

    private rightAlignedCellStyles = {
        'justify-content': 'flex-end',
        'display': 'flex'
    };

    private rightAlignedHeaderStyles = {
        'text-align': 'right'
    };

    private driverCellTemplate = (ctx: IgcCellTemplateContext) => {
        const isVisible = ctx.cell.row.index === 0 && ctx.cell.row.data.end === "N/A";
        return html`
            <igc-avatar class="driver-avatar" shape="circle" src="${this.getPathToDriverPhoto(ctx.cell)}"></igc-avatar>
            <a class="status-value" #coordinates href="#" @click="${(e: MouseEvent) => this.handleDriverClick(e, ctx)}">${ctx.implicit}</a>
            ${isVisible
                ? html`<igc-badge class="driver-badge" variant="success">
                    <span class="current-badge-text">Current</span>
                </igc-badge>`
                : ""
            }            
        `
    }

    private handleDriverClick(event: MouseEvent, ctx: IgcCellTemplateContext) {
        event.preventDefault();

        const driverName = ctx.cell.row?.cells?.find((c: any) => c.column.field === 'driverName')?.value;

        if (!driverName) {
        console.error('Driver not found in data');
        return;
        }

        const driverDetails = dataService.findDriverByName(driverName);

        if (!driverDetails) {
        console.error(`No data found for driver: ${driverName}`);
        return;
        }

        const detail = {
            driverDetails: driverDetails,
            ctx: ctx,
            originalEvent: event
        };

        this.dispatchEvent(new CustomEvent("driver-cell-click", {
            detail,
            bubbles: true,
            composed: true
        }));
    }

    private getPathToDriverPhoto(cell: any) {
        return `people/${dataService.getDriverPhoto(cell.row.data.driverName)}.jpg`;
    }


    render() {
        return html`
            <link rel="stylesheet" href="node_modules/igniteui-webcomponents-grids/grids/themes/dark/material.css" />
            <igc-grid class="child-grid" .data="${this.tripHistoryData}" height="${null}" width="100%">
                <igc-column id="id-column" field="id" header="ID" width="5%"></igc-column>
                <igc-column id="driver-column" field="driverName" header="Driver" width="18%"></igc-column>
                <igc-column field="start" header="Start" width="9%"></igc-column>
                <igc-column field="end" header="End" width="9%"></igc-column>
                <igc-column field="startLocation" header="Start Location" width="10%"></igc-column>
                <igc-column field="endLocation" header="End Location" width="10%"></igc-column>
                <igc-column id="start-meter-column" field="startMeter" header="Start Meter" width="9.5%"></igc-column>
                <igc-column id="end-meter-column" field="endMeter" header="End Meter" width="9.5%"></igc-column>
                <igc-column id="distance-column" field="distance" header="Distance" width="9%"></igc-column>
                <igc-column id="total-time-column" field="totalTime" header="Total Time" width="9%"></igc-column>
            </igc-grid>
        `
    }

    static styles = css`       
        .driver-avatar {
            --size: 22px
        }

        .status-value {
            padding-left: 8px;
            color: var(--primary-text-color);
        }

        .driver-badge {
            margin-left: 10px;
        }

        .current-badge-text {
            margin: 0 8px;
        }
    `;
}