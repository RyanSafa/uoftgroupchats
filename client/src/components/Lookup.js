import React from 'react'
import { useRef } from 'react'

const Lookup = (props) => {
    const courseRef = useRef()

    const formSubmit = (event) => {
        event.preventDefault()
        props.formSubmissionHandler(courseRef.current.value)
    }

    return (
        <>
            <h1>Search for the course you want!</h1>
            <form onSubmit={formSubmit}>
                <label htmlFor="code">Course Code</label>
                <input ref={courseRef} type="text" name='code' />
                <button type="submit">Search</button>
            </form>
        </>
    )
}

export default Lookup