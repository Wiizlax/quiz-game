import React from "react";
import { TriviaQuestion } from "../../types/question";
import Question from "./Question";

type QuestionListProps = {
  questions: TriviaQuestion[];
  onAnswer: (isCorrect: boolean) => void;
};

const QuestionList: React.FC<QuestionListProps> = ({ questions, onAnswer }) => {
  return (
    <ul className="space-y-4">
      {questions.map((question, index) => (
        <Question key={index} question={question} onAnswer={onAnswer} />
      ))}
    </ul>
  );
};

export default QuestionList;
