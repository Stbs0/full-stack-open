const Header = ({ name: { name } }) => {
  console.log(name);
  return <h1>{name} </h1>;
};
const Content = ({ parts: { parts } }) => {
  console.log(parts);
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].name} />
      <Part part={parts[2].name} exercise={parts[2].name} />
    </div>
  );
};
const Part = ({ part, exercise }) => {
  console.log(part);
  return (
    <p>
      {part} {exercise}
    </p>
  );
};
const Total = ({ parts:{parts} }) => {

  console.log(parts);
  return (
    <div>
      <p>
        Number of exercises
        {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    </div>
  );
};
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
};

export default App;
