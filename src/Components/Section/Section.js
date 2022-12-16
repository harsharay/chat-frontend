import React from 'react'

const Section = ({data, key}) => {
  return (
    <div className='section-container'>
        <div className='section-content'>
            {Object.keys(data).length > 0 && 
                <p>{data.section_name}</p>
            }
        </div>
    </div>
  )
}

export default Section