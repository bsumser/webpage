import React from 'react'

const Project = (props) => {
  return (
        <>
        <h3>{props.title}</h3>
        <p>{props.summary}</p>
        {/* <img src={`images/${props.image}`}/> */}
        <p><a href>{props.link}</a></p>
        </>
    )
}

export default Project
