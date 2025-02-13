import { useState } from "react";
import { clsx } from "clsx";
import "./App.css";
import { languages } from "./languages";
export default function App() {
  const [currentWord, setCurrentWord] = useState(
    languages[Math.floor(Math.random() * languages.length)].name.toLowerCase()
  );
  const [userGuesses, setUserGuesses] = useState([]);

  const wrongGuessesCount = userGuesses.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => userGuesses.includes(letter));

  const isGameLost = wrongGuessesCount >= languages.length - 1;

  const isGameOver = isGameWon || isGameLost;

  const alphabet = "abcdefghijklmnopqrstuvwxyz.";

  function updateUserGuesses(letter) {
    setUserGuesses((prev) => [...prev, letter]);
  }
  function newGame() {
    setUserGuesses([]);
    setCurrentWord(() => {
      return languages[
        Math.floor(Math.random() * languages.length)
      ].name.toLowerCase();
    });
  }
  const languageElements = languages.map((obj, index) => {
    const isLangLost = index < wrongGuessesCount;
    return (
      <div
        key={index}
        style={{ backgroundColor: obj.backgroundColor, color: obj.color }}
        className={`language ${isLangLost ? "lost" : ""}`}
      >
        {obj.name}
      </div>
    );
  });

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

  const wordElement = currentWord.split("").map((letter) => (
    <span className="word-letters" key={letter}>
      {userGuesses.includes(letter) ? letter.toUpperCase() : ""}
    </span>
  ));

  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in 8 attempts to keep the programming world safe from
          Assembly!
        </p>
      </header>
      <section
        className={`game-status ${
          isGameWon ? "won" : isGameLost ? "lost" : ""
        }`}
      >
        {isGameWon ? (
          <>
            {" "}
            <h2>You Win! </h2>
            <p>Well Done! 🎉</p>
          </>
        ) : isGameLost ? (
          <>
            {" "}
            <h2>You Lose! </h2>
            <p>Try again!</p>
          </>
        ) : (
          <>
            {" "}
            <h2>Game</h2>
            <p>in progress</p>
          </>
        )}
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{wordElement}</section>
      <section className="keyboard">{keyboard}</section>
      {isGameOver ? (
        <button onClick={newGame} className="newgame">
          New Game
        </button>
      ) : (
        ""
      )}
    </>
  );
}
