import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alertSlice';
import { setReloadNotifications } from '../redux/notificationsSlice';
import PageTitle from '../components/PageTitle';
import { Tabs, Alert, message } from 'antd';
import { changeNotificationStatus } from './apis/users';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
    const { readNotifications, unreadNotifications } = useSelector(state => state.notifications);
    const navigate = useNavigate();
    const items = [
        {
            key: '1',
            label: 'Unread',
            children: unreadNotifications.map((notification, index) => (
                <Alert
                    key={index}
                    message={
                        <div className='d-flex justify-content-between align-items-center'>
                            <div
                                className='d-flex flex-column'
                                onClick={() => navigate(notification.onClick)}
                            >
                                <span>{notification.title}</span>
                                <span>{notification.createdOn}</span>
                            </div>
                            <span
                                className='underline'
                                onClick={() => changeStatus(notification.id, 'read')}
                            >Mark as read</span>
                        </div>
                    }
                    type="info" />
            ))
        },
        {
            key: '2',
            label: 'Read',
            children: readNotifications.map((notification, index) => (
                <Alert
                    key={index}
                    message={
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex flex-column'>
                                <span>{notification.title}</span>
                                <span>{notification.createdOn}</span>
                            </div>
                            <span
                                className='underline'
                                onClick={() => changeStatus(notification.id, 'unread')}
                            >Mark as unread</span>
                        </div>
                    }
                    type="info" />
            ))
        }
    ]
    const dispatch = useDispatch();
    const changeStatus = async (id, status) => {
        try {
            dispatch(ShowLoading());
            const response = await changeNotificationStatus(id, status);
            if (response.success) {
                message.success(response.message);
                dispatch(setReloadNotifications(true));
            }
        } catch (error) {
            dispatch(HideLoading());
            console.log(error);
        }
    }
    return (
        <div>
            <PageTitle title="Notifications" />
            <Tabs defaultActiveKey="1" items={items} />

        </div>
    )
}

export default Notifications
