import React from 'react';
import {BrowserRouter, HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import ProjectList from './components/Projects.js'
import PersonList from './components/Persons.js'
import TodoList from './components/Todo.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import axios from 'axios'

const NotFound404 = ({location}) => {
    return(
        <div>
            <h1> Страница по адрресу '{location.pathname}' не найдена </h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects' : [],
            'persons' : [],
            'todo_all': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/project/')
        .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }
        )
        .catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/authapp/')
        .then(response => {
                const persons = response.data
                this.setState(
                    {
                        'persons': persons
                    }
                )
            }
        )
        .catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/')
        .then(response => {
                const todo_all = response.data
                console.log(todo_all)
                this.setState(
                    {
                        'todo_all': todo_all
                    }
                )
            }
        )
        .catch(error => console.log(error))
    }

    render() {
        return(
            <div>
                <BrowserRouter>
                    <Menu/>
                        <nav>
                            <ul>
                                <li>
                                    <Link to='/persons'>Пользователи</Link>
                                </li>
                                <li>
                                    <Link to='/projects'>Проекты</Link>
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                        <Route exact path='/' component={() =><ProjectList projects={this.state.projects}/>} />
                        <Route exact path='/persons' component={() =><PersonList persons={this.state.persons}/>} />
                        <Route path='/project/:id' component={() =><TodoList todo_all={this.state.todo_all}/>} />

                        <Redirect from='/projects' to='/' />
                        <Route component = {NotFound404}/>
                        </Switch>
                        <Footer/>
                </BrowserRouter>
            </div>
        )
    }
};

export default App;