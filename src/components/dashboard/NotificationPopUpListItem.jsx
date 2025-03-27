import React from 'react'

function NotificationPopUpListItem({ notification, type }) {
    return (
        <div className={`py-2 pl-4 pr-4 border-l-4 mb-2 flex justify-between border-purplePrimary bg-gradient-to-r ${type === 'read' ? '' : 'from-[#A192FF44] to-transparent'}`}>
            <h2 className='text-left text-sm line-clamp-1'>
                {notification.title}
            </h2>
            <p className='text-xs text-gray-400'>
                {notification.time}
            </p>
        </div>
    )
}

export default NotificationPopUpListItem
