import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import { getPostedJobsByUserId, deleteJob, getApplicationsByJobId } from "../../apis/jobs";
import { message, Table } from "antd";
import AppliedCandidates from "./AppliedCandidates";


const PostedJobs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [showAppliedCandidates, setShowAppliedCandidates] = useState(false);
    const [appliedCandidates, setAppliedCandidates] = useState([]);

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

    const getAppliedCandidates = async (id) => {
        try {
            dispatch(ShowLoading())
            const response = await getApplicationsByJobId(id)
            if (response.success) {
                setAppliedCandidates(response.data)
                if (!showAppliedCandidates) {
                    setShowAppliedCandidates(true)
                }
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
                <div className="d-flex gap-3 align-items-center">
                    <span className="underline" onClick={() => getAppliedCandidates(record.id)}>
                        Candidates
                    </span>
                    <i
                        className="ri-delete-bin-line"
                        onClick={() => deleteSelectJob(record.id)}
                    ></i>
                    <i
                        className="ri-pencil-line"
                        onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
                    ></i>
                </div>
            )
        }

    ]
    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const user = JSON.parse(localStorage.getItem("user"))
            const response = await getPostedJobsByUserId(user.id)
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
                <PageTitle title="Posted Jobs" />
                <button className="primary-outlined-btn" onClick={() => navigate('/posted-jobs/new')}>
                    NEW JOB
                </button>
            </div>

            <Table columns={columns} dataSource={data} />

            {showAppliedCandidates && <AppliedCandidates
                showAppliedCandidates={showAppliedCandidates}
                setShowAppliedCandidates={setShowAppliedCandidates}
                appliedCandidates={appliedCandidates}
                reloadData={getAppliedCandidates}
            />}
        </div>
    )
}

export default PostedJobs
