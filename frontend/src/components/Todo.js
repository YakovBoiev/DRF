import React from 'react';
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'

const TodoItem = ({todo, deleteTodo}) => {
    return(
        <tr>
           <td>{todo.project.name}</td>
            <td>{todo.short_description}</td>
            <td>{todo.text}</td>
            <td>{todo.create_date}</td>
            <td>{todo.update_date}</td>
            <td>{todo.user_creator.username}</td>
            <td><button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button></td>
        </tr>

    )
}

const TodoList = ({todo_all, deleteTodo}) => {
    let {id} = useParams()
    let filtered_todo = todo_all.filter((todo) => todo.project.id == id)
    return(
        <div>
        <table>
            <th>project name</th>
            <th>short_description</th>
            <th>text</th>
            <th>create_date</th>
            <th>update_date</th>
            <th>user_creator</th>
            <th></th>
            {filtered_todo.map((tod) => <TodoItem todo={tod} deleteTodo={deleteTodo}/>)}
        </table>
        <Link to='/todo/create'>Create todo</Link>
        </div>
    )

};

export default TodoList;