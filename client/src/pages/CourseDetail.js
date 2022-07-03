import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Sections from '../components/Sections'
import NewChatModal from '../components/NewChatModal'
import Alert from 'react-bootstrap/Alert'
import ReportModal from '../components/ReportModal'

const CourseDetail = (props) => {
    const params = useParams()
    const [course, setCourse] = useState('COURSE NOT FOUND')
    const { code } = params
    const [courseFound, setCourseFound] = useState(false)
    const sections_list = course === 'COURSE NOT FOUND' ? [] : ['Common', ...course.lectures]
    const groupchats = course === 'COURSE NOT FOUND' ? [] : [...course.Groupchats]
    const form_options = sections_list.map((lec) => <option key={lec}>{lec}</option>)

    // New Groupchat Form Modal States //
    const [showNewForm, setShowNewForm] = useState(false);

    const handleNewFormClose = () => setShowNewForm(false);
    const handleNewFormShow = () => {
        setShowAlert(false)
        setShowNewForm(true)
    };

    // Groupchat Creation Success msg State
    const [showAlert, setShowAlert] = useState(false)

    // Groupchat Creation Error msg State
    const [showError, setShowError] = useState(false)
    // // // // // // // // // // // //

    // GC Report Form Modal States // 
    const [showReportForm, setShowReportForm] = useState(false);
    const [reportedGc, setReportedGc] = useState({ id: null, type: null, link: null, updatedAt: null })

    const handleReportFormClose = () => setShowReportForm(false);
    const handleReportFormShow = (groupchat) => {
        setReportedGc(groupchat)
        setShowReported(false)
        setShowReportForm(true)
    };

    // Report Success Msg
    const [showReported, setShowReported] = useState(false)
    // Report Failure Msg
    const [showReportedError, setShowReportedError] = useState(false)
    // // // // // // // // // // // //

    useEffect(() => {
        const fetchData = async (code) => {
            const response = await fetch(`/api/courses/${code}`)
            if (response.ok) {
                setCourseFound(true)
                const data = await response.json()
                setCourse(data)
            } else {
                setCourseFound(false)
            }
        }

        fetchData(code)
    }, [code, showAlert, showReported])

    if (!courseFound) {
        return <Card className="p-2 align-items-center rounded" bg="secondary-red" text="white">
            <h1 className="display-3 fw-bold">Course does not exist.</h1>
        </Card>
    }

    return (
        <>
            {showAlert && <Alert variant="WhatsApp" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>Woohoo! Groupchat Made</Alert.Heading>
            </Alert>}

            {showError && <Alert variant="secondary-red" onClose={() => setShowError(false)} dismissible>
                <Alert.Heading>Oh no! Looks like there was a problem making your groupchat.</Alert.Heading>
            </Alert>}

            {showReported && <Alert variant="WhatsApp" onClose={() => setShowReported(false)} dismissible>
                <Alert.Heading>Reported!</Alert.Heading>
            </Alert>}

            {showReportedError && <Alert variant="secondary-red" onClose={() => setShowReportedError(false)} dismissible>
                <Alert.Heading>Oh no! Looks like there was a problem making sending your report.</Alert.Heading>
            </Alert>}

            <NewChatModal
                showNewForm={showNewForm}
                handleNewFormClose={handleNewFormClose}
                form_options={form_options}
                courseId={course.id}
                setShowAlert={setShowAlert}
                setShowError={setShowError}
            />

            <ReportModal
                showReportForm={showReportForm}
                handleReportFormClose={handleReportFormClose}
                gc={reportedGc}
                setShowReported={setShowReported}
                setShowReportedError={setShowReportedError}
            />

            <Card className="p-2 align-items-center rounded" bg="secondary-blue" text="white">
                <h1 className="display-3 fw-bold">{course.code}</h1>
                <h2 className="display-6">{course.title}</h2>
            </Card>
            <Sections lectures={sections_list} groupchats={groupchats} handleNewFormShow={handleNewFormShow} handleReportFormShow={handleReportFormShow} />
        </>
    )
}

export default CourseDetail