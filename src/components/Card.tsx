import type { ImageLinks } from "../model";

interface ICard {
    imageLinks?: ImageLinks,
    title: string
}
const Card = ({ imageLinks, title }: ICard) => {
    return (
        <div>
            <img src={imageLinks?.thumbnail} alt="Book Cover" />
            <h2>{title}</h2>
        </div>
    )
}

export default Card;