import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { getAllUsers, updateUserProfile } from "../apis/users";
import { message, Table } from "antd";



const AllUsers = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);


    const changeStatus = async (id, status) => {
        try {
            dispatch(ShowLoading())
            const response = await updateUserProfile({ id, status })
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User Id',
            dataIndex: 'id',
            key: 'id',
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

                    {
                        record.status === "approved" && (
                            <span
                                className="underline"
                                onClick={() => changeStatus(record.id, "rejected")}
                            >
                                Reject
                            </span>)
                    }
                    {
                        (record.status === "pending" || record.status === 'rejected') && (
                            <span
                                className="underline"

                                onClick={() => changeStatus(record.id, "approved")}
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
            const response = await getAllUsers()
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
                <PageTitle title="All Users" />

            </div>

            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default AllUsers
