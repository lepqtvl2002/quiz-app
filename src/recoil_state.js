import { atom, selector } from "recoil";

const answerListState = atom({
  key: "answerListState",
  default: [],
});

const questionListState = atom({
  key: "questionListState",
  default: [],
});

const numericalOrder = atom({ key: "numericalOrder", default: 0 });
const isReviewState = atom({ key: "isReviewState", default: false });
const startTime = atom({ key: "startTime", default: 0 });
const endTime = atom({ key: "endTime", default: 0 });
const timeState = selector({
  key: "timeState",
  get: ({ get }) => {
    const countingTime = get(endTime) - get(startTime);
    const minutes = Math.floor(countingTime / 60000);
    const seconds = Math.floor((countingTime % 60000) / 1000);
    const milliseconds = Math.floor((countingTime % 1000) / 10);
    const timeDisplay = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    return timeDisplay;
  },
});
const score = atom({ key: "score", default: 0 });
const scoreState = selector({
  key: "scoreState",
  get: ({ get }) => {
    const point = get(score);
    return point;
  },
});

export {
  answerListState,
  questionListState,
  numericalOrder,
  isReviewState,
  startTime,
  endTime,
  timeState,
  score,
  scoreState,
};
