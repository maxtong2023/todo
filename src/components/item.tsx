interface ItemProps {
    title: string;
    description: string;
}

export default function Item({ title, description }: ItemProps){
    return (
        <div className="item">
            <div className="item-content">
                <div className="item-title">{title}</div>
                <div className="item-description">{description}</div>
            </div>
        </div>
    );
}