import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { deleteJob, changeJobStatusFromAdmin, getAllJobs } from "../apis/jobs";
import { message, Table } from "antd";


const AllJobs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const deleteSelectJob = async (jobId) => {
        try {
            dispatch(ShowLoading())
            const response = await deleteJob(jobId)
            if (response.success) {
                setData(response.data)
                getData()
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    const changeStatus = async (jobData, status) => {
        try {
            dispatch(ShowLoading())
            const response = await changeJobStatusFromAdmin({ ...jobData, status })
            if (response.success) {
                setData(response.data)
                getData()
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',

        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Posted On',
            dataIndex: 'postedOn',
            key: 'postedOn',
        },
        {
            title: 'Last Date To Apply',
            dataIndex: 'lastDateToApply',
            key: 'lastDateToApply',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div className="d-flex align-items-center gap-2">
                    <i
                        className="ri-delete-bin-line"
                        onClick={() => deleteSelectJob(record.id)}
                    ></i>
                    {/* <i
                        className="ri-pencil-line"
                        onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
                    ></i> */}
                    {
                        record.status === "approved" && (
                            <span
                                className="underline"
                                onClick={() => changeStatus(record, "rejected")}
                            >
                                Reject
                            </span>)
                    }
                    {
                        (record.status === "pending" || record.status === 'rejected') && (
                            <span
                                className="underline"

                                onClick={() => changeStatus(record, "approved")}
                            >
                                Approve
                            </span>)
                    }
                </div>
            )
        }

    ]
    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await getAllJobs()
            if (response.success) {
                setData(response.data)
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
            <div className="d-flex justify-content-between">
                <PageTitle title="All Jobs" />
                <button className="primary-outlined-btn" onClick={() => navigate('/posted-jobs/new')}>
                    NEW JOB
                </button>
            </div>

            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default AllJobs
