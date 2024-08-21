interface TotalExercises {
  totalExercises: number;
}
const Total = (props: TotalExercises) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

export default Total;
