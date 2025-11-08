import "./style.css";
export default function Navbar() {
    return (
            <nav className="nav">
                <div className="title">Todo List</div>
                <div className="date"> {new Date().toLocaleDateString()}</div> 
            </nav>
    )
}