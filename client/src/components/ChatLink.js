import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import whatsappLogo from "../logos/WhatsApp_logo.webp";
import discordLogo from "../logos/discord-logo.png"
import instaLogo from "../logos/instagram_logo.webp"
import wechatLogo from "../logos/wechat_logo.png"

const ChatLink = (props) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(props.updatedAt)

    const logos = {
        Whatsapp: whatsappLogo,
        Discord: discordLogo,
        Instagram: instaLogo,
        WeChat: wechatLogo
    }

    return (
        <Col>
            <Card border="secondary-blue" style={{ width: '18rem' }} text={props.type} className='my-2'>
                <Card.Header as='h5'>{props.type} <img
                    alt=""
                    src={logos[props.type]}
                    width="25"
                    height="25"
                    className="d-inline-block align-top"
                /></Card.Header>
                <Card.Body>
                    <Card.Title> <a href={`${props.link}`}>{props.link}</a></Card.Title>
                    <Button variant="outline-secondary-blue" className='mx-3 mt-2' onClick={() => { navigator.clipboard.writeText(props.link) }}>COPY</Button>
                    <Button variant="outline-secondary-red" className='mx-3 mt-2'>REPORT</Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Created on {monthNames[date.getUTCMonth()]} {date.getDate()}, {date.getFullYear()}
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default ChatLink