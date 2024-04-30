import { LitElement, css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { animate, flyBelow, fadeIn } from "@lit-labs/motion";
import "@material/web/list/list.js";
import "@material/web/button/elevated-button.js";
import "@material/web/textfield/outlined-text-field.js";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MotionDo extends LitElement {
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
  }
  render() {
    console.log(this.data);
    return html` <md-outlined-field label="Enter a todo..."></md-outlined-field>
      <div class="controls">
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
        </ul>
      </div>`;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        outline: none;
        padding: 8px;
        --mdc-theme-primary: #0069c0;
        --mdc-theme-secondary: #1b5e20;
        --mdc-typography-body2-font-size: 1.1rem;
        --mdc-typography-body2-font-weight: 600;
        --mdc-checkbox-unchecked-color: black;
      }

      md-outlined-field {
        display: block;
        margin-top: 16px;
        --mdc-shape-small: 12px;
        width:1000px;
        height:200px;
      }

      .controls {
        display: flex;
        padding: 8px 0;
        justify-content: flex-end;
      }

      .lists {
        display: flex;
      }

      .list {
        flex: 1;
      }

      ul {
        margin: 0;
        padding: 0;
        outline: none;
      }

      li {
        will-change: transform;
        position: relative;
        background: #ffeb3b;
        padding: 8px;
        border-radius: 12px;
        margin: 8px;
        display: flex;
        align-items: center;
      }

      li > button {
        border: none;
        background: none;
        outline: none;
        font-family: "Material Icons";
        font-size: 24px;
        cursor: pointer;
      }

      li > mwc-formfield {
        flex: 1;
      }

      .list.completed li {
        background: #4caf50;
      }
    `;
  }
}

window.customElements.define("motion-todo", MotionDo);
