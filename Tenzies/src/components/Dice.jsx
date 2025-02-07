import { useState } from "react";

export default function Dice(props) {
  return (
    <button
      disabled={props.btnDisable}
      onClick={props.hold}
      className={`dice ${props.isHeld ? "freeze" : ""} ${
        props.btnDisable ? "btn-disabled" : ""
      }`}
    >
      {props.value}
    </button>
  );
}
