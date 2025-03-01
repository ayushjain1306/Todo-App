import { Box, styled, TextField, Button } from "@mui/material";
import { useState } from "react";
import { login } from "../../services/accountApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NewBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}))

const NewTextField = styled(TextField)(({ theme }) => ({
    marginTop: "2vh",
    width: "50%",
    [theme.breakpoints.down('sm')]: {
        width: "60%"
    }
}))

const NewButton = styled(Button)(({theme}) => ({
    width: "40%",
    marginTop: "15px",
    fontWeight: "bold",
    [theme.breakpoints.down('sm')]: {
        width: "50%"
    }
}))

function Login({ setLogin, setLoading }: { setLogin: any, setLoading: any }) {
    const [input, setInput] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleClick = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        const result: any = await login(input);
        setLoading(false);

        if (result === "Invalid Credentials.") {
            setInput({...input, password: ""});
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Invalid Credentials."
            })
        }
        else if (result) {
            navigate("/");
        }
        else {
            setInput({...input, password: ""});
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Failed to Login. Try Again Later!"
            })
        }
    }

    return (
        <NewBox>
            <form onSubmit={handleClick} style={{ width: "100%", display: "inherit", flexDirection: "inherit", alignItems: "inherit" }}>
                <NewTextField
                    placeholder="Enter your email"
                    type="email"
                    value={input.email}
                    onChange={handleChange}
                    name="email"
                    required
                />
                <NewTextField
                    placeholder="Enter your password"
                    type="password"
                    value={input.password}
                    onChange={handleChange}
                    name="password"
                    required
                    style={{ paddingBottom: "15px" }}
                />

                <NewButton variant="contained" color="primary" type="submit">Login</NewButton>
                <NewButton variant="contained" color="warning" type="submit" onClick={() => setLogin(false)}>Create Account</NewButton>
            </form>
        </NewBox>
    )
}

export default Login;