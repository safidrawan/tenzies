import { useState } from "react";
import { clsx } from "clsx";
import "./App.css";
import { languages } from "./languages";
export default function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [userGuesses, setUserGuesses] = useState([]);
  console.log(userGuesses);
  function updateUserGuesses(letter) {
    setUserGuesses((prev) => [...prev, letter]);
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const keyboard = alphabet.split("").map((letter, index) => {
    const isGuessed = userGuesses.includes(letter);
    const isCorrect = currentWord.includes(letter) && isGuessed;
    const isWrong = isGuessed && !isCorrect;
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        onClick={() => updateUserGuesses(letter)}
        key={index}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const wordElement = currentWord
    .split("")
    .map((letter) => <span className="word-letters" key={letter}>{userGuesses.includes(letter)? (letter.toUpperCase()):""}</span>);
  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Gues the word in 8 attempts to keep the programming world safe from
          Assembly!
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
