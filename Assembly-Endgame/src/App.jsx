import { useState } from "react";
import "./App.css";
import { languages } from "./languages";
export default function App() {
  const [currentWord, setCurrentWord] = useState("react");
  
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const keyboard = alphabet
    .split("")
    .map((letter, index) => <button key={index}>{letter}</button>);

  const wordElement = currentWord
    .split("")
    .map((letter) => <span key={letter}>{letter.toUpperCase()}</span>);
  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Gues the word in 8 attempts to keep the programming world safe from
          Assembly
        </p>
      </header>
      <section className="game-status">
        <h2>You Win! </h2>
        <p>Well Done! 🎉</p>
      </section>
      <section className="language-chips">
        {languages.map((obj, index) => (
          <div
            key={index}
            style={{ backgroundColor: obj.backgroundColor, color: obj.color }}
            className="language"
          >
            {obj.name}
          </div>
        ))}
      </section>
      <section className="word">{wordElement}</section>
      <section className="keyboard">{keyboard}</section>
      <button className="newgame">New Game</button>
    </>
  );
}
