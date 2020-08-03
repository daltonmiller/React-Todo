import React from 'react'
// import shortid from 'shortid'

export default class TodoForm extends React.Component {
    constructor() {
        super()

        this.state={
            text: ''
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            id: new Date(),
            text: this.state.text,
            compolete: false,
        })
        this.setState({
            text:""
        })
    }
 


    render() {
        return (
       <div>
           <form onSubmit={this.handleSubmit}>
               <input
               type="textbox"
                name="text"
                placeholder="enter note"
                value={this.state.text}
                onChange={this.handleChange}
                />
                <div>
                <button onClick={this.handleSubmit}>submit</button>
                </div>
           </form>
       </div>
            
        )
    }
}