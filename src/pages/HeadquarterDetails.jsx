import React, {useEffect, useState} from 'react'
import Typography from "@mui/material/Typography";
import {useLoaderData} from "react-router-dom";
import {Box, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import UserService from "../services/user.service.js";
import {createData} from "./Users.jsx";
import {useSelector} from "react-redux";


export default function HeadquarterDetails() {
    const user = useSelector((state) => state.auth.value);
    const [headquarter, setHeadquarter] = useState(null);
    const [rows, setRows] = useState([]);

    const res = useLoaderData().data

    useEffect(() => {
        setHeadquarter(res)
        UserService.findByHeadquarter(res._id, user.token)
            .then((res) => {
                setRows(res.data.map(createData));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    if (headquarter === null) {
        return (
            <>
                <Typography component="h2" variant="h3" color="primary" gutterBottom>
                    Headquarter not found
                </Typography>
                <Typography component="p" variant="h4">
                    The headquarter you are looking for does not exist.
                </Typography>
            </>
        )
    }

    return (
        <Box>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Typography component="h2" variant="h3" color="primary" gutterBottom>
                        Headquarter: {headquarter.name}
                    </Typography>
                    <Typography component="p" variant="h4">
                        {headquarter.location.city} - {headquarter.location.address} - {headquarter.location.zipcode}
                    </Typography>
                    <Typography component="p" variant="h5">
                        {headquarter.contact.name} - {headquarter.contact.phone} - {headquarter.contact.email}
                    </Typography>
                    <Typography color="text.secondary" sx={{flex: 1}}>
                        Created at: {new Date(headquarter.createdAt).toLocaleDateString()}
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
                <Paper
                    sx={{
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>First name</TableCell>
                                <TableCell>Last name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.firstname}</TableCell>
                                    <TableCell>{row.lastname}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.createdAt}</TableCell>
                                    <TableCell>{row.updatedAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Box>
    )
}
