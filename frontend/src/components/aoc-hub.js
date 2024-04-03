import React, { Compronent } from 'react'

import Year from './year'

import '../App.css'

const years = [

    ["Day 1 - Not Quite Lisp",
    "Day 2 - I Was Told There Would Be No Math",
    "Day 3 - Perfectly Spherical Houses in a Vacuum",
    "Day 4 - The Ideal Stocking Stuffer",
    "Day 5 - Doesn't He Have InternElves For This?",
    "Day 6 - Probably a Fire Hazard",
    "Day 7 - Some Assembly Required",
    "Day 8 - Matchsticks",
    "Day 9 - All in a Single Night",
    "Day 10 - Elves Look, Elves Say",
    "Day 11 - Corporate Policy",
    "Day 12 - JSAbacusFramework.io",
    "Day 13 - Knights of the Dinner Table",
    "Day 14 - Reindeer Olympics",
    "Day 15 - Science for Hungry People",
    "Day 16 - Aunt Sue",
    "Day 17 - No Such Thing as Too Much",
    "Day 18 - Like a GIF For Your Yard",
    "Day 19 - Medicine for Rudolph",
    "Day 20 - Infinite Elves and Infinite Houses",
    "Day 21 - RPG Simulator 20XX",
    "Day 22 - Wizard Simulator 20XX",
    "Day 23 - Opening the Turing Lock",
    "Day 24 - It Hangs in the Balance",
    "Day 25 - Let It Snow"],
    
    ["Day 1 - No Time for a Taxicab",
    "Day 2 - Bathroom Security",
    "Day 3 - Squares With Three Sides",
    "Day 4 - Security Through Obscurity",
    "Day 5 - How About a Nice Game of Chess?",
    "Day 6 - Signals and Noise",
    "Day 7 - Internet Protocol Version 7",
    "Day 8 - TwoFactor Authentication",
    "Day 9 - Explosives in Cyberspace",
    "Day 10 - Balance Bots",
    "Day 11 - Radioisotope Thermoelectric Generators",
    "Day 12 - Leonardo's Monorail",
    "Day 13 - A Maze of Twisty Little Cubicles",
    "Day 14 - OneTime Pad",
    "Day 15 - Timing is Everything",
    "Day 16 - Dragon Checksum",
    "Day 17 - Two Steps Forward",
    "Day 18 - Like a Rogue",
    "Day 19 - An Elephant Named Joseph",
    "Day 20 - Firewall Rules",
    "Day 21 - Scrambled Letters and Hash",
    "Day 22 - Grid Computing",
    "Day 23 - Safe Cracking",
    "Day 24 - Air Duct Spelunking",
    "Day 25 - Clock Signal"],
    
    ["Day 1 - Inverse Captcha",
    "Day 2 - Corruption Checksum",
    "Day 3 - Spiral Memory",
    "Day 4 - HighEntropy Passphrases",
    "Day 5 - A Maze of Twisty Trampolines, All Alike",
    "Day 6 - Memory Reallocation",
    "Day 7 - Recursive Circus",
    "Day 8 - I Heard You Like Registers",
    "Day 9 - Stream Processing",
    "Day 10 - Knot Hash",
    "Day 11 - Hex Ed",
    "Day 12 - Digital Plumber",
    "Day 13 - Packet Scanners",
    "Day 14 - Disk Defragmentation",
    "Day 15 - Dueling Generators",
    "Day 16 - Permutation Promenade",
    "Day 17 - Spinlock",
    "Day 18 - Duet",
    "Day 19 - A Series of Tubes",
    "Day 20 - Particle Swarm",
    "Day 21 - Fractal Art",
    "Day 22 - Sporifica Virus",
    "Day 23 - Coprocessor Conflagration",
    "Day 24 - Electromagnetic Moat",
    "Day 25 - The Halting Problem"],
    
    ["Day 1 - Chronal Calibration",
    "Day 2 - Inventory Management System",
    "Day 3 - No Matter How You Slice It",
    "Day 4 - Repose Record",
    "Day 5 - Alchemical Reduction",
    "Day 6 - Chronal Coordinates",
    "Day 7 - The Sum of Its Parts",
    "Day 8 - Memory Maneuver",
    "Day 9 - Marble Mania",
    "Day 10 - The Stars Align",
    "Day 11 - Chronal Charge",
    "Day 12 - Subterranean Sustainability",
    "Day 13 - Mine Cart Madness",
    "Day 14 - Chocolate Charts",
    "Day 15 - Beverage Bandits",
    "Day 16 - Chronal Classification",
    "Day 17 - Reservoir Research",
    "Day 18 - Settlers of The North Pole",
    "Day 19 - Go With The Flow",
    "Day 20 - A Regular Map",
    "Day 21 - Chronal Conversion",
    "Day 22 - Mode Maze",
    "Day 23 - Experimental Emergency Teleportation",
    "Day 24 - Immune System Simulator 20XX",
    "Day 25 - FourDimensional Adventure"],
    
    ["Day 1 - The Tyranny of the Rocket Equation",
    "Day 2 - 1202 Program Alarm",
    "Day 3 - Crossed Wires",
    "Day 4 - Secure Container",
    "Day 5 - Sunny with a Chance of Asteroids",
    "Day 6 - Universal Orbit Map",
    "Day 7 - Amplification Circuit",
    "Day 8 - Space Image Format",
    "Day 9 - Sensor Boost",
    "Day 10 - Monitoring Station",
    "Day 11 - Space Police",
    "Day 12 - The NBody Problem",
    "Day 13 - Care Package",
    "Day 14 - Space Stoichiometry",
    "Day 15 - Oxygen System",
    "Day 16 - Flawed Frequency Transmission",
    "Day 17 - Set and Forget",
    "Day 18 - ManyWorlds Interpretation",
    "Day 19 - Tractor Beam",
    "Day 20 - Donut Maze",
    "Day 21 - Springdroid Adventure",
    "Day 22 - Slam Shuffle",
    "Day 23 - Category Six",
    "Day 24 - Planet of Discord",
    "Day 25 - Cryostasis"],
    
    ["Day 1 - Report Repair",
    "Day 2 - Password Philosophy",
    "Day 3 - Toboggan Trajectory",
    "Day 4 - Passport Processing",
    "Day 5 - Binary Boarding",
    "Day 6 - Custom Customs",
    "Day 7 - Handy Haversacks",
    "Day 8 - Handheld Halting",
    "Day 9 - Encoding Error",
    "Day 10 - Adapter Array",
    "Day 11 - Seating System",
    "Day 12 - Rain Risk",
    "Day 13 - Shuttle Search",
    "Day 14 - Docking Data",
    "Day 15 - Rambunctious Recitation",
    "Day 16 - Ticket Translation",
    "Day 17 - Conway Cubes",
    "Day 18 - Operation Order",
    "Day 19 - Monster Messages",
    "Day 20 - Jurassic Jigsaw",
    "Day 21 - Allergen Assessment",
    "Day 22 - Crab Combat",
    "Day 23 - Crab Cups",
    "Day 24 - Lobby Layout",
    "Day 25 - Combo Breaker"],
    
    ["Day 1 - Sonar Sweep",
    "Day 2 - Dive!",
    "Day 3 - Binary Diagnostic",
    "Day 4 - Giant Squid",
    "Day 5 - Hydrothermal Venture",
    "Day 6 - Lanternfish",
    "Day 7 - The Treachery of Whales",
    "Day 8 - Seven Segment Search",
    "Day 9 - Smoke Basin",
    "Day 10 - Syntax Scoring",
    "Day 11 - Dumbo Octopus",
    "Day 12 - Passage Pathing",
    "Day 13 - Transparent Origami",
    "Day 14 - Extended Polymerization",
    "Day 15 - Chiton",
    "Day 16 - Packet Decoder",
    "Day 17 - Trick Shot",
    "Day 18 - Snailfish",
    "Day 19 - Beacon Scanner",
    "Day 20 - Trench Map",
    "Day 21 - Dirac Dice",
    "Day 22 - Reactor Reboot",
    "Day 23 - Amphipod",
    "Day 24 - Arithmetic Logic Unit",
    "Day 25 - Sea Cucumber"],
    
    ["Day 1 - Calorie Counting",
    "Day 2 - Rock Paper Scissors",
    "Day 3 - Rucksack Reorganization",
    "Day 4 - Camp Cleanup",
    "Day 5 - Supply Stacks",
    "Day 6 - Tuning Trouble",
    "Day 7 - No Space Left On Device",
    "Day 8 - Treetop Tree House",
    "Day 9 - Rope Bridge",
    "Day 10 - CathodeRay Tube",
    "Day 11 - Monkey in the Middle",
    "Day 12 - Hill Climbing Algorithm",
    "Day 13 - Distress Signal",
    "Day 14 - Regolith Reservoir",
    "Day 15 - Beacon Exclusion Zone",
    "Day 16 - Proboscidea Volcanium",
    "Day 17 - Pyroclastic Flow",
    "Day 18 - Boiling Boulders",
    "Day 19 - Not Enough Minerals",
    "Day 20 - Grove Positioning System",
    "Day 21 - Monkey Math",
    "Day 22 - Monkey Map",
    "Day 23 - Unstable Diffusion",
    "Day 24 - Blizzard Basin",
    "Day 25 - Full of Hot Air"],
    
    ["Day 1 - Trebuchet?!",
    "Day 2 - Cube Conundrum",
    "Day 3 - Gear Ratios",
    "Day 4 - Scratchcards",
    "Day 5 - If You Give A Seed A Fertilizer",
    "Day 6 - Wait For It",
    "Day 7 - Camel Cards",
    "Day 8 - Haunted Wasteland",
    "Day 9 - Mirage Maintenance",
    "Day 10 - Pipe Maze",
    "Day 11 - Cosmic Expansion",
    "Day 12 - Hot Springs",
    "Day 13 - Point of Incidence",
    "Day 14 - Parabolic Reflector Dish",
    "Day 15 - ",
    "Day 16 - ",
    "Day 17 - ",
    "Day 18 - ",
    "Day 19 - ",
    "Day 20 - ",
    "Day 21 - ",
    "Day 22 - ",
    "Day 23 - ",
    "Day 24 - ",
    "Day 25 - "]

];


