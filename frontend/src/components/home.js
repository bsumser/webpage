import React from 'react'

const Home = () => {
    return (
        <>
	    <body>
       	<h2>Personal Projects</h2>
	    		<p><a href="https://github.com/bsumser/neuralNetwork">Machine Learning Neural Network</a> programmed in C++.
	    		The inspiration for this project was my experience working with wine in
	    		a restaurant. I thought that making a neural network that was able to differentiate
	    		between different varietals of wine would be educational for my future projects.</p>

	    		<p><a href="https://github.com/bsumser/fourierTransformer">C++ implementation of the Fourier Transform.</a>
	    		This was a 2 person group project for a
	    		course focused on parallel computing. Different versions of fast fourier transform algorithms
	    		were studied, and we attempted to implement various parallel computing technology such as
	    		MPI, or OpenMP.
	    		</p>

       	<h2>Programming Langauges</h2>
           	<p>Here are some of the languages I am familiar with:</p>
	    		<ul>
	    			<li>C/C++</li>
	    			<li>Python</li>
	    			<li>Bash</li>
	    			<li>Latex</li>
	    			<li>Regex</li>
	    		</ul>
	    </body>
        </>
    )
}

export default Home