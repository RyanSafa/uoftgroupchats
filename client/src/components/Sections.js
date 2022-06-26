import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ChatLink from './ChatLink'

const Sections = (props) => {
    const { groupchats, lectures } = props

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
            {lec}
        </ListGroup.Item>
    })
    const links_output = lectures.map((lec) => {
        // console.log(chats.lec)
        let output = 'No Groupchats found!'
        if (`${lec}` in chats) {
            output = chats[`${lec}`].map((chat) => <ChatLink key={chat.id} link={chat.link} type={chat.type} />)
            // console.log(output)
        }
        return <Tab.Pane key={`#${lec}`} eventKey={`#${lec}`}>
            <Row xs={1} md="auto" className="justify-content-center">
                {output}
            </Row>
        </Tab.Pane>
    })

    return (
        <Container className='mt-2'>
            <Card className="text-center" bg='primary-blue' text='white'>
                <Card.Body>
                    <Card.Title>Find your groupchat!</Card.Title>
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#Common">
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