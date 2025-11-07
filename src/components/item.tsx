import "../components/style.css";
import { FaTrash } from "react-icons/fa";

interface ItemProps {
    title: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void;
    
}

export default function Item({ title, completed, onToggle, onDelete }: ItemProps){
    return (


        <div className="item">
            <div className="item-content">
                <div className = "task">
                    <input type="checkbox" className="item-checkbox" checked={completed} onChange={onToggle} /> 
                    <div className={`item-title ${completed ? "completed" : ""}`}>
                        {title}</div>
                </div>

                <div className = "delete">
                    <button className="delete-button" onClick={onDelete}><FaTrash /></button>
                </div>
            </div>
        </div>
    );
}