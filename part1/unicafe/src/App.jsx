import { useState } from "react";
const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, bad, neutral }) => {
  const average = (good, neutral, bad) => {
    return (good - bad) / (good + neutral + bad);
  };
  if (!bad && !good && !neutral) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    );
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text={"good"} value={good} />
            <StatisticsLine text={"neutral"} value={neutral} />
            <StatisticsLine text={"bad"} value={bad} />
            <StatisticsLine text={"all"} value={good + neutral + bad} />
            <StatisticsLine
              text={"average"}
              value={average(good, neutral, bad) || 0}
            />
            <StatisticsLine
              text={"positive"}
              value={(good / (good + neutral + bad)) * 100 || 0}
            />
          </tbody>
        </table>
      </>
    );
  }
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
