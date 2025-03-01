import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle, Backdrop, CircularProgress, styled } from "@mui/material";
import { createActivity, deleteActivity, getActivities, updateActivity } from "../../../services/activityApi";
import Swal from "sweetalert2";
import PaginationTable from "../Pagination";

const NewBox = styled(Box)(() => ({

}))

const HeadBox = styled(Box)(() => ({
    width: "90%",
    margin: "auto",
    textAlign: "right"
}))

const TableBox = styled(Box)(() => ({
    width: "90%",
    margin: "auto",
    marginTop: "4vh",
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgb(0, 0, 0, 0.2)",
}))

const NewTextField = styled(TextField)(() => ({
    width: "20vw",
    marginTop: "4vh"
}))

function Activities() {
    const [act, setAct] = useState<object[]|null>(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [loading, setLoading] = useState(false);
    const [mainLoading, setMainLoading] = useState(false);
    const [load, setLoad] = useState(true);

    const fetchActivities = async () => {
        setMainLoading(true);
        const result = await getActivities();
        

        if (result) {
            setAct(result);
            setLoad(!load);
        }
        setMainLoading(false);
    }

    useEffect(() => {
        fetchActivities();
    }, [value]);

    const headProps = ["Status", "Activity", "Date", "Actions"];

    const targets = ["status", "activity", "date", "actions"];

    const actions = ["delete"];

    const handleDelete = async (id: any) => {
        setLoading(true);
        const result = await deleteActivity(id);
        setLoading(false);

        if (result) {
            setValue(value+1);
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Activity Deleted Successfully."
            })
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Failed. Try Again Later!"
            })
        }
    }

    const handleEdit = async (id: any) => {
        setLoading(true);
        const result = await updateActivity(id, { status: true });
        

        if (result) {
            setAct(act ? act.map((obj) => {
                if (typeof obj === "object" && "_id" in obj && obj._id === id){
                    return { ...obj, status: true };
                }
                else {
                    return obj;
                }
            }): null);
            setLoad(!load);

            setLoading(false);
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Activity Updated Successfully."
            })
        }
        else {
            setLoading(false);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Failed. Try Again Later!"
            })
        }
        
    }

    const handleView = () => {}

    return (
        (load || !load) && (act) && 
        <NewBox>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer+1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <HeadBox>
                <Button variant="contained" color="warning" onClick={() => setOpen(true)}>Add New Activity</Button>
            </HeadBox>
            <TableBox>
                <PaginationTable mainLoading={mainLoading} load={load} headProps={headProps} contentProps={act} target={targets} actions={actions} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
            </TableBox>

            {
                open && <DialogBox open={open} setOpen={setOpen} value={value} setValue={setValue} />
            }
        </NewBox>
    )
}

function DialogBox({ open, setOpen, value, setValue }: { open: boolean, setOpen: any, value: number, setValue: any }) {
    const [ input, setInput ] = useState({ activity: "", date: new Date() });
    const [loading, setLoading] = useState(false);

    const handleClose = () => setOpen(false);

    const handleClick = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        const result = await createActivity(input);
        setLoading(false);

        setOpen(false);

        if (result) {
            setValue(value+1);
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Activity Added Successfully."
            })
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Failed. Try Again Later!"
            })
        }
    }

    const currentDate = new Date().toISOString().slice(0, 10);

    const handleChange = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    return (
        <Dialog open={open} onClose={handleClose} slotProps={{
            paper: {
                component: "form",
                onSubmit: handleClick
            }
        }}>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer+1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogTitle>
                Add New Activity
            </DialogTitle>
            <DialogContent>
                <NewTextField
                    placeholder="Enter the activity"
                    name="activity"
                    onChange={handleChange}
                    variant="outlined"
                    value={input.activity}
                    required
                /><br />
                <NewTextField
                    placeholder="Enter the date"
                    type="date"
                    name="date"
                    onChange={handleChange}
                    variant="outlined"
                    value={input.date}
                    required
                    inputProps={{
                        min: currentDate
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="warning" type="submit">Add</Button>
                <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Activities;