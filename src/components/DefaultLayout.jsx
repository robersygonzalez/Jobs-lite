import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserNotifications, getUserProfile } from '../pages/apis/users';
import { message, Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alertSlice';
import { setReloadNotifications } from '../redux/notificationsSlice';



const DefaultLayout = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { reloadNotifications, unreadNotifications } = useSelector(state => state.notifications)
    const [collapsed, setCollapsed] = useState(false);
    const [menuToRender, setMenuToRender] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userMenu = [
        {
            title: "Home",
            onclick: () => navigate("/"),
            icon: <i className="ri-home-7-line"></i>,
            path: "/"
        },
        {
            title: "Applied Jobs",
            onclick: () => navigate("/applied-jobs"),
            icon: <i className="ri-file-list-3-line"></i>,
            path: "/applied-jobs"
        },
        {
            title: "Posted Jobs",
            onclick: () => navigate("/posted-jobs"),
            icon: <i className="ri-file-list-2-line"></i>,
            path: "/posted-jobs"
        },
        {
            title: "Profile",
            onclick: () => navigate(`/profile/${user.id}`),
            icon: <i className="ri-user-2-line"></i>,
            path: `/profile/${user.id}`
        },
        {
            title: "Logout",
            onclick: () => {
                localStorage.removeItem("user");
                navigate("/login")
            },
            icon: <i className="ri-logout-box-r-line"></i>,
            path: "/login"
        },


    ]
    const adminMenu = [
        {
            title: "Home",
            onclick: () => navigate("/"),
            icon: <i className="ri-home-7-line"></i>,
            path: "/"
        },
        {
            title: "Applications",
            onclick: () => navigate("/admin/applications"),
            icon: <i className="ri-file-list-3-line"></i>,
            path: "/admin/applications"
        },
        {
            title: "Jobs",
            onclick: () => navigate("/admin/jobs"),
            icon: <i className="ri-file-list-2-line"></i>,
            path: "/admin/jobs"
        },
        {
            title: "Users",
            onclick: () => navigate("/admin/users"),
            icon: <i className="ri-user-2-line"></i>,
            path: "/admin/users"
        },
        {
            title: "Logout",
            onclick: () => {
                localStorage.removeItem("user");
                navigate("/login")
            },
            icon: <i className="ri-logout-box-r-line"></i>,
            path: "/login"
        },
    ]

    const getData = async () => {
        try {
            dispatch(ShowLoading())
            const user = JSON.parse(localStorage.getItem("user"))
            const response = await getUserProfile(user.id)
            dispatch(HideLoading())
            if (response.success) {
                if (response.data.isAdmin) {
                    setMenuToRender(adminMenu)
                } else {
                    setMenuToRender(userMenu)
                }

            } else {
                localStorage.removeItem("user");
                navigate("/login")
            }

        }
        catch (error) {
            message.error(error.message)
        }
    }

    const loadNotifications = async () => {
        try {
            dispatch(ShowLoading())
            await getUserNotifications()
            dispatch(HideLoading())
            dispatch(setReloadNotifications(false))

        } catch (error) {
            message.error(error.message)
            dispatch(HideLoading())
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (reloadNotifications) {
            loadNotifications()
        }
    }, [reloadNotifications])

    return (
        <div className="layout">
            <div className="sidebar ">
                <div
                    className="menu"
                    style={{
                        width: collapsed ? "40px" : "160px",
                    }}
                >
                    {menuToRender.map((item, index) => {
                        const isActive = window.location.pathname === item.path;
                        return (
                            <div key={index} className={`menu-item ${isActive && 'active-menu-item'}`} onClick={item.onclick}>
                                {item.icon}
                                {!collapsed && <span>{item.title}</span>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="content">
                <div className="header justify-content-between d-flex">
                    <div className='d-flex items-center gap-2'>
                        {collapsed && <i className="ri-menu-2-fill" onClick={() => setCollapsed(!collapsed)}></i>}
                        {!collapsed && <i className="ri-close-line" onClick={() => setCollapsed(!collapsed)}></i>}
                        <span className="logo">JOBS - LITE</span>
                    </div>

                    <div className="d-flex gap-1 align-items-center">

                        <Badge
                            count={unreadNotifications?.length || 0}
                            className='me-5'
                            onClick={() => navigate("/notifications")}
                        >
                            <i className="ri-notification-line"></i>
                        </Badge>
                        <span>{user?.name}</span>
                        <i className="ri-shield-user-line"></i>
                    </div>
                </div>
                <div className="body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout
