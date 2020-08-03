// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'

export default class TodoList extends React.Component {
   constructor(){
       super()
    this.state = {
        todos: [],
        todoToShow: "all",
        toggleAllComplete: true,
    }
   }
    addTodo = (todo) => {
        this.setState({
            todos: [...this.state.todos, todo]
        })
    }

    toggleComplete = id => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if(todo.id === id) {
                    return {
                        ...todo,
                        complete: !todo.complete,
                    }
                }else{
                    return todo;
                }
            })
        })
    }
   
    updateTodoToShow = (string) => {
        this.setState({
            todoToShow: string
        })
    }

    handleDeleteTodo = id => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    removeAllTodosThatAreComplete = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        })
    }

    render() {
        let todos = [];
        
        if (this.state.todoToShow === 'all') {
            todos = this.state.todos;
        }else if (this.state.todoToShow === 'active') {
            todos = this.state.todos.filter(todo => !todo.complete)
        }else if (this.state.todoToShow === 'complete') {
            todos = this.state.todos.filter(todo => todo.complete)
        }
    
    return (
        <div>
            <TodoForm onSubmit={this.addTodo} />
        {todos.map(todo => (
            <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDeleteTodo(todo.id)}
            todo={todo}
            />
        ))}
        <div>
            {this.state.todos.some(todo => !todo.complete)}
            <button onClick={() => this.updateTodoToShow("all")}>all</button>
            <button onClick={() => this.updateTodoToShow("active")}>active</button>
            <button onClick={() => this.updateTodoToShow("complete")}>complete</button>
            
            {this.state.todos.filter(todo => todo.complete).length ? (<div>
                <button onClick={this.removeAllTodosThatAreComplete}>remove complete</button>
            </div>) : null}

            <button onClick={() =>
            this.setState({
                todos: this.state.todos.map(todo => ({
                    ...todo,
                    complete: this.state.toggleAllComplete
                })),
                toggleAllComplete: !this.state.toggleAllComplete
            })}>toggle all {`${this.state.toggleAllComplete}`} </button>
        </div>
        </div>
        
    )
}
}
