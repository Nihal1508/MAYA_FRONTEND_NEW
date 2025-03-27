import { publicGateway } from "../../services/gateway"
import { maya } from "../../services/urls"

export const GetImage =({id}) => {
    publicGateway
        .post(maya.takeImage, {
            id 
        })
        .then((response) => {
            console.log("Image Found")
            return response.data
        })
        .catch((error)=>{
            console.log("The Image Not Found")
            throw error
        })
}

export const UploadImage =({eventid})=>{
    publicGateway
        .post(maya.uploadImage, {
            eventid
        })
        .then((response) => {
            console.log("Image Uploaded")
            return response.data
        })
        .catch((error)=>{
            console.log("The Image Not Uploaded")
            throw error
        })

}

export const DeleteImage =({eventid,fileid})=>{
    publicGateway
        .post(maya.deleteImage, {
            eventid,
            fileid
        })
        .then((response) => {
            console.log("Image Deleted")
            return response.data
        })
        .catch((error)=>{
            console.log("The Image Not Deleted")
            throw error
        })

}