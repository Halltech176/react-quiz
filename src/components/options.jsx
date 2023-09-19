const Options = ({ question, dispatch, answer }) => {
  console.log(answer);
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            key={option}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              index === question.correctOption ? "correct" : "wrong"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
