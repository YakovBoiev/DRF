import React from 'react';
import {HashRouter, Route, Link} from 'react-router-dom'
import ProjectList from './components/Projects.js'
import PersonList from './components/Persons.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects' : [],
            'persons' : []
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
        }


    render() {
        return(
            <div>
                <HashRouter>
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
                        <Route exact path='/persons' component={() =><PersonList persons={this.state.persons}/>} />
                        <Route exact path='/projects' component={() =><ProjectList projects={this.state.projects}/>} />
                        <Footer/>
                </HashRouter>
            </div>
        )
    }
};

export default App;