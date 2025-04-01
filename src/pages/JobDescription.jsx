import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alertSlice';
import { useState, useEffect } from 'react';
import { applyJobPost, getJobById } from './apis/jobs';
import { Col, message, Row } from 'antd';
import PageTitle from '../components/PageTitle';
import { getApplicationsByJobId } from './apis/jobs';

const JobDescription = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [jobData, setJobData] = useState(null)
    const [showApplyButton, setShowApplyButton] = useState(true)
    const [alreadyApplied, setAlreadyApplied] = useState(false)
    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await getJobById(params.id)

            if (response.data.postedByUserId === JSON.parse(localStorage.getItem('user')).id) {
                setShowApplyButton(false)
            }

            const applicationsResponse = await getApplicationsByJobId(params.id)


            if (applicationsResponse.success && applicationsResponse.data.filter((item) => item.userId === JSON.parse(localStorage.getItem('user')).id).length > 0) {
                setShowApplyButton(false)
                setAlreadyApplied(true)
            }
            dispatch(HideLoading())

            if (response.success) {
                setJobData(response.data)
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    const applyNow = async () => {
        try {
            dispatch(ShowLoading())
            const response = await applyJobPost(jobData)
            dispatch(HideLoading())
            if (response.success) {
                message.success(response.message)
                navigate('/')
            } else {
                console.log(response.message)
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
            dispatch(HideLoading())
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        jobData && <div>
            <PageTitle title={jobData.title} />
            <Row>
                <Col span={18}>
                    <div className='d-flex flex-column gap-1'>
                        <div className='d-flex justify-content-between mt-1'>
                            <span>
                                <strong>Company</strong>
                            </span>
                            <span>
                                {jobData.company}
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span>
                                <strong>Location</strong>
                            </span>
                            <span>
                                {jobData.location.toUpperCase()}
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span>
                                <strong>Salary</strong>
                            </span>
                            <span>
                                {jobData.salary}
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span>
                                <strong>Experience</strong>
                            </span>
                            <span>
                                {jobData.experience} years
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span>
                                <strong>Notice Period</strong>
                            </span>
                            <span>
                                {jobData.noticePeriod}
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span>
                                <strong>Job Type</strong>
                            </span>
                            <span>
                                {jobData.jobtype}
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span>
                                <strong>Industry</strong>
                            </span>
                            <span>
                                {jobData.industry.toUpperCase()}
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span>
                                <strong>Posted On</strong>
                            </span>
                            <span>
                                {jobData.postedOn}
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span>
                                <strong>Last Date to Apply </strong>
                            </span>
                            <span>
                                {jobData.lastDateToApply}
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span>
                                <strong>Poster By </strong>
                            </span>
                            <span>
                                {jobData.posterByUserName}
                            </span>
                        </div>

                    </div>
                    <h5 className='underline uppercase my-3'>
                        Job Description
                    </h5>
                    <span className='pt-2'> {jobData.jobDescription}</span>
                    {alreadyApplied && <div className='already-applied'>
                        <span>
                            You have already applied for this job. You can view
                            your application status in the applied jobs section.
                        </span>
                    </div>}
                    <div className='d-flex gap-2 my-3 justify-content-end'>
                        <button className="primary-outlined-btn" onClick={() => navigate('/')}>
                            CANCEL
                        </button>
                        {showApplyButton && <button className='primary-contained-btn' onClick={() => applyNow()}>
                            APPLY NOW
                        </button>}
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default JobDescription
