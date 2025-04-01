import React from 'react'

const PageTitle = ({ title }) => {
    return (
        <div className='page-title'>
            <h2>
                {title}
            </h2>
            <div className='divider'></div>
        </div>
    )
}

export default PageTitle
