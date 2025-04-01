import { collection, addDoc, getDoc, getDocs, query, where, updateDoc, doc, orderBy } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig"
import moment from "moment";

export const addNewJobPost = async (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
        await addDoc(collection(fireDB, "jobs"), {
            ...payload,
            status: "pending",
            postedByUserId: user.id,
            posterByUserName: user.name,
            postedOn: moment().format("DD-MM-YYYY HH:mm: A")
        });
        // Send notification to admin
        await addDoc(collection(fireDB, 'users', '5ePF1dx3u7OUCullL6rk', 'notifications'), {
            title: `New job post request from ${user.name}`,
            onClick: '/admin/jobs',
            createdAt: moment().format("DD-MM-YYYY HH:mm: A"),
            status: 'unread'
        })
        return {
            success: true,
            message: "Job posted successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const getPostedJobsByUserId = async (userId) => {
    try {
        const jobs = []
        const qry = query(collection(fireDB, "jobs"), where("postedByUserId", "==", userId), orderBy("postedOn", "desc"));
        const querySnapshot = await getDocs(qry);
        querySnapshot.forEach((doc) => {
            if (doc.data().status !== "deleted") {
                jobs.push({ ...doc.data(), id: doc.id, key: doc.id });
            }

        });
        return {
            success: true,
            data: jobs
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: `something went wrong ${error.message}`

        }
    }

}
export const getJobById = async (jobId) => {
    try {
        const docRef = doc(fireDB, "jobs", jobId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                success: true,
                data: { ...docSnap.data(), id: docSnap.id, key: docSnap.id }
            }
        } else {
            return {
                success: false,
                message: "No such job!"
            }
        }
    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const getAllJobs = async (filters) => {
    try {
        let whereConditions = []
        if (filters) {
            Object.keys(filters).forEach((key) => {
                if (key !== "experience" && filters[key]) {
                    whereConditions.push(where(key, "==", filters[key]))
                }
            })
        }
        const jobs = []
        const qry = query(collection(fireDB, "jobs"), ...whereConditions);
        const querySnapshot = await getDocs(qry);
        querySnapshot.forEach((doc) => {
            if (doc.data().status !== "deleted") {
                jobs.push({ ...doc.data(), id: doc.id, key: doc.id });
            }
        });

        // Aplicar el filtro de rango de experiencia en el cliente
        let filteredJobs = jobs;
        if (filters.experience) {
            const [minExp, maxExp] = filters.experience.split("-").map(Number); // Dividir el rango
            filteredJobs = jobs.filter((job) => {
                const jobExperience = Number(job.experience || 0); // Convertir a número
                return jobExperience >= minExp && jobExperience <= maxExp;
            });
        }

        // Ordenar los trabajos por fecha de publicación
        const sortedPosts = filteredJobs.sort((a, b) => {
            return moment(b.postedOn, "DD-MM-YYYY HH:mm A").diff(
                moment(a.postedOn, "DD-MM-YYYY HH:mm A")
            );
        });

        return {
            success: true,
            data: sortedPosts
        }
    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const editJobDetails = async (payload) => {
    try {
        await updateDoc(doc(fireDB, "jobs", payload.id), {
            ...payload,
            updatedOn: moment().format("DD-MM-YYYY HH:mm: A")
        });
        return {
            success: true,
            message: "Job updated successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const changeJobStatusFromAdmin = async (payload) => {
    try {
        await updateDoc(doc(fireDB, "jobs", payload.id), {
            ...payload,
            updatedOn: moment().format("DD-MM-YYYY HH:mm: A")
        });
        // Send notification to user

        await addDoc(collection(fireDB, "users", payload.postedByUserId, "notifications"), {
            title: `Your job post request for ${payload.title} status is ${payload.status}`,
            onClick: '/posted-jobs',
            status: 'unread',
            createdOn: moment().format("DD-MM-YYYY HH:mm: A")
        })

        return {
            success: true,
            message: "Job updated successfully"
        }

    } catch (error) {

        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const deleteJob = async (jobId) => {
    try {
        await updateDoc(doc(fireDB, "jobs", jobId), {
            status: "deleted"
        });
        return {
            success: true,
            message: "Job deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const applyJobPost = async (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const job = payload

    try {
        await addDoc(collection(fireDB, "applications"), {
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            userId: user.id,
            userName: user.name,
            email: user.email,
            phoneNumber: user?.phoneNumber || "",
            appliedOn: moment().format("DD-MM-YYYY HH:mm: A"),
            status: "pending"
        });
        return {
            success: true,
            message: "Job applied successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const getApplicationsByUserId = async (userId) => {

    try {
        const applications = []
        const qry = query(collection(fireDB, "applications"), where("userId", "==", userId), orderBy("appliedOn", "desc"));
        const querySnapshot = await getDocs(qry);
        querySnapshot.forEach((doc) => {
            applications.push({ ...doc.data(), id: doc.id, key: doc.id });
        });
        return {
            success: true,
            data: applications
        }
    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const getApplicationsByJobId = async (jobId) => {

    try {
        const applications = []
        const qry = query(collection(fireDB, "applications"), where("jobId", "==", jobId), orderBy("appliedOn", "desc"));
        const querySnapshot = await getDocs(qry);
        querySnapshot.forEach((doc) => {
            applications.push({ ...doc.data(), id: doc.id, key: doc.id });
        });
        return {
            success: true,
            data: applications
        }
    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const getAllApplications = async () => {

    try {
        const applications = []
        const querySnapshot = await getDocs(collection(fireDB, "applications"));
        querySnapshot.forEach((doc) => {
            applications.push({ ...doc.data(), id: doc.id, key: doc.id });
        });
        return {
            success: true,
            data: applications
        }
    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}

export const changeApplicationStatus = async (payload) => {

    try {
        await updateDoc(doc(fireDB, "applications", payload.id), {
            status: payload.status
        });

        // Send notification to user
        await addDoc(collection(fireDB, `users/${payload.userId}/notifications`), {
            title: `Your application for ${payload.jobTitle} in ${payload.company} is ${payload.status}`,
            onClick: '/applied-jobs',
            status: 'unread',
            createdOn: moment().format("DD-MM-YYYY HH:mm: A")
        })
        return {
            success: true,
            message: "Status updated successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: `something went wrong ${error.message}`
        }
    }
}