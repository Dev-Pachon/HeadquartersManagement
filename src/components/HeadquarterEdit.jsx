import {Box, Button, Grid, Modal, TextField, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import HeadquarterService from "../services/headquarter.service.js";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
};

export default function HeadquarterEdit({modalOpen, modalClose, headquarter, setHeadquarter, handleReload}) {
    const userState = useSelector((state) => state.auth.value);

    const handleCancel = () => {
        setHeadquarter({
            name: "",
            contact: {
                name: "",
                phone: "",
                email: "",
            },
            location: {
                city: "",
                address: "",
                zipcode: ""
            }
        });
        modalClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const body = {
            name: data.get("name"),
            contact: {
                name: data.get("contact.name"),
                phone: data.get("contact.phone"),
                email: data.get("contact.email"),
            },
            location: {
                city: data.get("location.city"),
                address: data.get("location.address"),
                zipcode: data.get("location.zipcode")
            }
        }

        console.log(body);

        HeadquarterService.update(body, headquarter._id, userState.token).then((res) => {
            handleReload();
        });
        modalClose();
    };

    return (
        <Modal open={modalOpen} onClose={modalClose}>
            <Box sx={modalStyle} component="form" noValidate onSubmit={handleSubmit}>
                <Typography
                    id="modal-modal-title"
                    sx={{my: 2}}
                    variant="h4"
                    component="h2"
                >
                    Edit a Headquarter {headquarter.name}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            required
                            fullWidth
                            defaultValue={headquarter.name}
                            id="name"
                            label="Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <Typography id="modal-modal-subtitle1" variant="p" component="p">
                            Contact
                        </Typography>
                    </Grid>

                    <Grid item sm={4}>
                        <TextField
                            required
                            fullWidth
                            id="contact.name"
                            label="Contact name"
                            name="contact.name"
                            defaultValue={headquarter.contact.name}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            required
                            fullWidth
                            id="contact.phone"
                            label="Contact phone"
                            name="contact.phone"
                            defaultValue={headquarter.contact.phone}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            required
                            fullWidth
                            id="contact.email"
                            label="Contact email"
                            name="contact.email"
                            defaultValue={headquarter.contact.email}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <Typography id="modal-modal-subtitle2" variant="p" component="p">
                            Location
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            required
                            fullWidth
                            id="location.city"
                            label="City"
                            name="location.city"
                            defaultValue={headquarter.location.city}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            required
                            fullWidth
                            id="location.address"
                            label="Address"
                            name="location.address"
                            defaultValue={headquarter.location.address}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            required
                            fullWidth
                            id="location.zipcode"
                            label="Zip code"
                            name="location.zipcode"
                            defaultValue={headquarter.location.zipcode}
                        />
                    </Grid>
                </Grid>
                <Box sx={{mt: 2}}>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{mr: 2}}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                        Edit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
