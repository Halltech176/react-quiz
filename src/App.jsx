import { useEffect, useReducer } from "react";
import Error from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./mains";

import StartScreen from "./components/startScreen";
import Question from "./components/Question";
import NextButton from "./components/nextButton";
import Progess from "./components/progess";
import FinishedScreen from "./components/finishedScreen";
import Timer from "./components/timer";
import Footer from "./components/footer";

const initialState = {
  questions: [],
  answer: null,

  // loading, error, ready, active and finished
  status: "loading",
  index: 0,
  points: 0,
  secondsRemaing: 10,
};

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaing: state.secondsRemaing - 1,
        status: state.secondsRemaing === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("unknown action");
      break;
  }
};

const App = () => {
  const [
    { questions, secondsRemaing, index, points, answer, status },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progess
              points={points}
              index={index}
              max={maxPossiblePoints}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaing} dispatch={dispatch} />
              <NextButton
                index={index}
                numQuestions={numQuestions}
                answer={answer}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            dispatch={dispatch}
            maxPossiblePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
