
import React from 'react'
import List from '@material-ui/core/List'
import TodoList from './todo-list.js'
import AddTodo from './add-todo.js'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const StyledList = withStyles({
  root: {
    width: '19rem'
  }
})(List)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.getTodos = this.getTodos.bind(this)
    this.postTodo = this.postTodo.bind(this)
    this.checkTodo = this.checkTodo.bind(this)
  }
  getTodos() {
    fetch('/todos', {method: 'GET'})
      .then((data) => {
        data.json()
          .then(data => {
            this.setState({todos: data})
          })
      })
  }
  postTodo(task) {
    const newTask = {
      task: task,
      isCompleted: false
    }
    fetch('/todos', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(
        res => res.json()
      )
      .then(
        todo => this.setState({todos: [...this.state.todos, todo]})
      )
  }
  deleteTodo(event) {
    console.log(event.target)
    const clicked = event.target.closest('[id]').id
    const id = parseInt(clicked, 10)
    const index = this.state.todos.findIndex(todo => todo.id === id)
    fetch(`/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        const before = this.state.todos.slice(0, index)
        const after = this.state.todos.slice((index + 1))
        this.setState({todos: [...before, ...after]})
      })
  }
  checkTodo(event) {
    let id = event.target.closest('[id]').id
    id = parseInt(id, 10)
    const index = this.state.todos.findIndex(todo => todo.id === id)
    fetch(`/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'isCompleted': !this.state.todos[index].isCompleted
      })
    })
      .then(res => res.json())
      .then((todo) => {
        const before = this.state.todos.slice(0, index)
        const after = this.state.todos.slice((index + 1))
        this.setState({todos: [...before, todo, ...after]})
      })
  }
  handleClick(event) {
    if (event.target.closest('.delete')) {
      this.deleteTodo(event)
      console.log('deleting')
    }
    else this.checkTodo(event)
  }
  componentDidMount() {
    this.getTodos()
  }
  render() {
    return (
      <Grid align="center">
        <h2>Todo List</h2>
        <AddTodo handleSubmit={this.postTodo}/>
        <StyledList>
          <TodoList
            todos={this.state.todos}
            handleClick={this.handleClick}
          />
        </StyledList>
      </Grid>
    )
  }
}
