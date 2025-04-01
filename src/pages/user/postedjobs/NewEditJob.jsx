import PageTitle from '../../../components/PageTitle';
import { Form, Row, Input, Col, Select, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/alertSlice';
import { addNewJobPost, editJobDetails, getJobById } from '../../apis/jobs';
import { useEffect, useState } from 'react';


const NewEditJob = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [jobData, setJobData] = useState(null)
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading())
            let response = null
            if (params.id) {
                response = await editJobDetails({ ...values, id: params.id })
            } else {
                response = await addNewJobPost(values)
            }
            if (response.success) {
                message.success(response.message)
                navigate('/posted-jobs')
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await getJobById(params.id)
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
    useEffect(() => {
        if (params.id) {
            getData()
        } else {
            setJobData({})
        }
    }, [])
    return (
        <div>
            <PageTitle title={params.id ? 'Edit Job' : 'Add new Job Post'} />
            {jobData && <Form
                layout='vertical'
                onFinish={onFinish}
                initialValues={jobData}
            >
                <Row gutter={[10, 10]}>
                    <Col span={12}>
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'required!' }]}>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Industry" name="industry" rules={[{ required: true, message: 'required!' }]}>
                            <Select size='large' name="" id=''>
                                <Select.Option value="">Select</Select.Option>
                                <Select.Option value="it">IT</Select.Option>
                                <Select.Option value="finance">Finance</Select.Option>
                                <Select.Option value="marketing">Marketing</Select.Option>
                                <Select.Option value="realestate">Real State</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Location" name="location" rules={[{ required: true, message: 'required!' }]}>
                            <Select size='large' name="" id=''>
                                <Select.Option value="">Select</Select.Option>
                                <Select.Option value="India">India</Select.Option>
                                <Select.Option value="USA">USA</Select.Option>
                                <Select.Option value="UK">UK</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Company Name" name="company" rules={[{ required: true, message: 'required!' }]}>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Salary" name="salary" rules={[{ required: true, message: 'required!' }]}>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Job Type" name="jobtype" rules={[{ required: true, message: 'required!' }]}>
                            <Select size='large' name="" id='' >
                                <Select.Option value=""  >Select</Select.Option>
                                <Select.Option value="fulltime">Full Time</Select.Option>
                                <Select.Option value="parttime">Part Time</Select.Option>
                                <Select.Option value="contract">Contract</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Last Date To apply" name="lastDateToApply" rules={[{ required: true, message: 'required!' }]}>
                            <Input type='date' />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Experience" name="experience" rules={[{ required: true, message: 'required!' }]}>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Notice Period" name="noticePeriod" rules={[{ required: true, message: 'required!' }]}>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Job Description" name="jobDescription" rules={[{ required: true, message: 'required!' }]}>
                            <Input.TextArea />
                        </Form.Item>
                    </Col>

                </Row>
                <div className='d-flex justify-content-end gap-2'>
                    <button className="primary-outlined-btn" onClick={() => navigate('/posted-jobs')}>Cancel</button>
                    <button className="primary-contained-btn" type='submit'>Save</button>
                </div>
            </Form>}
        </div>
    )
}

export default NewEditJob
