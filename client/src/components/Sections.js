import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ChatLink from './ChatLink'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

const Sections = (props) => {
    const { groupchats, lectures, handleNewFormShow } = props

    const chats = {}
    groupchats.forEach((chat) => {
        const lectureCode = chat.lecture
        const my_obj = {
            id: chat.id,
            type: chat.type,
            link: chat.link,
            updatedAt: chat.updatedAt,
        }
        if (!(`${lectureCode}` in chats)) {
            chats[`${lectureCode}`] = [my_obj]
        } else {
            chats[`${lectureCode}`].push(my_obj)
        }
    })

    const list_output = lectures.map((lec) => {
        return <ListGroup.Item variant='secondary-blue' key={`#${lec}`} action href={`#${lec}`}>
            {lec} <Badge bg="primary-blue">{chats[`${lec}`] ? chats[`${lec}`].length : 0}</Badge>
        </ListGroup.Item>
    })
    const links_output = lectures.map((lec) => {
        let output = <h3>No groupchats found for this lecture section. Choose another lecture section or make a new groupchat!</h3>
        if (`${lec}` in chats) {
            output = chats[`${lec}`].map((chat) => <ChatLink key={chat.id} link={chat.link} type={chat.type} updatedAt={chat.updatedAt} />)
        }
        return <Tab.Pane key={`#${lec}`} eventKey={`#${lec}`}>
            <Row xs="auto" md="auto" className="justify-content-left">
                {output}
            </Row>
        </Tab.Pane>
    })

    return (
        <>
            <Container className='mt-2' fluid>
                <Card className="text-center" bg='primary-blue' text='white'>
                    <Card.Body>
                        <Card.Title>Find your groupchat! Or add your own!</Card.Title>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#Common">
                            <Row>
                                <Col sm={4}>
                                    <ListGroup>
                                        {list_output}
                                    </ListGroup>
                                </Col>
                                <Col sm={8}>
                                    <div className="d-grid gap-2">
                                        <Button variant="secondary-blue" size="lg" onClick={handleNewFormShow} className="fw-bold">Add Groupchat!</Button>
                                    </div>
                                    <Tab.Content>
                                        {links_output}
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Sections