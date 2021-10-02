import React from 'react';
import {Link} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return(
        <tr>
            <td><Link to={`project/${project.id}`} >{project.name}</Link> </td>
            <td>{project.repository_link}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return(
        <table>
            <th>name</th>
            <th>repository_link</th>
            {projects.map((proj) => <ProjectItem project={proj}/>)}
        </table>
    )
};

export default ProjectList;