export default class AOC extends React.Component {


    state = {
        display: "2023",
        data: ["2023", years[8]]
    }


    onClickYear = (year, num) => {
        console.log(year, num);
        this.setState({
            display: year,
            data: [year, years[num]]
        })
    }

    render(){

        const buttons = [
            <button onClick = {(e) => this.onClickYear("2015", 0)}>
                2015
            </button>,
            <button onClick = {(e) => this.onClickYear("2016", 1)}>
                2016
            </button>,
            <button onClick = {(e) => this.onClickYear("2017", 2)}>
                2017
            </button>,
            <button onClick = {(e) => this.onClickYear("2018", 3)}>
                2018
            </button>,
            <button onClick = {(e) => this.onClickYear("2019", 4)}>
                2019
            </button>,
            <button onClick = {(e) => this.onClickYear("2020", 5)}>
                2020
            </button>,
            <button onClick = {(e) => this.onClickYear("2021", 6)}>
                2021
            </button>,
            <button onClick = {(e) => this.onClickYear("2022", 7)}>
                2022
            </button>,
            <button onClick = {(e) => this.onClickYear("2023", 8)}>
                2023
            </button>
        ]

        return (
            <>
            <p class="header">-- bsumser's Advent of Code Hub --</p>
            <div className = "main_container">
                <div className = "main_wrapper">
                {buttons}
                <br />
                {
                    (() => {
                        switch(this.state.display) {
                            case '2015': return <Year data = {this.state.data} />;
                            case '2016': return <Year data = {this.state.data} />;
                            case '2017': return <Year data = {this.state.data} />;
                            case '2018': return <Year data = {this.state.data} />;
                            case '2019': return <Year data = {this.state.data} />;
                            case '2020': return <Year data = {this.state.data} />;
                            case '2021': return <Year data = {this.state.data} />;
                            case '2022': return <Year data = {this.state.data} />;
                            case '2023': return <Year data = {this.state.data} />;
                            default: return <Year data = {{year: "2023"}} />;
                        }
                    })()
                }
                </div>
            </div>
            </>
        )
    }

}