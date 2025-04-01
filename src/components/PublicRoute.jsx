import React from 'react'


const PublicRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
        window.location.href = '/'
    } else {
        return children
    }
}

export default PublicRoute
