import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'


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
        <Card className="p-2 align-items-center rounded" bg="secondary-blue" text="white">
            <h1 className="display-1">{course.code}</h1>
            <h2 className="display-6">{course.title}</h2>
        </Card>
    )
}

export default CourseDetail