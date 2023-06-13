export function Result({ scores, countingTime, reviewQuestion, resetQuiz }) {
  return (
    <div className="flex flex-col p-20">
      <div
        className={
          scores >= 30
            ? "text-center w-[200px] h-[200px] text-white bg-blue-200 rounded m-auto pt-10"
            : "text-center w-[200px] h-[200px] text-white bg-pink-300 rounded m-auto pt-10"
        }
      >
        Score
        <p className="text-2xl text-bold">{scores}</p>
        <p className="text-sm text-bold">{countingTime}</p>
        {scores >= 30 ? (
          <p className="text-2xl text-bold pt-6">Congratulations!</p>
        ) : (
          <p className="text-2xl text-bold pt-6">{"Unluckily :("}</p>
        )}
      </div>
      <div className="flex justify-center gap-4 p-10">
        <button
          className="text-white px-8 py-4 rounded bg-green-400"
          onClick={reviewQuestion}
        >
          Review
        </button>
        <button
          className="text-white px-8 py-4 rounded bg-red-400"
          onClick={resetQuiz}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
