import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Result from "./components/Result";
import Button from "./components/Button";
import "./App.css";
import Dice from "./components/Dice";


export default function App() {
  const [numbers, setNumbers] = useState(() => generateDices());
  const [count, setCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timerKey,setTimerKey] = useState(0)


  useEffect(()=>{
    if (
      numbers.every((die) => die.isHeld) &&
      numbers.every((die) => die.value === numbers[0].value)
    ) {
      setGameWon(true);
    }
  },[numbers])

  function generateDices() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }
  const toggleHold = useCallback((id) => {
    setNumbers((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, isHeld: !obj.isHeld } : obj))
    );
  }, []);

  const rollDice = useCallback(() => {
    setNumbers((prev) =>
      prev.map((obj) => ({
        ...obj,
        value: obj.isHeld ? obj.value : Math.ceil(Math.random() * 6),
      }))
    );
    setCount((prev) => prev + 1);
  }, []);
  const reset = () => {
    setNumbers(generateDices());
    setCount(0);
    setGameWon(false);
    setTimerKey(prev=>prev+1)
  };
  const dices = numbers.map((numObj) => {
    return (
      <Dice
        btnDisable={gameWon}
        hold={() => toggleHold(numObj.id)}
        key={numObj.id}
        id={numObj.id}
        isHeld={numObj.isHeld}
        value={numObj.value}
      />
    );
  });

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
        <Button btnDisable={gameWon} onClick={rollDice} text="Roll" />

        <Button btnDisable={gameWon} onClick={reset} text="Reset" />
      </div>
      {gameWon ? (
        <Result count={count} btnDisable={gameWon} onClick={reset} />
      ) : (
        ""
      )}
    </main>
  );
}
