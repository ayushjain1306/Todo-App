import { useContext, useState, MouseEvent } from "react";
import { Box, AppBar, Toolbar, Backdrop, CircularProgress, Menu, MenuItem, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Home, Person, Logout, Menu as MenuIcon } from "@mui/icons-material";
import { UserContext } from "../../../context/UserContext";
import { logout } from "../../../services/accountApi";
import Swal from "sweetalert2";

const NewAppBar = styled(AppBar)(({theme}) => ({
    height: "10vh",
}))

const NewToolbar = styled(Toolbar)(({theme}) => ({
    height: "10vh",
    backgroundColor: "white",
    boxShadow: "0px 8px 8px -3px rgb(0, 0, 0, 0.2)",
    color: "black"
}))

const FirstBox = styled(Box)(({theme}) => ({
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "10vh",
    fontSize: "20px",
    fontWeight: "500",
    [theme.breakpoints.down('sm')]: {
        width: "100%",
        justifyContent: "space-evenly"
    }
}))

const SecondBox = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
        display: "none"
    }
}))

const AnotherBox = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: "center",
    [theme.breakpoints.up('sm')]: {
        display: "none"
    }
}))

const spanStyle = {
    fontSize: "17px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    margin: "0px 20px"
}

function Header() {
    const context = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [anchorE1, setAnchorE1] = useState<null|HTMLElement>(null);
    const open = Boolean(anchorE1);

    const handleClick = async () => {
        setLoading(true);
        const result = await logout();
        setLoading(false);

        if (result) {
            navigate("/account");
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Failed! Try Again Later."
            })
        }
    }

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorE1(e.currentTarget);
    }

    const handleClose = () => setAnchorE1(null);

    return (
        context && typeof context === "object" && "user" in context && context.user &&
        <NewAppBar>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer+1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <NewToolbar>
                <FirstBox>
                    Welcome to Todo App
                    <AnotherBox id="hamburger-menu">
                        <MenuIcon fontSize="large" onClick={handleOpen} />
                    </AnotherBox>
                </FirstBox>
                <SecondBox>
                    <Link to="/" style={{ ...spanStyle, color: "inherit", textDecoration: "none"}}><Home style={{marginRight: "4px"}} />Home</Link>
                    <span style={spanStyle}><Person style={{marginRight: "4px"}} />{typeof context.user === "object" && "name" in context.user && typeof context.user.name === "string" && context.user.name}</span>
                    <span onClick={handleClick} style={{ ...spanStyle, cursor: "pointer" }}><Logout style={{marginRight: "4px"}} />Sign Out</span>
                </SecondBox>
            </NewToolbar>
            {
                <Menu style={{position: "absolute", top: "0px", right: "0", borderRadius: "3px"}} anchorEl={anchorE1} MenuListProps={{
                    'aria-labelledby': "hamburger-menu"
                }} open={open} onClose={handleClose}>
                    <Link to="/" style={{ ...spanStyle, color: "inherit", textDecoration: "none", fontSize: "20px"}}><Home style={{marginRight: "6px"}} fontSize="large" />Home</Link>
                    <span style={{...spanStyle, fontSize: "20px"}}><Person style={{marginRight: "6px"}} fontSize="large" />{typeof context.user === "object" && "name" in context.user && typeof context.user.name === "string" && context.user.name}</span>
                    <span onClick={handleClick} style={{ ...spanStyle, cursor: "pointer", fontSize: "20px" }}><Logout style={{marginRight: "6px"}} fontSize="large" />Sign Out</span>
                
                </Menu>
            }
        </NewAppBar>
    )
}

export default Header;