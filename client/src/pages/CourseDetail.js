import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Link } from 'react-router-dom'

const CourseDetail = (props) => {
    const params = useParams()
    const [course, setCourse] = useState('COURSE NOT FOUND')
    const { courseCode } = params

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/courses/${courseCode}`).then((response) => {
            setCourse(response.data)
            console.log(response.data)
        })
    }, [courseCode])

    if (course === 'y') {
        return <h2>'COURSE NOT FOUND'</h2>
    }

    return (
        <>
            <h1>{course.full} </h1>
            <h2>{course.title}</h2>
            <h3>Lectures:</h3>
            <p>{course.lectures}</p>
            <Link to='/' >Go back</Link>
        </>
    )
}

export default CourseDetail