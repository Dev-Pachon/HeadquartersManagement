import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  IconButton,
  Fab,
  Box,
  Modal,
  TextField,
  Button, Icon,
} from "@mui/material";
import {
  Add,
  ArrowRightRounded,
  DeleteOutline,
  Edit, Preview,
  Search,
} from "@mui/icons-material";
import HeadquarterService from "../services/headquarter.service";
import HeadquarterEdit from "../components/HeadquarterEdit.jsx";
import HeadquarterCreate from "../components/HeadquarterCreate.jsx";
import {Link} from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

function createData({ _id, name, contact, location, createdAt, updatedAt }) {
  return {
    _id,
    name,
    contact,
    location,
    createdAt: new Date(createdAt).toLocaleDateString(),
    updatedAt: new Date(updatedAt).toLocaleDateString(),
  };
}

export default function Headquarters() {
  const user = useSelector((state) => state.auth.value);
  const [headquarterEdited, setHeadquarterEdited] = useState({
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
  const [filtered, setFiltered] = useState("");
  const [search, setSearch] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const [rows, setRows] = useState([]);

  const handleSearch = () => {
    setSearch(filtered);
    setSearchModal(false);
    HeadquarterService.findByName(filtered, user.token)
      .then((res) => {
        setRows(res.data.map(createData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReload = () => {
    HeadquarterService.getAll(user.token)
      .then((res) => {
        setRows(res.data.map(createData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setSearch("");
    setFiltered("");
    setSearchModal(false);
    handleReload();
  };

  const handleSearchModalClose = () => {
    setSearchModal(false);
  };

  const handleUpdate = ({ row }) => {
    setUpdateModal(true);
    setHeadquarterEdited(row);
  };

  const handleDelete = (id) => {
    HeadquarterService.remove(id, user.token).then((res) => {
      console.log(res);
      handleReload();
    });
  };

  useEffect(() => {
    handleReload();
  }, []);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Headquarters{" "}
        {search && (
          <>
            <ArrowRightRounded /> Searching for {search}
          </>
        )}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.contact.name}</TableCell>
              <TableCell>{row.contact.phone}</TableCell>
              <TableCell>{row.contact.email}</TableCell>
              <TableCell>{row.location.city}</TableCell>
              <TableCell>{row.location.address}</TableCell>
              <TableCell>{row.location.zipcode}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleUpdate({ row })}>
                  <Edit color="success" />
                </IconButton>
                <IconButton onClick={() => handleDelete(row._id)}>
                  <DeleteOutline color="error" />
                </IconButton>
                <IconButton to={"/headquarters/"+row._id} component={Link}>
                  <Preview/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
        <Fab
          color="primary"
          aria-label="search"
          sx={{ mr: 2}}
          onClick={() => setSearchModal(true)}
        >
          <Search />
        </Fab>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setCreateModal(true)}
        >
          <Add />
        </Fab>
      </Box>
      <Modal open={searchModal} onClose={handleSearchModalClose}>
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search an user
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="filter"
            label="Type a word to search"
            name="filter"
            autoFocus
            onChange={(e) => setFiltered(e.target.value)}
          />

          <Box>
            <Button
              variant="contained"
              color="error"
              sx={{ mr: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>
        </Box>
      </Modal>
      <HeadquarterEdit
        headquarter={headquarterEdited}
        setHeadquarter={setHeadquarterEdited}
        modalClose={() => setUpdateModal(false)}
        modalOpen={updateModal}
        handleReload={handleReload}
      />
      <HeadquarterCreate
          modalClose={() => setCreateModal(false)}
          modalOpen={createModal}
          handleReload={handleReload}
      />
    </>
  );
}
