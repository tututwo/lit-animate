import { LitElement, css, html, svg } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { animate, flyBelow, fadeIn, fade } from "@lit-labs/motion";
import "@material/web/list/list.js";
import "@material/web/button/elevated-button.js";
import * as d3 from "d3";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MotionViz extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      xKey: { type: String },
      yKey: { type: String },
    };
  }

  constructor() {
    super();
    this.width = 600;
    this.height = 800;
    this.xKey = "brand_name";
    this.yKey = "value";
    this.data = [
      { id: 1, brand_name: "One", value: 10 },
      { id: 2, brand_name: "Two", value: 10 },
      { id: 3, brand_name: "Three", value: 10 },
      { id: 4, brand_name: "Four", value: 10 },
      { id: 5, brand_name: "Five", value: 15 },
    ];
    this.firstData = [
      { id: 1, brand_name: "One", value: 10 },
      { id: 2, brand_name: "Two", value: 20 },
      { id: 3, brand_name: "Three", value: 30 },
      { id: 4, brand_name: "Four", value: 40 },
      { id: 5, brand_name: "Five", value: 35 },
    ];
    this.secondData = [
      { id: 1, brand_name: "One", value: 10 },
      { id: 2, brand_name: "Two", value: 30 },
      { id: 3, brand_name: "Three", value: 50 },
      { id: 4, brand_name: "Four", value: 70 },
      { id: 5, brand_name: "Five", value: 45 },
    ];
    this.differentTypeData = [
      { id: 1, date: "One", sell: 10 },
      { id: 2, date: "Two", sell: 30 },
      { id: 3, date: "Three", sell: 50 },
      { id: 4, date: "Four", sell: 35 },
      { id: 5, date: "Five", sell: 55 },
    ];
  }

  changeToFirstData() {
    this.data = [...this.firstData];
    this.yKey = "value";
    this.xKey = "brand_name";
  }
  changeToSecondData() {
    this.data = [...this.secondData];
    this.yKey = "value";
    this.xKey = "brand_name";
  }
  changeToDifferentData() {
    this.data = [...this.differentTypeData];
    this.yKey = "sell";
    this.xKey = "date";
  }

  render() {
    const xScale = d3
      .scaleBand()
      .domain(this.data.map((d) => d[this.xKey]))
      .range([0, this.width])
      .padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d[this.yKey])])
      .range([0, this.height]);
    console.log(this.data);
    return html` <div class="controls">
        <md-elevated-button @click=${this.changeToFirstData} raised
          >Change to First Data</md-elevated-button
        >
      </div>
      <md-elevated-button @click=${this.changeToSecondData} raised
          >Change to Second Data</md-elevated-button
        >
        <md-elevated-button @click=${this.changeToDifferentData} raised
          >Change to differentTypeData Data</md-elevated-button
        >
      </div>
      <svg width=${this.width} height=${this.height} class="tabs">
        ${repeat(
          this.data,
          (item, i) => item.id,
          (item, index) =>
            svg` <rect
            style="transform: translate(${xScale(item[this.xKey])}px,${
              this.height - yScale(item[this.yKey])
            }px)"
            
            width=${xScale.bandwidth()} 
            height=${yScale(item[this.yKey])}
            fill="coral"
            opacity="0.5"
              ${animate({
                keyframeOptions: {
                  duration: 1000,
             
                },
                in: [{
  transform: `translate(${xScale(item[this.xKey])}px, ${this.height - yScale(item[this.yKey])}px)`, 
  opacity: 0
}],
                stabilizeOut: true,
                // out: flyBelow,
                skipInitial: true,
              })}
            >
            </rect>`
        )}
      </svg>`;
  }

  static get styles() {
    return css`
      :host {
        /* display: flex; */
        height: 100%;
        width: 100%;
        /* flex-direction: column;
        align-items: center;
        justify-content: center; */
        position: relative;
        overflow: hidden;
        color: #040424;
      }
      .controls {
        display: flex;
        align-items: center;
      }
    `;
  }
}

window.customElements.define("motion-viz", MotionViz);
