import { CoursePart } from "../App";
import Part from "./Part";

const Content = (props: { courseParts: CoursePart[] }) => {
  return (
    <>
      {props.courseParts.map((part) => (
        <Part
          key={part.name}
          course={part}
        />
      ))}
    </>
  );
};

export default Content;
