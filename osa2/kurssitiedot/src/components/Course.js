const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    console.log("Total log", parts)
    return <p><strong>total of {total} exercises</strong></p>
  }
  
  const Part = ({name, exercises}) => {
    console.log("Part log ", name, exercises)
    return <p>{name} {exercises}</p>
  }
  
  const Content = ({ parts }) => {
    console.log("Content log ", parts)
    return (
      <>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </>
    )
  }
  
  const Header = ({ name }) => {
    console.log("Header log ", name)
    return <h2>{name}</h2>
  }
  
  const Course = ({ course }) => {
    console.log("Course log ", course)
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course