import { doc, getDoc, updateDoc, getDocs, query, collection, onSnapshot } from "firebase/firestore"
import { fireDB } from "../../firebaseConfig"
import store from "../../redux/store"
import { setReadNotifications, setUnreadNotifications } from "../../redux/notificationsSlice"

export const updateUserProfile = async (payload) => {
    let user = null
    if (payload.id === undefined) {
        user = JSON.parse(localStorage.getItem("user"));
    } else {
        user = payload
    }

    if (payload.portfolio === undefined) {
        payload.portfolio = ""
    }
    if (payload.carrierObjetive === undefined) {
        payload.carrierObjetive = ""
    }
    if (payload.address === undefined) {
        payload.address = ""
    }
    if (payload.education === undefined) {
        payload.education = []
    }
    if (payload.skills === undefined) {
        payload.skills = []
    }
    if (payload.experiences === undefined) {
        payload.experiences = []
    }
    if (payload.projects === undefined) {
        payload.projects = []
    }

    try {
        await updateDoc(doc(fireDB, "users", user.id), payload);
        return {
            success: true,
            message: "Profile updated successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: `Error updating profile ${error.message}`
        }
    }
}

export const getUserProfile = async (id) => {

    try {
        const docRef = doc(fireDB, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                success: true,
                data: docSnap.data()
            }
        } else {
            return {
                success: false,
                message: "No such user!"
            }
        }
    } catch (error) {
        return {
            success: false,
            message: `Error getting document: ${error.message}`
        }
    }
}

export const getAllUsers = async () => {
    try {
        const users = []
        const qry = query(collection(fireDB, "users"));
        const querySnapshot = await getDocs(qry);
        querySnapshot.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id, key: doc.id });
        });
        return {
            success: true,
            data: users
        }
    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const getUserNotifications = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {

        const q = query(collection(fireDB, "users", user.id, "notifications"));
        onSnapshot(q, (querySnapshot) => {
            const notifications = []
            querySnapshot.forEach((doc) => {
                notifications.push({ ...doc.data(), id: doc.id });
            });
            const readNotifications = notifications.filter(notification => notification.status === "read")
            const unreadNotifications = notifications.filter(notification => notification.status === "unread")

            store.dispatch(setReadNotifications(readNotifications))
            store.dispatch(setUnreadNotifications(unreadNotifications))
        });



        return {
            success: true,
        }

    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const changeNotificationStatus = async (id, status) => {

    const user = JSON.parse(localStorage.getItem("user"));
    try {
        await updateDoc(doc(fireDB, "users", user.id, "notifications", id), { status });
        return {
            success: true,
            message: "Notification status updated successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: `Error updating notification status ${error.message}`
        }
    }
}