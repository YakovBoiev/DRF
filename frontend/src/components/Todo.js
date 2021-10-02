import React from 'react';
import { useParams } from 'react-router-dom'

const TodoItem = ({todo}) => {
    return(
        <tr>
           <td>{todo.project.name}</td>
            <td>{todo.short_description}</td>
            <td>{todo.text}</td>
            <td>{todo.create_date}</td>
            <td>{todo.update_date}</td>
            <td>{todo.user_creator.username}</td>
        </tr>
    )
}

const TodoList = ({todo_all}) => {
    let {id} = useParams()
    console.log(id)
    let filtered_todo = todo_all.filter((todo) => todo.project.id == id)
    return(
        <table>
            <th>project name</th>
            <th>short_description</th>
            <th>text</th>
            <th>create_date</th>
            <th>update_date</th>
            <th>user_creator</th>
            {filtered_todo.map((tod) => <TodoItem todo={tod}/>)}

        </table>
    )
};

export default TodoList;