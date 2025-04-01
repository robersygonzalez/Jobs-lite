import React from 'react'
import '@ant-design/v5-patch-for-react-19';
import { Form, message } from 'antd'
import { Link } from 'react-router-dom'
import { RegisterUser } from './apis/authentication'
import { useDispatch } from 'react-redux'
import { ShowLoading, HideLoading } from '../redux/alertSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading())
            const response = await RegisterUser(values)
            dispatch(HideLoading())
            if (response.success) {
                message.success(response.message)
                navigate('/login')
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    return (
        <div className='h-screen d-flex justify-content-center align-items-center bg-primary'>
            <div className='bg-white p-4 w-400'>
                <h4>
                    JOBSLITE - REGISTER
                </h4>
                <div className='divider'></div>
                <Form
                    layout='vertical'
                    onFinish={onFinish}>
                    <Form.Item
                        name='name'
                        label="Name">
                        <input type='text' className='form-control' />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label="Email">
                        <input type='text' className='form-control' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label="Password">
                        <input type='password' className='form-control' />
                    </Form.Item>
                    <button className='primary-contained-btn w-100 mt-2' type='submit'>REGISTER</button>
                    <Link to='/login' className='d-block mt-2'>Already a member? Click here to Login</Link>
                </Form>
            </div>
        </div>
    )
}

export default Register

