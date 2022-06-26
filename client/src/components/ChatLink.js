import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const ChatLink = (props) => {
    return (
        <Col>
            <Card border="secondary-blue" style={{ width: '18rem' }} text='black' className='my-2'>
                <Card.Header>{props.type}</Card.Header>
                <Card.Body>
                    <Card.Title> <a href={`${props.link}`}>{props.link}</a></Card.Title>
                </Card.Body>
                <Card.Footer>
                    COPY     REPORT
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default ChatLink