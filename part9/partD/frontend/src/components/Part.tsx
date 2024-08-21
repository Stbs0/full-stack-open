import { CoursePart } from "../App";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = (props: { course: CoursePart }) => {
  const course = props.course;

  switch (course.kind) {
    case "group":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>

          <p></p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <em>{course.description}</em>
          <p>{course.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>
            <em>{course.description}</em>
          </p>
          <p>{course.requirements.join(" ")}</p>
        </div>
      );
    case "basic":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>
            <em>{course.description}</em>
          </p>
        </div>
      );

    default:
      return assertNever(course);
  }
};

export default Part;
