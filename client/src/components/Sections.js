import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Sections = (props) => {
    const list_output = props.lectures.map((lec) => {
        return <ListGroup.Item variant='secondary-blue' action href={`#${lec}`}>
            {lec}
        </ListGroup.Item>
    })
    const links_output = props.lectures.map((lec) => {
        return <Tab.Pane eventKey={`#${lec}`}>
            {lec}
        </Tab.Pane>
    })

    return (
        <Container className='mt-2'>
            <Card className="text-center" bg='primary-blue' text='white'>
                <Card.Body>
                    <Card.Title>Find your groupchat!</Card.Title>
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                        <Row>
                            <Col sm={4}>
                                <ListGroup>
                                    {list_output}
                                </ListGroup>
                            </Col>
                            <Col sm={8}>
                                <Tab.Content>
                                    {links_output}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Sections