import { Box, styled, Typography, Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const NewBox = styled(Box)(({theme}) => ({
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f4f4"
}))

const AnotherBox = styled(Box)(({theme}) => ({
    width: "55vw",
    height: "65vh",
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgb(0, 0, 0, 0.2)",
    [theme.breakpoints.down('sm')]: {
        width: "80vw",
        height: "70vh"
    }
}))

const FirstBox = styled(Box)(({theme}) => ({
    paddingTop: "3.5vh"
}))

const SecondBox = styled(Box)(({theme}) => ({
    
}))

const HeadTypo = styled(Typography)(({theme}) => ({
    textAlign: "center",
    fontWeight: "600",
    fontSize: "25px"
}))

const Tag = styled(Typography)(({theme}) => ({
    textAlign: "center",
    fontWeight: "600",
    fontSize: "20px",
    marginTop: "2vh"
}))

function Account() {
    const [login, setLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    return (
        <NewBox>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer+1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <AnotherBox>
                <FirstBox>
                    <HeadTypo>Todo App</HeadTypo>
                    <Tag>{ login ? "Login" : "Signup" }</Tag>
                </FirstBox>
                <SecondBox>
                    {
                        login ? <Login setLogin={setLogin} setLoading={setLoading} /> : <Signup setLogin={setLogin} setLoading={setLoading} />
                    }
                </SecondBox>
            </AnotherBox>
        </NewBox>
    )
}

export default Account;