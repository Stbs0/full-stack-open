import React from "react";
interface CourseParts {
  name: string;
  exerciseCount: number;
}
const Content = (props: { courseParts: CourseParts[] }) => {
  return (
    <>
      <p>
        {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
      </p>
      <p>
        {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
      </p>
      <p>
        {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
      </p>
    </>
  );
};

export default Content;
