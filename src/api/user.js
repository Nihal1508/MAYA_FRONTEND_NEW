import { publicGateway } from "../../services/gateway"
import { maya } from "../../services/urls"

export const  acceptRequest =({userid}) => {
    publicGateway
        .post(maya.acceptRequest, {
            userid
        })
        .then((response) => {
            console.log("Request Accepted")
            return response.data
        })
        .catch((error)=>{
            console.log("The Request Not Accepted")
            throw error
        })
}

export const  rejectRequest =({userid}) => {
    publicGateway
        .post(maya.rejectRequest, {
            userid
        })
        .then((response) => {
            console.log("Request Rejected")
            return response.data
        })
        .catch((error)=>{
            console.log("The Request Not Rejected")
            throw error
        })
}

export const allAdmins =({status,email}) => {

    publicGateway
        .get(maya.requests,{
            params:{
                status,
                email
            }
        })
        .then((response) => {
            console.log("All Admins")
            return response.data
        })
        .catch((error)=>{
            console.log("The Admins Not Found")
            throw error
        })
}


