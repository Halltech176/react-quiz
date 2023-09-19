import Options from "./options";

const Question = ({ question, dispatch, answer }) => {
  console.log(question);
  return (
    <div className="">
      <h4>{question.question}</h4>
      <Options dispatch={dispatch} answer={answer} question={question} />
    </div>
  );
};

export default Question;
