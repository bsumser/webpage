import React from 'react'

import '../App.css'

class Year extends React.Component {
    render() {
    console.log(this.props.data)
    return (
    <div class="month-grid">
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/1`}>
                {this.props.data[1][0]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day1.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day1.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day1-vis.html`} >
                Visualization</a><br />
        </div>
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/2`} >
                {this.props.data[1][1]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day2.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day2.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day2-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/3`} >
                {this.props.data[1][2]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day3.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day3.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day3-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/4`} >
                {this.props.data[1][3]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day4.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day4.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day4-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/5`} >
                {this.props.data[1][4]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day5.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day5.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day5-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/6`} >
                {this.props.data[1][5]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day6.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day6.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day6-vis.html`} >
                Visualization</a><br />
        </div>
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/7`} >
                {this.props.data[1][6]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day7.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day7.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day7-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/8`} >
                {this.props.data[1][7]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day8.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day8.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day8-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/9`} >
                {this.props.data[1][8]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day9.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day9.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day9-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/10`} >
                {this.props.data[1][9]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day10.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day10.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day10-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/11`} >
                {this.props.data[1][10]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day11.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day11.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day11-vis.html`} >
                Visualization</a><br />
        </div>
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/12`} >
                {this.props.data[1][11]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day12.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day12.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day12-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/13`} >
                {this.props.data[1][12]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day13.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day13.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day13-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/14`} >
                {this.props.data[1][13]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day14.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day14.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day14-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/15`} >
                {this.props.data[1][14]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day15.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day15.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day15-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/16`} >
                {this.props.data[1][15]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day16.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day16.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day16-vis.html`} >
                Visualization</a><br />
        </div>
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/17`} >
                {this.props.data[1][16]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day17.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day17.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day17-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/18`} >
                {this.props.data[1][17]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day18.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day18.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day18-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/19`} >
                {this.props.data[1][18]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day19.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day19.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day19-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/20`} >
                {this.props.data[1][19]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day20.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day20.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day20-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/21`} >
                {this.props.data[1][20]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day21.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day21.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day21-vis.html`} >
                Visualization</a><br />
        </div>
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/22`} >
                {this.props.data[1][21]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day22.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day22.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day22-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/23`} >
                {this.props.data[1][22]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day23.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day23.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day23-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/24`} >
                {this.props.data[1][23]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day24.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day24.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day24-vis.html`} >
                Visualization</a><br />
        </div>
        
        <div class="col-item" >
            <a href={`https://adventofcode.com/${this.props.data[0]}/day/25`} >
                {this.props.data[1][24]}</a><br />
            <a href={`https://github.com/bsumser/AOC/blob/main/${this.props.data[0]}/day25.py`} >
                Source Code</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day25.html`} >
                Writeup</a><br />
            <a href={`http://bsumser.com/aoc-hub/${this.props.data[0]}/day25-vis.html`} >
                Visualization</a><br />
        </div>
    </div>
    )
}
}

export default Year