import {useMatches} from "react-router-dom";

function Breadcrumbs() {
    let matches = useMatches();
    let crumbs = matches
        // first get rid of any matches that don't have handle and crumb
        .filter((match) => Boolean(match.handle?.crumb))
        // now map them into an array of elements, passing the loader
        // data to each one
        // .map((match) => match.handle.crumb(match.data));
        .map((match) => match.handle.crumb);


    return (
        <nav className="breadcrumb is-small">
            <ul>
                {
                    crumbs.map((crumb, index) => (
                        <li key={index}><a>{crumb}</a></li>
                    ))
                }
            </ul>
        </nav>
    );
}

export default Breadcrumbs;