import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import DeleteIcon from '@material-ui/icons/Delete'

export default function TodoList(props) {
  const styles = {
    checked: {
      opacity: '0.5',
      textDecoration: 'line-through'
    },
    unchecked: {
      opacity: '1'
    }
  }
  return (
    <React.Fragment>
      {props.todos.map(todo => {
        return (
          <ListItem key={todo.id}
            dense
            button
            divider
            id={todo.id}
            onClick={props.handleClick}
            style={todo.isCompleted ? styles.checked : styles.unchecked}
          >
            <Checkbox
              checked={todo.isCompleted}
              disableRipple
            />
            <ListItemText>
              {todo.task}
            </ListItemText>
            {todo.isCompleted && <ListItemSecondaryAction>
              <IconButton
                id={todo.id}
                onClick={props.handleClick}
                className="delete">
                <DeleteIcon/>
              </IconButton>
            </ListItemSecondaryAction>}
          </ListItem>
        )
      })}
    </React.Fragment>
  )
}
