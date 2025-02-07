import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Result from "./components/Result";
import Button from "./components/Button";
import "./App.css";
import Dice from "./components/Dice";

export default function App() {
  const [numbers, setNumbers] = useState(generateDices());
  const [count, setCount] = useState(0);
  const [btnDisable, setBtnDisable] = useState(false);

  function generateDices() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }
  function hold(id) {
    setNumbers((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, isHeld: !obj.isHeld } : obj))
    );
  }

  useEffect(()=>{
    const allHeld = numbers.every(die=> die.isHeld)
    const firstValue = numbers[0].value;
    const allSameValue = numbers.every(die=> die.value === firstValue)
    if(allHeld && allSameValue) {
      setBtnDisable(true)
    }
  },[numbers])

  const dices = numbers.map((numObj) => {
    return (
      <Dice
        btnDisable={btnDisable}
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
    setCount((prev) => prev + 1);
  }
  function reset() {
    setNumbers(generateDices());
    setCount(0);
    setBtnDisable(false);
    setDone(0);
    setFreezed(null);
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
        <Button btnDisable={btnDisable} onClick={rollDice} text="Roll" />

        <Button btnDisable={btnDisable} onClick={reset} text="Reset" />
      </div>
      {btnDisable ? (
        <Result count={count} btnDisable={btnDisable} onClick={reset} />
      ) : (
        ""
      )}
    </main>
  );
}
