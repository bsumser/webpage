import React from 'react'

const Project = (props) => {
  return (
        <>
        <div>{props.title}</div>
        <div>{props.summary}</div>
        <div>{props.image}</div>
        </>
    )
}

export default Project
