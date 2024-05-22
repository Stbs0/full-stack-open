const Header = ({ name }) => {
  return <h1>{name} </h1>;
};
const Content = ({
 ...props
}) => {
  return (
    <div>
      <Part part={props.parts1} exercise={props.exercises1} />
      <Part part={props.parts2} exercise={props.exercises2} />
      <Part part={props.parts3} exercise={props.exercises3} />
    </div>
  );
};
const Part = ({ part, exercise }) => {
  return(<p>
    {part} {exercise}
  </p>)
};
const Total = ({ total }) => {
  return (
    <div>
      <p>Number of exercises{total}</p>
    </div>
  );
};
const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header name={course} />
      <Content
        parts1={part1}
        parts2={part2}
        parts3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
