import { useState } from "react";

export default function Dice(props) {
  return (
    <button
      disabled={props.btnDisable}
      onClick={props.hold}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${props.isHeld ? "held":"not held"}`}
      className={`dice ${props.isHeld ? "freeze" : ""} ${
        props.btnDisable ? "btn-disabled" : ""
      }`}
    >
      {props.value}
    </button>
  );
}
