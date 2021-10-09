import React from 'react';
import {BrowserRouter, HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import ProjectList from './components/Projects.js'
import PersonList from './components/Persons.js'
import TodoList from './components/Todo.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import LoginForm from './components/Auth.js'

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
            'token': ''
        }
    }

    get_token(username, password){
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            localStorage.setItem('token', response.data.token)
            this.setState({'token': response.data.token}, this.load_data)
        })
        .catch(error => alert ('Неверный логин и пароль'))
    }

    is_authenticated(){
        return this.state.token != ''
    }

    logout(){
        localStorage.setItem('token', '')
        this.setState({'token': ''}, this.load_data)
    }

    get_headers(){
        if (this.is_authenticated()){
            return {'Authorization': 'Token ' + this.state.token}
        }
        return {}
    }


    load_data () {
        const headers = this.get_headers()
         axios.get('http://127.0.0.1:8000/api/project/', {headers})
        .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }
        )
        .catch(error =>{
        console.log(error)
        this.setState({'projects': []})
        }
        )
        axios.get('http://127.0.0.1:8000/api/authapp/', {headers})
        .then(response => {
                const persons = response.data
                this.setState(
                    {
                        'persons': persons
                    }
                )
            }
        )
       .catch(error =>{
        console.log(error)
        this.setState({'persons': []})
        }
        )
        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
        .then(response => {
                const todo_all = response.data
                this.setState(
                    {
                        'todo_all': todo_all
                    }
                )
            }
        )
        .catch(error =>{
        console.log(error)
        this.setState({'todo_all': []})
        }
        )
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        this.setState({'token': token}, this.load_data)
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
                                <li>
                                    { this.is_authenticated() ?
                                    <button onClick={()=>this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>
                                }
                                </li>

                            </ul>
                        </nav>
                        <Switch>
                        <Route exact path='/' component={() =><ProjectList projects={this.state.projects}/>} />
                        <Route exact path='/persons' component={() =><PersonList persons={this.state.persons}/>} />
                        <Route path='/project/:id' component={() =><TodoList todo_all={this.state.todo_all}/>} />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
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