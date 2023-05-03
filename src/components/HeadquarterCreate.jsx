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

export default function HeadquarterCreate({modalOpen, modalClose, handleReload}) {
  const userState = useSelector((state) => state.auth.value);

  const handleCancel = () => {
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

    HeadquarterService.create(body, userState.token).then((res) => {
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
            Create a Headquarter
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                  name="name"
                  required
                  fullWidth
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
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                  required
                  fullWidth
                  id="contact.phone"
                  label="Contact phone"
                  name="contact.phone"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                  required
                  fullWidth
                  id="contact.email"
                  label="Contact email"
                  name="contact.email"
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
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                  required
                  fullWidth
                  id="location.address"
                  label="Address"
                  name="location.address"
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                  required
                  fullWidth
                  id="location.zipcode"
                  label="Zip code"
                  name="location.zipcode"
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
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
  );
}
