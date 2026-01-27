import React from "react";

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header header={course} />
      <Content obj={course} />
      <Total obj={course} />
    </div>
  );
}

function Header(props) {
  return (
    <h1>{props.header.name}</h1>
  );
}

function Content(props) {
  return (
    <React.Fragment>
      <p>
        "{props.obj.parts[0].name}" has {props.obj.parts[0].exercises} exercises.
      </p>
      <p>
        "{props.obj.parts[1].name}" has {props.obj.parts[1].exercises} exercises.
      </p>
      <p>
        "{props.obj.parts[2].name}" has {props.obj.parts[2].exercises} exercises.
      </p>
    </React.Fragment>
  );
}

function Total(props) {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    count += props.obj.parts[i].exercises;
  }
  return (
    <p>
      We totally have {count} exercises now.
    </p>
  );
}

export default App