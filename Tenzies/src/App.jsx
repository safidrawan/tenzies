import { useState } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import Dice from "./compnents/Dice";
export default function App() {
  const [numbers, setNumbers] = useState(generateDices());
  const [count, setCount] = useState(0);

  function generateDices() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }
  function hold(ev) {
    setNumbers((prev) =>
      prev.map((obj) => ({
        ...obj,
        isHeld: obj.id === ev ? !obj.isHeld : obj.isHeld,
      }))
    );
  }
  const dices = numbers.map((numObj) => {
    return (
      <Dice
        hold={() => hold(numObj.id)}
        key={numObj.id}
        id={numObj.id}
        isHeld={numObj.isHeld}
        value={numObj.value}
      />
    );
  });
  function rollDice() {
    setNumbers((prev) =>
      prev.map((obj) => ({
        ...obj,
        value: obj.isHeld ? obj.value : Math.ceil(Math.random() * 6),
      }))
    );
    setCount(prev => prev+1)
  }
  function reset(){
    setNumbers(generateDices);
    setCount(0)
  }

  return (
    <main>
      <h1 className="color-green">Tenzies</h1>
      <h2># of Tries: {count}</h2>
      <p>
        You should roll dices to make all the same number. by clicking on a
        number you can freeze it and roll others.
      </p>
      <div className="dice-container">{dices}</div>;
      <div className="buttons">
        <button className="btn" onClick={rollDice}>
          Roll
        </button>
        <button className="btn" onClick={reset}>Reset</button>
      </div>
    </main>
  );
}
