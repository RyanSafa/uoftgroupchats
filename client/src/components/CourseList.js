import React from 'react'
import { Link } from 'react-router-dom'
import './CourseList.css'

const CourseList = (props) => {
    let output = ''

    if (props.searchResult === 'you fucked up') {
        return <h2>No Courses Found!</h2>
    } else if (props.searchResult.length > 0) {
        output = props.searchResult.map((course) => {
            const linkTo = `${course.full}`
            return (
                <li key={course.id}>
                    <Link to={linkTo} ><h3>{course.full}</h3>
                        <h4>{course.title}</h4></Link>
                </li>
            )
        })
    }

    return (
        <>
            <ul>
                {output}
            </ul>
        </>
    )
}

export default CourseList