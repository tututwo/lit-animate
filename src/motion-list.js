import { LitElement, css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { animate, flyBelow, fadeIn } from "@lit-labs/motion";
import "@material/web/list/list.js";
import "@material/web/button/elevated-button.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MotionList extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.count = 0;
    this.data = [
      { id: 1, value: "One" },
      { id: 2, value: "Two" },
      { id: 3, value: "Three" },
      { id: 4, value: "Four" },
      { id: 5, value: "Five" },
    ];
    this.firstData = [
      { id: 1, value: "One" },
      { id: 2, value: "Two" },
      { id: 3, value: "Three" },
      { id: 4, value: "Four" },
      // { id: 5, value: "Five" },
    ];
    this.secondData = [
      { id: 3, value: "Three" }, // Notice the ids remain consistent
      { id: 1, value: "One" },
      { id: 2, value: "Two" },
      { id: 4, value: "Four" },
      { id: 5, value: "Five" },
    ];
  }

  changeToFirstData() {
    this.data = [...this.firstData];
  }
  changeToSecondData() {
    this.data = [...this.secondData];
  }
  render() {
    console.log(this.data);
    return html` <div class="controls">
        <md-elevated-button @click=${this.changeToFirstData} raised
          >Change to First Data</md-elevated-button
        >
      </div>
      <md-elevated-button @click=${this.changeToSecondData} raised
          >Change to Second Data</md-elevated-button
        >
      </div>
      <ul class="tabs">
        ${repeat(
          this.data,
          (item, i) => item.id,
          (item, index) =>
            html` <li
              ${animate({
                keyframeOptions: {
                  duration: 1000,
                },
                in: fadeIn,
                out: flyBelow,
                skipInitial: true,
              })}
            >
              ${item.value}
            </li>`
        )}
      </ul>`;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        color: #040424;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
      }

      .row {
        flex-direction: row;
      }

      li {
        text-align: center;
        flex: 1;
        background: #ef5350;
        padding: 16px;
        border: 4px solid #b61827;
        border-radius: 8px;
        margin: 8px;
        min-width: 100px;
      }
    `;
  }
}

window.customElements.define("motion-list", MotionList);
