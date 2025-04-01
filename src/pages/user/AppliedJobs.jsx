import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { getApplicationsByUserId, deleteJob } from "../apis/jobs";
import { message, Table } from "antd";


const AppliedJobs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);


    const columns = [
        {
            title: 'Job',
            dataIndex: 'jobTitle',
            key: 'jobTitle',

        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',

        },
        {
            title: 'Applied On',
            dataIndex: 'appliedOn',
            key: 'appliedOn',
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },


    ]
    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const user = JSON.parse(localStorage.getItem("user"))
            const response = await getApplicationsByUserId(user.id)
            if (response.success) {
                setData(response.data)
                //console.log(response.data)
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
                <PageTitle title="Applied Jobs" />

            </div>

            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default AppliedJobs





