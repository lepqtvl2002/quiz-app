import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isReviewState,
  numericalOrder,
  questionListState,
  score,
  startTime,
  timeState,
  answerListState,
} from "./recoil_state";
import { question } from "./utils/api";
import { Question } from "./components/Question";
import { Result } from "./components/Result";

async function getQuestionList() {
  const questionList = await question.get();
  return questionList.results;
}

function App() {
  const [stt, setStt] = useRecoilState(numericalOrder);
  const [questionList, setQuestionList] = useRecoilState(questionListState);
  const [isReview, setIsReview] = useRecoilState(isReviewState);
  const [, setStartedAt] = useRecoilState(startTime);
  const countingTime = useRecoilValue(timeState);
  const [, setAnswers] = useRecoilState(answerListState);
  const [scores, setScores] = useRecoilState(score);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const questions = await getQuestionList();
      setQuestionList(questions);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function startQuiz() {
    setStt(1);
    setStartedAt(Date.now());
  }

  function reviewQuestion() {
    setStt(1);
    setIsReview(true);
  }

  function resetQuiz() {
    setIsReview(false);
    setStt(1);
    setStartedAt(Date.now());
    setScores(0);
    setAnswers([]);
  }

  if (!stt)
    return (
      <div className="w-full h-screen flex justify-center align-center">
        <div className="m-auto">
          <button
            className="rounded bg-blue-400 text-white px-4 py-2"
            onClick={startQuiz}
          >
            Start Quiz!
          </button>
        </div>
      </div>
    );

  if (isLoading) return <>Loading...</>;
  const currentQuestion = questionList[stt - 1];
  if (!currentQuestion)
    return (
      <Result
        scores={scores}
        countingTime={countingTime}
        resetQuiz={resetQuiz}
        reviewQuestion={reviewQuestion}
      />
    );
  return (
    <Question
      isReviewMode={isReview}
      questionNumber={stt}
      category={currentQuestion.category}
      type={currentQuestion.type}
      difficulty={currentQuestion.difficulty}
      question={currentQuestion.question}
      correctAnswer={currentQuestion.correct_answer}
      incorrectAnswers={currentQuestion.incorrect_answers}
    />
  );
}

export default App;
