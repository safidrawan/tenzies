import { useState } from "react";

import "./App.css";
import Dice from "./compnents/Dice";
export default function App() {
  const [numbers, setNumbers] = useState(generateDices());

  function generateDices() {
    return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
  }

  const dices = numbers.map((num, index) => {
    return <Dice key={index} num={num} />;
  });
  function rollDice() {
    setNumbers(generateDices());
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        You should roll dices to make all the same number. by clicking on a
        number you can freeze it and roll others.
      </p>
      <div className="dice-container">{dices}</div>;
      <button className="roll" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
