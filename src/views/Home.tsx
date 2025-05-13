/**
 * Main View
 * This is the main view of the component, used to show the cards and its main infomration.
 * */

import { useEffect, useState } from "react"
import { getBooks } from "../api/getBooks"
import { type Item } from "../model"
import BookCard from "../components/BookCard"

export const Home: React.FC = () => {
    const [bookData, setBookData] = useState<Item[]>([]);
    useEffect(() => {
        getBooks().then((payload) => setBookData(payload)).then(() => {
            console.log(JSON.stringify(bookData))
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '8px',
            padding: '8px',
            transform: 'scale(0.9)'
        }}>
            {bookData.map((item) => (
            <div key={item.id}>
            <BookCard 
                imageLinks={item.volumeInfo.imageLinks} 
                title={item.volumeInfo.title} 
            />
            </div>
            ))}
        </div>
    )
}