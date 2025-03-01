import { Box, Button, Checkbox, CircularProgress, Pagination, Table, TableBody, TableCell, TableRow, TableHead, Paper, TableContainer, styled } from "@mui/material";
import { useState, useEffect } from "react";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const NewBox = styled(Box)(({theme}) => ({
    paddingBottom: "2vh"
}))

function PaginationTable({ mainLoading, load, headProps, contentProps, target, actions, handleEdit, handleView, handleDelete }: {
    headProps: string[],
    contentProps: object[],
    target: string[],
    actions: string[],
    handleEdit: any,
    handleView: any,
    handleDelete: any,
    mainLoading: boolean,
    load: boolean
}) {
    const [ page, setPage ] = useState(1);
    const [ data, setData ] = useState<object[]>(contentProps.slice((page-1)*10, page*10));

    useEffect(() => {
        setData(contentProps ? contentProps.slice((page-1)*10, page*10): []);
    }, [page, load]);

    return (
        (load || !load) && (
        !mainLoading ? 
        data.length > 0 ?
        <NewBox>
            <TableContainer component={Paper} style={{height: "70vh", overflowY: "auto"}}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {
                                headProps.map((value, index) => {
                                    return (
                                        <TableCell key={index} style={{fontWeight: "bold", textAlign: "center"}}>{value}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((obj: Record<string, any>, index) => {
                                return (
                                    <TableRow key={index}>
                                        {
                                            target.map((tar, index) => {
                                                return (
                                                    <TableCell key={index} style={{textAlign: "center"}}>
                                                        {
                                                            tar === "actions" ?
                                                                actions.map((act: string, index) => {
                                                                    return (
                                                                        <Button key={index} style={{marginLeft: "10px"}}
                                                                            onClick={
                                                                                act === "View" ? handleView
                                                                                :
                                                                                act === "Edit" ? handleEdit
                                                                                :
                                                                                () => handleDelete(obj._id)
                                                                            }>
                                                                                {
                                                                                    act === "View" ? <Visibility />
                                                                                    :
                                                                                    act === "Edit" ? <Edit />
                                                                                    :
                                                                                    <Delete />
                                                                                }
                                                                            </Button>
                                                                    )
                                                                })
                                                            :
                                                            tar === "status" ?
                                                                <Checkbox disabled={obj.status} checked={obj.status} onChange={(e) => handleEdit(obj._id)} />
                                                            :
                                                            tar === "date" ?
                                                                tar in obj && typeof obj[tar] === "string" && obj[tar].slice(0, 10)
                                                            :
                                                            tar in obj && obj[tar]
                                                        }
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination 
                count={Math.ceil(contentProps.length/10)} 
                variant="outlined"
                shape="rounded"
                onChange={(e, value) => setPage(value)}
                style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: "2vh" }}
            />
        </NewBox>
        :
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "10px"}}>
            No Activities to be shown.
        </div>
        :
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "10px"}}>
            <CircularProgress />
        </div>
        )
    )
}

export default PaginationTable;