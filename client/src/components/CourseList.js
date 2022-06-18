import React from 'react'
import './CourseList.css'

const CourseList = (props) => {
    let output = ''

    if (props.searchResult === 'you fucked up') {
        return <h2>No Courses Found!</h2>
    } else if (props.searchResult.length > 0) {
        output = props.searchResult.map((course) => {
            return (
                <li key={course.id}><h3>{course.code}</h3>
                    <h4>{course.title}</h4>
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