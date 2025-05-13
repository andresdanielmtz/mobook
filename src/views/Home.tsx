/**
 * Main View
 * This is the main view of the component, used to show the cards and its main infomration.
 * */

import { useEffect, useState } from "react"
import { getBooks } from "../api/getBooks"
import { type Item } from "../model"
import Card from "../components/Card"

export const Home: React.FC = () => {
    const [bookData, setBookData] = useState<Item[]>([]);
    useEffect(() => {
        getBooks().then((payload) => setBookData(payload)).then(() => {
            console.log(JSON.stringify(bookData))
        })
    }, [])
    return (
        <div>
            {bookData.map((item) => {
                return (
                    <div>
                        <Card imageLinks={item.volumeInfo.imageLinks} title={item.volumeInfo.title} />
                    </div>
                )
            }
            )}
        </div>
    )
}