import React from 'react'
import { message, Modal, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ShowLoading, HideLoading } from '../../../redux/alertSlice'
import { changeApplicationStatus } from '../../apis/jobs'



const AppliedCandidates = ({
    showAppliedCandidates,
    setShowAppliedCandidates,
    appliedCandidates,
    reloadData

}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const changeStatus = async (status, applicationData) => {
        try {
            dispatch(ShowLoading())
            const response = await changeApplicationStatus({ ...applicationData, status })
            dispatch(HideLoading())
            if (response.success) {
                message.success(response.message)
                reloadData(applicationData.jobId)
            }
            else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'userName',
            key: 'userName',
            render: (text, record) => {
                return (
                    <span className='underline' onClick={() => navigate(`/profile/${record.userId}`)}>
                        {text}
                    </span>
                )
            }

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
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
            render: (text, record) => {
                return (
                    <div>
                        {record.status === "pending" && (
                            <>
                                <span className='underline'
                                    onClick={() => changeStatus("approved", record)}>
                                    Approve
                                </span>
                                <span className='underline ms-2'
                                    onClick={() => changeStatus("rejected", record)}>
                                    Reject
                                </span>
                            </>
                        )}


                    </div>
                )
            }
        }

    ]
    return (
        <div>
            <Modal
                title="Applied Candidates"
                visible={showAppliedCandidates}
                onCancel={() => setShowAppliedCandidates(false)}
                footer={null}
                width={1000}
            >
                <Table
                    columns={columns}
                    dataSource={appliedCandidates}
                    rowKey='id'
                />
            </Modal>
        </div>
    )
}

export default AppliedCandidates
