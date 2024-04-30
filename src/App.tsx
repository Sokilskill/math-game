import { useEffect, useState } from "react";
import "./App.css";

const MathGame = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [operation, setOperation] = useState("+");
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  const generateRandomNumbers = () => {
    const maxNumber = difficulty === "easy" ? 10 : 20;
    let firstNumber = Math.floor(Math.random() * maxNumber);
    let secondNumber = Math.floor(Math.random() * maxNumber);

    while (secondNumber === 0 || firstNumber === 0) {
      firstNumber = Math.floor(Math.random() * maxNumber);
      secondNumber = Math.floor(Math.random() * maxNumber);
    }

    setNum1(Math.max(firstNumber, secondNumber));
    setNum2(Math.min(firstNumber, secondNumber));
  };

  const checkAnswer = () => {
    const correctAnswer = calculateAnswer();
    if (parseInt(answer) === correctAnswer) {
      setFeedback("Правильно!");
    } else {
      setFeedback("Спробуй ще раз.");
    }
  };
  const feedbackColor = feedback === "Правильно!" ? "success" : "error";

  const calculateAnswer = () => {
    switch (operation) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "×":
        return num1 * num2;
      case "÷":
        return Math.floor(num1 / num2);
      default:
        return 0;
    }
  };

  const newQuestion = () => {
    generateRandomNumbers();
    setAnswer("");
    setFeedback("");
  };

  return (
    <div className="math-game">
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <ul className="list-btn">
          <li>
            <button onClick={() => setOperation("+")}>Додавання</button>
          </li>
          <li>
            <button onClick={() => setOperation("-")}>Віднімання</button>
          </li>
          <li>
            <button onClick={() => setOperation("×")}>Множення</button>
          </li>
          <li>
            <button onClick={() => setOperation("÷")}>Ділення</button>
          </li>
        </ul>

        <select
          style={{}}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Легкий</option>
          <option value="hard">Важкий</option>
        </select>
      </div>
      <div className="question">
        <span>{num1}</span> {operation} <span>{num2}</span> ={" "}
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={checkAnswer}>Перевірити</button>
      </div>
      {feedback && (
        <div className={`feedback ${feedbackColor}`}>{feedback}</div>
      )}
      <button onClick={newQuestion}>Новий приклад</button>
    </div>
  );
};

export default MathGame;
