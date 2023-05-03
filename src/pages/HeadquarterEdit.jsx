import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";

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

export default function HeadquarterEdit({
  modalOpen,
  modalClose,
  user,
  setUser,
  handleReload,
}) {
  const userState = useSelector((state) => state.auth.value);

  const handleCancel = () => {
    setUser({});
    modalClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const body = {
      firstname: data.get("firstName"),
      lastname: data.get("lastName"),
    };

    console.log(Array.of(data.entries()))

    /*UserService.update(body, user._id, userState.token).then((res) => {
      handleReload();
    });*/
    modalClose();
  };

  return (
    <Modal open={modalOpen} onClose={modalClose}>
      <Box sx={modalStyle} component="form" noValidate onSubmit={handleSubmit}>
        <Typography
          id="modal-modal-title"
          sx={{ my: 2 }}
          variant="h4"
          component="h2"
        >
          Edit a Headquarter {user.firstname}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              required
              fullWidth
              defaultValue={user.firstname}
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
              id="contact_name"
              label="Contact name"
              name="contact_name"
              defaultValue={user.lastname}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              required
              fullWidth
              id="contact_phone"
              label="Contact phone"
              name="contact_phone"
              defaultValue={user.lastname}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              required
              fullWidth
              id="contact_email"
              label="Contact email"
              name="contact_email"
              defaultValue={user.lastname}
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
              id="location_city"
              label="City"
              name="location_city"
              defaultValue={user.lastname}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              required
              fullWidth
              id="location_address"
              label="Address"
              name="location_address"
              defaultValue={user.lastname}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              required
              fullWidth
              id="location_zipcode"
              label="Zip code"
              name="location_zipcode"
              defaultValue={user.lastname}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="error"
            sx={{ mr: 2 }}
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
