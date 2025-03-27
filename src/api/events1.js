import { privateGateway, publicGateway } from "../../services/gateway"
import { maya } from "../../services/urls"

export const createEvent = async ({
  eventName,
  eventDescription,
  startDate,
  endDate,
}) => {
    return publicGateway
        .post(maya.createEvent, {
            eventName,
            eventDescription,
            startDate,
            endDate,
        })
        .then((response) => {
            console.log('Event created successfully')
            return response.data
        })
        .catch((error) => {
            console.log("Event not created", error);
            throw error;
        });
}

export const getEvent = async () => { 
    console.log('Fetching events...')
    return privateGateway
        .get(maya.getEvent)
        .then((response) => {
            console.log('Events fetched successfully')
            console.log(response.data)
            return response.data
        })
        .catch((error) => {
            console.log("Events not fetched", error);
            throw error;
        });
}

export const getEventImage = async ({eventid}) => { 
    return publicGateway
        .get(maya.getEventImage, {
            eventid,
        })
        .then((response) => {
            console.log('Event image fetched successfully')
            return response.data
        })
        .catch((error) => {
            console.log("Event image not fetched", error);
            throw error;
        });
}

export const ManagerInvite = async ({userid, eventid}) => {
    return publicGateway
        .post(maya.managerInvite, {
            userid,
            eventid,
        })
        .then((response) => {
            console.log('Manager invited successfully')
            return response.data
        })
        .catch((error) => {
            console.log("Manager not invited", error);
            throw error;
        });
}