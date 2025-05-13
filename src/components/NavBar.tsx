import { AppBar, Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate(); 
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                    <Button color="inherit" onClick={() => navigate("/search")}>Search</Button>
                    <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
                    <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
                </Box>
            </Container>
        </AppBar>
    )
}

export default NavBar;