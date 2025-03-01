import { useContext, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import Header from "./header/Header";
import { useNavigate } from "react-router-dom";
import { getAccountDetails } from "../../services/accountApi";
import Activities from "./content/Activities";

const NewBox = styled(Box)(() => ({
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f5f4f4"
}))

const AnotherBox = styled(Box)(() => ({
    paddingTop: "12vh"
}))

function HomePage() {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    const fetchDetails = async() => {
        const result = await getAccountDetails();

        if (result) {
            context && typeof context === "object" && "setUser" in context && context.setUser(result);
        }
        else {
            navigate("/account")
        }
    } 

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        context && typeof context === "object" && "user" in context && context.user &&
        <NewBox>
            <Header />
            <AnotherBox>
                <Activities />
            </AnotherBox>
        </NewBox>
    )
}

export default HomePage;