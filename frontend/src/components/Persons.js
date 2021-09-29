import React from 'react';

const PersonItem = ({person}) => {
    return(
        <tr>
            <td>{person.username}</td>
            <td>{person.first_name}</td>
            <td>{person.last_name}</td>
            <td>{person.email}</td>
        </tr>
    )
}

const PersonList = ({persons}) => {
    return(
        <table>
            <th>username</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            {persons.map((per) => <PersonItem person={per}/>)}
        </table>
    )
};

export default PersonList;