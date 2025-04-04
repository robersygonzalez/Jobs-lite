import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { ShowLoading, HideLoading } from '../redux/alertSlice';
import { getAllJobs } from './apis/jobs';
import { message } from 'antd';
import PageTitle from '../components/PageTitle';
import { Row, Col } from 'antd';
import Filters from '../components/Filters';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        location: '',
        industry: '',
        experience: '',
    })

    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await getAllJobs(filters)
            if (response.success) {
                const approvedJobs = response.data.filter(job => job.status === 'approved')
                setData(approvedJobs)

            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Filters
                filters={filters}
                setFilters={setFilters}
                setData={setData}
            />
            <Row gutter={[15, 15]} className='mt-3'>
                {data.map((job, index) => (
                    <Col key={index} span={8}>
                        <div className="job-card">
                            <h3>
                                {job.title}
                            </h3>
                            <div className="light-divider"></div>
                            <div className='d-flex flex-column gap-1'>

                                <div className='d-flex justify-content-between mt-1'>
                                    <span>
                                        <strong>Company</strong>
                                    </span>
                                    <span>
                                        {job.company}
                                    </span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>
                                        <strong>Location</strong>
                                    </span>
                                    <span>
                                        {job.location}
                                    </span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>
                                        <strong>Salary</strong>
                                    </span>
                                    <span>
                                        {job.salary}
                                    </span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>
                                        <strong>Posted On</strong>
                                    </span>
                                    <span>
                                        {job.postedOn}
                                    </span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>
                                        <strong>Last Date to Apply </strong>
                                    </span>
                                    <span>
                                        {job.lastDateToApply}
                                    </span>
                                </div>
                                <button className='primary-outlined-btn w-100 mt-2'
                                    onClick={() => navigate(`/job-description/${job.id}`)}>
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Home
