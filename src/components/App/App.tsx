import React, { useEffect, useState } from "react";
import { fetchTriviaQuestions } from "../../services/api";
import { TriviaQuestion } from "../../types/question";
import QuestionList from "../Question/QuestionList";
import "./App.css";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0); // Nouveau : suivre le nombre de questions répondues
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchTriviaQuestions();
        setQuestions(
          data.map((q: TriviaQuestion) => ({ ...q, answered: false }))
        ); // Ajouter un champ pour suivre les réponses
      } catch {
        setError("Erreur lors du chargement des questions.");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore((prev) => prev + 1);
    setAnsweredCount((prev) => prev + 1); // Incrémente le nombre de questions répondues

    if (answeredCount + 1 === questions.length) {
      setFinished(true); // Déclenche l'écran de fin
    }
  };

  const restartGame = () => {
    setScore(0);
    setAnsweredCount(0);
    setFinished(false);
    setLoading(true);

    // Recharge de nouvelles questions
    const loadQuestions = async () => {
      try {
        const data = await fetchTriviaQuestions();
        setQuestions(
          data.map((q: TriviaQuestion) => ({ ...q, answered: false }))
        );
      } catch {
        setError("Erreur lors du chargement des questions.");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <p className="text-xl text-blue-600 font-medium animate-pulse">
          Chargement des blagues...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <p className="text-lg text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-4">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">
            Résultat final 🎉
          </h1>
          <p className="text-xl font-medium">
            Vous avez obtenu un score de{" "}
            <span className="text-green-600 font-bold">{score}</span> /{" "}
            {questions.length}.
          </p>
          <button
            onClick={restartGame}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Rejouer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Quizz de Culture Générale
        </h1>
        <QuestionList questions={questions} onAnswer={handleAnswer} />
      </div>
    </div>
  );
};

export default App;
