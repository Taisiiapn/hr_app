import React from 'react'


const Department = ({ props }) => {

    const { name } = props

    return (
        <div>

            <span>{name}</span>
            
        </div>
    )
}

export default Department