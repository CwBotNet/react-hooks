import { useEffect, useMemo, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(false)





  useEffect(() => {

    async function fetchTodo() {

      const response = await axios.get("http://localhost:8080/api/v1/todo")

      if (response.status.success) {
        setUpdateTodo(!updateTodo)
      } else {
        setUpdateTodo(false)
      }
      const newTodo = await response.data.todos

      // console.log(newTodo)
      setTodo(newTodo)
      // console.log(todo)
    }
    fetchTodo()
    // get data from server

  }, [done, updateTodo])


  async function handelMarkAsDone(id) {
    const response = await axios.patch(`http://localhost:8080/api/v1/todo/${id}`);
    if (!response.data.success) return;

    setDone(!done)

    return response.data;
  }


  async function handelAddFetch() {
    const response = await axios.get(`http://localhost:8080/api/v1/todo/`)
    setUpdateTodo(!updateTodo)
    setTodo([...todo, response.data])
  }

  async function deleteTodo(id) {
    const response = await axios.delete(`http://localhost:8080/api/v1/todo/${id}`)
    setUpdateTodo(!updateTodo)
    return response.data
  }

  return (
    <>


      <main>
        {todo.map((data, idx) => (

          <Todo key={idx} id={data._id} title={data.title} description={data.description} markas={() => { handelMarkAsDone(data._id) }} onDelet={() => { deleteTodo(data._id) }} isDone={data.done} />
        ))}
        <AddTodo onAdd={() => handelAddFetch()} />
        <Addsum />
      </main>

    </>
  )
}

export default App

const Todo = ({ title, description, markas, isDone, onDelet }) => {
  // console.log(isDone)



  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>

      <h2>{title}</h2>
      <p>{description}</p>
      <button
        style={
          isDone ? { backgroundColor: "green" } : { backgroundColor: "orange" }}
        onClick={markas}
      >
        {isDone ? "done" : "mark asdone"}
      </button>
      <button onClick={onDelet}>delete</button>
    </div>
  )
}

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const todo = {
    title: title,
    description: description
  }


  async function handleSubmit() {
    const response = await axios.post("http://localhost:8080/api/v1/todo", todo)

    const data = await response.data
    return data
  }

  return (
    <div>
      <input type="text" onChange={(e) => setTitle(e.target.value)} /><br />
      <input type="text" onChange={(e) => setDescription(e.target.value)} /><br />
      <button onClick={() => { handleSubmit(), onAdd() }}>add todo</button>
    </div>
  )

}




function Addsum() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [total, setTotal] = useState(0)

  const result = useMemo(() => {
    const result = parseInt(x) + parseInt(y)

    return result
  }, [x, y])

  function sum() {
    setTotal(result)
  }

  return (
    <>
      <div>
        <input type="number" onChange={(e) => setX(e.target.value)} /><br />
        <input type="number" onChange={(e) => setY(e.target.value)} /><br />
        <button onClick={() => sum()}>add</button>
        <p>{total}</p>
      </div>
    </>
  )
}
