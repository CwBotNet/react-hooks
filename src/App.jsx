import { useState } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: 'Todo 1',
      description: "this is a description"
    }
  ])

  return (
    <>
      <main>
        <Todo key={todo[0].id} title={todo[0].title} description={todo[0].description} />
      </main>
    </>
  )
}

export default App

const Todo = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

