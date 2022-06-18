import React from 'react'
import { useState } from 'react';
import Axios from 'axios'
import Lookup from '../components/Lookup';
import CourseList from '../components/CourseList';

const Home = () => {
    const [searchResult, setSearchResult] = useState([])

    const formSubmissionHandler = (courseSent) => {
        Axios.get(`http://localhost:5000/api/${courseSent}`).then((response) => {
            setSearchResult(response.data)
        }).catch((err) => { console.log('OOPS') })
    }

    return (
        <>
            <Lookup formSubmissionHandler={formSubmissionHandler}></Lookup>
            <CourseList searchResult={searchResult} />
        </>
    )
}

export default Home