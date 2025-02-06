import { useState } from "react";

export default function Dice(props) {
  return (
    <button
      onClick={props.hold}
      className={`dice ${props.isHeld ? "freeze" : ""}`}
    >
      {props.value}
    </button>
  );
}
