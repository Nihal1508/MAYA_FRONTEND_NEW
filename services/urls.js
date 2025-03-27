import { get } from "react-hook-form";

export const maya = {
    //auth
    login: '/auth/login',
    generateOtp: '/auth/signup/sendotp',
    verifyOtp: '/auth/signup/verify',
    signup: '/auth/signup',
    refresh: '/tokens/refresh',
    //events
    createEvent: '/api/events',
    getEvent: '/admin/events',
    getEventImage: '/api/events/upload',
    ManagerInvite: '/admin/events/invite',
    getAssignedEvents: '/api/events',
    getEventInvitations: '/api/events/invites',
    //image
    takeImage: '/api/events/images',
    deleteImage: '/api/events/images',
    uploadImage: '/api/events/upload',
    //users
    checkRole: '/api/role',
    acceptRequest: '/api/users/accept',
    rejectRequest: '/api/users/reject',
    //admins
    requests: '/admin/users',
    //invites
    invite:'/admin/events/invite',

    //manager
    accepEventInvitation: '/api/events/invites/accept',
    rejectEventInvitation: '/api/events/invites/reject',

}