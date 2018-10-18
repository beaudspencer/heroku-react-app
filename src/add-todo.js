import React from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withStyles } from '@material-ui/core'

const WideFormControl = withStyles({
  root: {
    width: '19rem'
  }
})(FormControl)

export default class AddTodo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({newTodo: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.setState({newTodo: ''})
    this.props.handleSubmit(this.state.newTodo)
  }
  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <WideFormControl>
          <Input
            type="text"
            id="add"
            value={this.state.newTodo}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment>
                <Button
                  color="secondary"
                  type="submit"
                >
                Add
                </Button>
              </InputAdornment>
            }
          />
        </WideFormControl>
      </form>
    )
  }
}
