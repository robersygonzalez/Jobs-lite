import PageTitle from "../../../components/PageTitle";
import { Tabs, Form, message } from 'antd';
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import { updateUserProfile, getUserProfile } from "../../apis/users";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Profile = () => {
    const dispatch = useDispatch();
    const params = useParams()
    const navigate = useNavigate()
    const loggedInUser = JSON.parse(localStorage.getItem('user'))
    const [userData, setUserData] = useState(null)
    const onfinish = async (values) => {
        try {
            dispatch(ShowLoading())
            const response = await updateUserProfile(values)
            dispatch(HideLoading())
            if (response.success) {
                message.success(response.message)
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    const items = [
        {
            key: '1',
            label: 'Personal Info',
            children: <PersonalInfo />
        },
        {
            key: '2',
            label: 'Education',
            children: <Education />
        },
        {
            key: '3',
            label: 'Experience',
            children: <Experience />
        }
    ]

    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await getUserProfile(params.id)
            dispatch(HideLoading())
            if (response.success) {
                setUserData(response.data)
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    useEffect(() => {

        getData()

    }, [])
    return (
        <div>
            <PageTitle title="Profile" />
            {userData && <Form layout="vertical" onFinish={onfinish} initialValues={userData}>
                <Tabs defaultActiveKey="1"
                    items={items}
                />

                {/* { <Tabs defaultActiveKey="1">
                    <TabPane tab="Personal Info" key="1"><PersonalInfo /> </TabPane>
                    <TabPane tab="Education" key="2"><Education /> </TabPane>
                    <TabPane tab="Experience" key="3"><Experience /> </TabPane>
                </Tabs> } */}
                <div className="d-flex justify-content-end gap-2">
                    <button
                        className="primary-outlined-btn"
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                    {params.id === loggedInUser.id &&

                        <button
                            className="primary-contained-btn"
                            type="submit"
                        >
                            Save
                        </button>
                    }
                </div>
            </Form>}
        </div>
    )
}

export default Profile
