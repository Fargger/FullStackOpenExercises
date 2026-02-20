const Header = ({courseName}) => <h1>{courseName}</h1>

const Content = (props) => (
  <div>
    {props.parts.map((part, index) => (
      <Part key={index} part={part} />
    ))}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) => {
  let total = parts.reduce((total, current) => {
    return total + current.exercises;
  }, 0);
  return(
    <strong>Total of exercises {total}</strong>
  );
}

const Course = ({course}) => {
  return (
    course.map((item, index) => (
      <div key={index}>
        <Header courseName={item.name} />
        <Content parts={item.parts} />
        <Total parts={item.parts} />
      </div>
    ))
  );
};

export default Course;