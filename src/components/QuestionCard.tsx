import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNu: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNu,
  totalQuestions,
}) => (
  <div>
    <p className="number">
      Question : {questionNu} /{totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map((answer)=>(
        <div key={answer}>
          <button disabled={userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html:answer}}></span>
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
