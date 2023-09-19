import { useState, useReducer } from "react";

function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "incr":
        return { ...state, count: state.count + state.step };
        break;
      case "decr":
        return { ...state, count: state.count - state.step };
        break;
      case "setCount":
        return { ...state, count: payload };
        break;
      case "setStep":
        return { ...state, step: state.count + payload };
        break;
      case "reset":
        return initialState;
        break;
      default:
        throw new Error("unknow action");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "decr" });
  };

  const inc = function () {
    dispatch({ type: "incr" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
