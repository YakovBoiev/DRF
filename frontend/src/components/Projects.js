import React from 'react';
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return(
        <tr>
            <td><Link to={`project/${project.id}`} >{project.name}</Link> </td>
            <td>{project.repository_link}</td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return(
        <table>
            <th>name</th>
            <th>repository_link</th>
            <th>repository_link</th>
            {projects.map((proj) => <ProjectItem project={proj} deleteProject={deleteProject}/>)}
        </table>
    )
};

export default ProjectList;