import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { ImageLinks } from "../model";

interface ICard {
    imageLinks?: ImageLinks,
    title: string
}
const BookCard = ({ imageLinks, title }: ICard) => {
    return (
        <Card key={title} sx={{ maxWidth: 200 }}>
            <CardMedia
            sx={{ height: 200, width: "100%", objectFit: "contain" }}
            image={imageLinks?.thumbnail}
            title="book card"
            />
            <CardContent sx={{ padding: 1, height: 60, overflow: "hidden" }}>
                <Typography 
                    gutterBottom 
                    variant="body1" 
                    component="div" 
                    sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                >
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BookCard;