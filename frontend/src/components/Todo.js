import React from 'react';

const ProjectItem = ({project}) => {
    return(
        <tr>
            <td>{project.name}</td>
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