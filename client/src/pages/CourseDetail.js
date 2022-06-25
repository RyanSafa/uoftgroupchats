import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Sections from '../components/Sections'

const CourseDetail = (props) => {
    const params = useParams()
    const [course, setCourse] = useState('COURSE NOT FOUND')
    const { code } = params
    const sections_list = course === 'COURSE NOT FOUND' ? [] : ['Common', ...course.lectures]

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
            <Card className="p-2 align-items-center rounded" bg="secondary-blue" text="white">
                <h1 className="display-1 fw-bold">{course.code}</h1>
                <h2 className="display-6">{course.title}</h2>
            </Card>
            <Sections lectures={sections_list} />
        </>
    )
}

export default CourseDetail