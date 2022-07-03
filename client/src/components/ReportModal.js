import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ChatLink from './ChatLink'
import Form from 'react-bootstrap/Form'

const ReportModal = (props) => {
    const { handleReportFormClose, showReportForm, gc } = props
    const inputReason = useRef()
    const form_options = [
        "Dead or expired link.",
        "Malicious or irrelevant link.",
        "Duplicate link.",
    ].map((reason) => <option key={reason}>{reason}</option>)

    const reportHandler = async (event) => {
        event.preventDefault()
        const request_obj = {
            reason: inputReason.current.value,
            groupchatId: gc.id
        }
        const response = await fetch('/api/reports', {
            method: 'POST',
            body: JSON.stringify(request_obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            handleReportFormClose()
            props.setShowReported(true)
        } else {
            console.log(response)
            console.log('OOPS')
            handleReportFormClose()
            props.setShowReportedError(true)
        }
    }

    return (
        <Modal show={showReportForm} onHide={handleReportFormClose}>
            <Modal.Header closeButton>
                <Modal.Title>Report this groupchat?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ChatLink key={gc.id} link={gc.link} type={gc.type} updatedAt={gc.updatedAt} id={gc.id} inSections={false} ></ChatLink>

                <Form onSubmit={reportHandler}>
                    <Form.Group className="my-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Why would you like to report this groupchat?</Form.Label>
                        <Form.Select ref={inputReason} >
                            {form_options}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="secondary-red" onClick={handleReportFormClose} className='mb-4 mx-1' >
                        Close
                    </Button>
                    <Button variant="primary-blue" type='Submit' className='mb-4 mx-1' >
                        Report
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ReportModal