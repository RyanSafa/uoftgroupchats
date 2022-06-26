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
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'

const Sections = (props) => {
    const { groupchats, lectures } = props
    const [showNewForm, setShowNewForm] = useState(false);

    const handleNewFormClose = () => setShowNewForm(false);
    const handleNewFormShow = () => setShowNewForm(true);

    const chats = {}
    groupchats.map((chat) => {
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
    // console.log(groupchats)
    // console.log(chats)

    const list_output = lectures.map((lec) => {
        return <ListGroup.Item variant='secondary-blue' key={`#${lec}`} action href={`#${lec}`}>
            {lec} <Badge bg="primary-blue">{chats[`${lec}`] ? chats[`${lec}`].length : 0}</Badge>
        </ListGroup.Item>
    })
    const links_output = lectures.map((lec) => {
        // console.log(chats.lec)
        let output = <h3>No groupchats found. Make one!</h3>
        if (`${lec}` in chats) {
            output = chats[`${lec}`].map((chat) => <ChatLink key={chat.id} link={chat.link} type={chat.type} updatedAt={chat.updatedAt} />)
            // console.log(output)
        }
        return <Tab.Pane key={`#${lec}`} eventKey={`#${lec}`}>
            <Row xs="auto" md="auto" className="justify-content-left">
                {output}
            </Row>
        </Tab.Pane>
    })

    const form_options = lectures.map((lec) => <option>{lec}</option>)

    return (
        <>
            <Modal show={showNewForm} onHide={handleNewFormClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new groupchat!</Modal.Title>
                </Modal.Header>
                <Container>
                    <Form>
                        <Form.Group className="mb-3" controlId="formSection">
                            <Form.Label>Lecture Section</Form.Label>
                            <Form.Select>
                                {form_options}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formChatLink">
                            <Form.Label>GroupChat Link</Form.Label>
                            <Form.Control type="url" placeholder="https://example.com" />
                        </Form.Group>
                    </Form>
                </Container>
                <Modal.Footer>
                    <Button variant="secondary-red" onClick={handleNewFormClose}>
                        Close
                    </Button>
                    <Button variant="secondary-blue" onClick={handleNewFormClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
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