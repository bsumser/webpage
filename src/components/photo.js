import React from 'react'
import dog from "../img/DSCF1082.jpg"
import rock from "../img/DSCF1090.jpg"
import cat from "../img/DSCF1149.jpg"
import cat2 from "../img/DSCF1218.jpg"
import woods from "../img/DSCF1258.jpg"
import building from "../img/DSCF1463.jpg"
import tropical from "../img/DSCF1468.jpg"
import cat3 from "../img/DSCF1655.jpg"
import pup from "../img/DSCF1674.jpg"
import light from "../img/DSCF1706.jpg"

import '../App.css'

const Photo = () => {
    return (
        <>
        <div class="row"> 
          <div class="column">
            <img src={dog} style={{"width" : "100%"}}/>
            <img src={pup} style={{"width" : "100%"}}/>
          </div>

          <div class="column">
            <img src={rock} style={{"width" : "100%"}}/>
            <img src={building} style={{"width" : "100%"}}/>
            <img src={light} style={{"width" : "100%"}}/>
          </div> 

          <div class="column">
            <img src={cat} style={{"width" : "100%"}}/>
            <img src={woods} style={{"width" : "100%"}}/>
            <img src={tropical} style={{"width" : "100%"}}/>
          </div>

          <div class="column">
            <img src={cat2} style={{"width" : "100%"}}/>
            <img src={cat3} style={{"width" : "100%"}}/>
          </div>
        </div> 
        
        </>
    )
}

export default Photo