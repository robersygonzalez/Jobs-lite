import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";
import CryptoJS from "crypto-js";


export const LoginUser = async (payload) => {

    try {
        const qry = query(collection(fireDB, "users"), where("email", "==", payload.email));
        const querySnapshot = await getDocs(qry);

        if (querySnapshot.empty) {
            return {
                success: false,
                message: "User not found",
                data: null
            }
        } else {
            const doc = querySnapshot.docs[0]
            const snapshotData = { id: doc.id, ...doc.data() }

            const decryptedPassword = CryptoJS.AES.decrypt(snapshotData.password, "jobslite").toString(CryptoJS.enc.Utf8);
            if (decryptedPassword === payload.password) {
                return {
                    success: true,
                    message: "Login successful",
                    data: snapshotData
                }
            } else {
                return {
                    success: false,
                    message: "Incorrect password",
                    data: null
                }
            }
        }

    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: null
        }

    }
}
export const RegisterUser = async (payload) => {

    try {
        // Checking if email already exists
        const qry = query(collection(fireDB, "users"), where("email", "==", payload.email));
        const querySnapshot = await getDocs(qry);
        if (!querySnapshot.empty) {
            return {
                success: false,
                message: "Email already exists",
                data: null
            }
        }


        // Encrypting the password before storing it in the database
        const encryptedPassword = CryptoJS.AES.encrypt(payload.password, "jobslite").toString();
        payload.password = encryptedPassword;
        const response = await addDoc(collection(fireDB, "users"), payload);
        return {
            success: true,
            message: "User Registered successfully",
            data: response
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: null
        }
    }
}