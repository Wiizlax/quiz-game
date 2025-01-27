import React, { useState } from "react";
import Confetti from "react-confetti";
import { TriviaQuestion } from "../../types/question";
import { decodeHtmlEntities } from "../../utils/DecodeHtml";
import "./Question.css";

type QuestionProps = {
  question: TriviaQuestion;
  onAnswer: (isCorrect: boolean) => void;
};

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [answered, setAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Mélanger les réponses possibles
  const options = React.useMemo(
    () =>
      [...question.incorrect_answers, question.correct_answer].sort(
        () => Math.random() - 0.5
      ),
    [question]
  );

  const handleAnswer = (answer: string) => {
    if (!answered) {
      const correct = answer === question.correct_answer;
      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setAnswered(true);
      onAnswer(correct); // Appelle la fonction pour mettre à jour le score
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow relative overflow-hidden">
      {/* Affichage des confettis en cas de bonne réponse */}
      {isCorrect && answered && (
        <Confetti
          recycle={false}
          numberOfPieces={300}
          gravity={0.4}
          wind={0}
          className="confetti-small absolute inset-0 pointer-events-none"
        />
      )}

      <p className="text-base font-medium text-gray-800 mb-4">
        {decodeHtmlEntities(question.question)}
      </p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`block w-full text-left p-2 rounded bg-blue-100 hover:bg-blue-200 ${
              answered && option === question.correct_answer
                ? "bg-green-200"
                : answered && option === selectedAnswer && !isCorrect
                ? "bg-red-200"
                : ""
            }`}
            onClick={() => handleAnswer(option)}
            disabled={answered}
          >
            {decodeHtmlEntities(option)}
          </button>
        ))}
      </div>
      {answered && (
        <div className="mt-4">
          {isCorrect ? (
            <p className="text-green-600 font-medium">Bonne réponse ! 🎉</p>
          ) : (
            <p className="text-red-600 font-medium">
              Mauvaise réponse. La bonne réponse était :{" "}
              <span className="font-bold">
                {decodeHtmlEntities(question.correct_answer)}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;