import React from 'react'
import Project from './project'

const Home = () => {
    return (
        <>
        <script data-goatcounter="https://bsumser.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
          <Project 
          title="Machine Learning Neural Network"

          summary="The inspiration for this project was my experience working with wine in
	    		a restaurant. I thought that making a neural network that was able to differentiate
	    		between different varietals of wine would be educational for my future projects."

          image="./img/image.png"
          
          link="https://github.com/bsumser/neuralNetwork"
          />
          
          <Project 
          title="C++ implementation of the Fourier Transform"

          summary="This was a 2 person group project for a
	    		course focused on high performance parallel computing. Different versions of fast fourier transform algorithms
	    		were studied, and we attempted to implement various parallel computing technology such as
	    		MPI, or OpenMP."

          image="./img/image.png"

          link="https://github.com/bsumser/fourierTransformer"
          />
        </>
    )
}

export default Home