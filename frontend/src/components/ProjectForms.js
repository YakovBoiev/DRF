import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
    super(props)
      this.state = {name: '', users: [], repository_link: ''}
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let users = []

        for(let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            ['users']: users
        })
    }

    handleSubmit(event) {
      this.props.createProject(this.state.name, this.state.repository_link, this.state.users)
      event.preventDefault()
    }

    render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
            <label for="login">name</label>
                <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
            </div>




           <select multiple name="users" onChange = {(event) => this.handleUsersChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}> {user.first_name} {user.last_name}</option>)}
                </select>

          <div className="form-group">
            <label for="rep_link">repository_link</label>
                <input type="text" className="form-control" name="repository_link" value={this.state.repository_link} onChange={(event)=>this.handleChange(event)} />
            </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

  export default ProjectForm