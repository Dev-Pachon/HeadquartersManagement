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

export default function UsersEdit({
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
      lastname: data.get("lastName")
    };

    UserService.update(body, user._id, userState.token).then((res) => {
      handleReload();
    });
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
          Edit an user {user.firstname}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              defaultValue={user.firstname}
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              defaultValue={user.lastname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="password"
              id="password"
              label="Email Address"
              name="password"
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
