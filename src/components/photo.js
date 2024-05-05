import React from 'react'

import '../App.css'

const Photo = () => {
    return (
        <>
        <div class="row"> 
          <div class="column">
            <img src={window.location.origin + '/img/dog.jpg'} style={{"width" : "100%"}}/>
            <img src={window.location.origin + '/img/pup.jpg'} style={{"width" : "100%"}}/>
          </div>

          <div class="column">
            <img src={window.location.origin + '/img/rock.jpg'} style={{"width" : "100%"}}/>
            <img src={window.location.origin + '/img/building.jpg'} style={{"width" : "100%"}}/>
            <img src={window.location.origin + '/img/light.jpg'} style={{"width" : "100%"}}/>
          </div> 

          <div class="column">
            <img src={window.location.origin + '/img/cat.jpg'} style={{"width" : "100%"}}/>
            <img src={window.location.origin + '/img/woods.jpg'} style={{"width" : "100%"}}/>
            <img src={window.location.origin + '/img/tropical.jpg'} style={{"width" : "100%"}}/>
          </div>

          <div class="column">
            <img src={window.location.origin + '/img/cat2.jpg'} style={{"width" : "100%"}}/>
            <img src={window.location.origin + '/img/cat3.jpg'} style={{"width" : "100%"}}/>
          </div>
        </div> 
        
        </>
    )
}

export default Photo