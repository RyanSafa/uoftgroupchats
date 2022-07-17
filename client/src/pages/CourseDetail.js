import ReportModal from "../components/ReportModal";
import NewChatModal from "../components/NewChatModal";
import LoadingSpinner from "../components/LoadingSpinner";
import Sections from "../components/Sections";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const CourseDetail = (props) => {
  const params = useParams();
  const { code } = params;
  const [course, setCourse] = useState({});
  const [courseFormOpen, setCourseFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/${code}`);
      const data = await response.json();
      if (response.ok) {
        setCourse(data);
        setIsLoading(false);
      } else {
        throw new Error(data.message, { cause: data.status });
      }
    };

    fetchCourse().catch((error) => {
      setIsLoading(false);
      setHttpError({ message: error.message, status: error.cause });
    });
  }, [code]);

  if (isLoading) {
    return;
  }
  if (httpError) {
    return (
      <div>
        <p>Oops! {httpError.status} Error</p>
        <p>{httpError.message}</p>
      </div>
    );
  }
};

export default CourseDetail;
