import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h1>Sorry, I haven't been able to solve this one yet!</h1>
            <p>Here are some helpful links:</p>
            <Link to='/aoc-hub'>AOC-Hub</Link>
        </div>
    )
}