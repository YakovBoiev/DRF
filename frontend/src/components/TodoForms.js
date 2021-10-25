import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
    super(props)
      this.state = {short_description: '', text: '', project: '', user: ''}
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
    }



    handleSubmit(event) {
        console.log(this.state.short_description, this.state.text, this.state.project, this.state.user)

      this.props.createTodo(this.state.short_description, this.state.text, this.state.project, this.state.user)
      event.preventDefault()
    }

    render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
            <label for="desc">short_description</label>
                <input type="text" className="form-control" name="short_description" value={this.state.short_description} onChange={(event)=>this.handleChange(event)} />
            </div>
          <div className="form-group">
            <label for="text">text</label>
                <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="form-group">
            <label for="project">Project</label>
            <select name="project" onChange = {(event) => this.handleChange(event)}>
                    {this.props.projects.map((project) => <option value={project.id}> {project.name} </option>)}
            </select>
            </div>
            <div className="form-group">
            <label for="user_creator">User_creator</label>
            <select name="user" onChange = {(event) => this.handleChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}> {user.first_name} {user.last_name} </option>)}
            </select>
            </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

  export default TodoForm