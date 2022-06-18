import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const CourseDetail = (props) => {
    const params = useParams()
    const [course, setCourse] = useState('COURSE NOT FOUND')
    const { code } = params

    useEffect(() => {
        const fetchData = async (code) => {
            const response = await fetch(`/api/courses/${code}`)
            const data = await response.json()
            setCourse(data)
        }

        fetchData(code)
    }, [code])

    if (course === 'y') {
        return <h2>'COURSE NOT FOUND'</h2>
    }

    return (
        <>
            <h1>{course.code} </h1>
            <h2>{course.title}</h2>
            <h3>Lectures:</h3>
            <p>{course.lectures}</p>
            <Link to='/' >Go back</Link>
        </>
    )
}

export default CourseDetail