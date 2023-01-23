import React, { useState } from "react";
import { fetchQuestions } from "./Api";
import QuestionCard from "./components/QuestionCard";
import { Difficulty, QuestiosState } from "./Api";

type answerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTALQuestions = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestiosState[]>([]);
  const [userAnswers, setUserAnswer] = useState<answerObject[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQestions = await fetchQuestions(TOTALQuestions, Difficulty.EASY);
    setQuestions(newQestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //user answer
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswer((prev) => [...prev, answerObject]);
      console.log(userAnswers);
    }
  };

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>React quiz</h1>
      {gameOver || userAnswers.length === TOTALQuestions ? (
        <button className="start" onClick={startTrivia}>
          start
        </button>
      ) : null}
      {!gameOver && <p className="score"> Score: {score} </p>}
      {loading && <p>Loading Questions....</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNu={number + 1}
          totalQuestions={TOTALQuestions}
          question={questions[number].question}
          answers={questions[number].answer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTALQuestions - 1 ? (
        <button onClick={nextQuestion}> Next Question</button>
      ) : null}
    </div>
  );
}

export default App;
