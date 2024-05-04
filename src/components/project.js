import React from 'react'

const Project = (props) => {
  return (
        <>
        <div>{props.title}</div>
        <div>{props.summary}</div>
        <img src={`images/${props.image}`}/>
        </>
    )
}

export default Project
