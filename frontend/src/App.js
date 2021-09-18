import React from 'react';
import PersonList from './components/Persons.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'persons' : []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/apiauthapp/')
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
                <Menu/>
                <PersonList persons={this.state.persons}/>
                <Footer/>
            </div>
        )
    }
};

export default App;
