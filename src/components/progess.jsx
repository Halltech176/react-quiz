const Progress = ({ index, numQuestions, answer, points, max }) => {
  return (
    <header className="progess">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1} </strong> / {numQuestions}{" "}
      </p>
      <p>
        <strong>
          {points} / {max}
        </strong>
      </p>
    </header>
  );
};

export default Progress;
