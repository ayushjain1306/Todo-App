import { Box, styled, TextField, Button } from "@mui/material";
import { useState } from "react";
import { signup } from "../../services/accountApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NewBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}))

const AnotherBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    [theme.breakpoints.down('sm')]: {
        display: "block",
        width: "100%",
        textAlign: "center"
    }
}))

const NewTextField = styled(TextField)(({ theme }) => ({
    marginTop: "2vh",
    width: "40%",
    [theme.breakpoints.down('sm')]: {
        width: "60%"
    }
}))

const NewButton = styled(Button)(({ theme }) => ({
    width: "40%",
    marginTop: "15px",
    fontWeight: "bold",
    [theme.breakpoints.down('sm')]: {
        width: "50%"
    }
}))

function Login({ setLogin, setLoading }: { setLogin: any, setLoading: any }) {
    const [input, setInput] = useState({ name: "", phone: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleClick = async (e: any) => {
        e.preventDefault();

        if (input.phone.length !== 10) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Phone Number must be of length 10."
            })

            return;
        }

        const data = { ...input, phone: parseInt(input.phone) };

        setLoading(true);
        const result: any = await signup(data);
        setLoading(false);

        if (result === "Email already exists.") {
            setInput({...input, password: ""});
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Email already exists."
            })
        }
        else if (result === "Phone Number already exists.") {
            setInput({...input, password: ""});
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Phone Number already exists."
            })
        }
        else if (result) {
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Account Created Successfully."
            })
            setLogin(true);
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
                <AnotherBox>
                    <NewTextField
                        placeholder="Enter your name"
                        type="text"
                        value={input.name}
                        onChange={handleChange}
                        name="name"
                        required
                    />
                    <NewTextField
                        placeholder="Enter your email"
                        type="email"
                        value={input.email}
                        onChange={handleChange}
                        name="email"
                        required
                    />
                </AnotherBox>

                <AnotherBox>
                    <NewTextField
                        placeholder="Enter your phone number"
                        type="number"
                        value={input.phone}
                        onChange={handleChange}
                        name="phone"
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
                </AnotherBox>

                <NewButton variant="contained" color="primary" type="submit">Signup</NewButton>
                <NewButton variant="contained" color="warning" type="submit" onClick={() => setLogin(true)}>Existing Account</NewButton>
            </form>
        </NewBox>
    )
}

export default Login;