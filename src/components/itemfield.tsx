interface ItemFieldProps{
    onAddClick: () => void; 
}

export default function ItemField(){
    return (
        <div className = "item-field">
            <input type= "text" placeholder = "Add a Task" />
        </div>
    )
}