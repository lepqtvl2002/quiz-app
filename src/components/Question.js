import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  answerListState,
  endTime,
  numericalOrder,
  score,
} from "../recoil_state";

export function Question({
  category,
  type,
  difficulty,
  question,
  correctAnswer,
  incorrectAnswers,
  isReviewMode,
}) {
  const [answers, setAnswers] = useRecoilState(answerListState);
  const [scores, setScores] = useRecoilState(score);
  const [stt, setStt] = useRecoilState(numericalOrder);
  const [, setEndAt] = useRecoilState(endTime);

  const [isAnswered, setIsAnswered] = useState(false);
  function handelAnswer(answer) {
    setIsAnswered(true);
    setAnswers([...answers, answer]);
    if (stt === 5) {
      setEndAt(Date.now());
    }
    setTimeout(() => {
      setIsAnswered(false);
      setStt(stt + 1);
    }, 1000);
  }
  return (
    <div className="flex flex-col justify-start h-screen">
      <div className="justify-self-center">
        Question {stt}
        <span className="text-sm">/5</span>
      </div>
      {/* <h4>Category - {category}</h4>
      <h4>Type : {type}</h4>
      <h4>Difficulty : {difficulty}</h4> */}
      <h4 className="text-center align-middle min-h-[120px]">{question}</h4>
      <div className="grid grid-cols-2 flex-1 p-20">
        <button
          disabled={isReviewMode || isAnswered}
          className={
            isAnswered || answers[stt - 1]
              ? "rounded m-3 drop-shadow-xl bg-green-500"
              : "rounded m-3 drop-shadow-xl border"
          }
          onClick={() => {
            handelAnswer(correctAnswer);
            setScores(scores + 10);
          }}
        >
          {correctAnswer}
        </button>
        {incorrectAnswers?.map((incorrectAnswer) => (
          <button
            disabled={isReviewMode || isAnswered}
            className={
              answers[stt - 1] === incorrectAnswer
                ? "rounded m-3 drop-shadow-xl bg-red-500"
                : "rounded m-3 drop-shadow-xl border"
            }
            onClick={() => handelAnswer(incorrectAnswer)}
            key={incorrectAnswer}
          >
            {incorrectAnswer}
          </button>
        ))}
      </div>
      {isReviewMode && (
        <button
          className="mx-20 py-2 mb-20 rounded bg-yellow-400 text-white"
          onClick={() => {
            setStt(stt + 1);
          }}
        >
          Next question -{">"}
        </button>
      )}
    </div>
  );
}
