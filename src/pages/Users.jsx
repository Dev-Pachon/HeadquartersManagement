import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import { useSelector } from "react-redux";
import UsersEdit from "../components/UsersEdit"
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
  Button,
} from "@mui/material";
import {
  ArrowRightRounded,
  DeleteOutline,
  Edit,
  Search,
} from "@mui/icons-material";

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

function createData({ _id, firstname, lastname, email, createdAt, updatedAt }) {
  return {
    _id,
    firstname,
    lastname,
    email,
    createdAt: new Date(createdAt).toLocaleDateString(),
    updatedAt: new Date(updatedAt).toLocaleDateString(),
  };
}

export default function Users() {
  const user = useSelector((state) => state.auth.value);
  const [userEdited, setUserEdited] = useState({
    firstname: "",
    lastname:"",
    email:""
  });
  const [filtered, setFiltered] = useState("");
  const [search, setSearch] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [rows, setRows] = useState([]);

  const handleSearch = () => {
    setSearch(filtered);
    setSearchModal(false);
    UserService.findByFirstname(filtered, user.token)
      .then((res) => {
        setRows(res.data.map(createData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReload = () => {
    UserService.getAll(user.token)
      .then((res) => {
        setRows(res.data.map(createData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = ()=> {
    setSearch("")
    setFiltered("")
    setSearchModal(false);
    handleReload()
  }

  const handleSearchModalClose = () => {
    setSearchModal(false);
  };

  const handleUpdate = ({row}) => {
    setUpdateModal(true)
    setUserEdited(row)
  };

  const handleDelete = (id) => {
    UserService.remove(id, user.token).then((res) => {
      console.log(res);
      handleReload()
    });
  };

  useEffect(() => {
    handleReload()
  }, []);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Users{" "}
        {search && (
          <>
            <ArrowRightRounded /> Searching for {search}
          </>
        )}
      </Typography>
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
              <TableCell>
                <IconButton onClick={()=> handleUpdate({row})}>
                  <Edit color="success" />
                </IconButton>
                <IconButton onClick={()=>handleDelete(row._id)}>
                  <DeleteOutline color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        onClick={() => setSearchModal(true)}
      >
        <Search />
      </Fab>
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
            <Button variant="contained" color="error" sx={{mr:2}} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>
        </Box>
      </Modal>
      <UsersEdit user={userEdited} setUser={setUserEdited} modalClose={()=>setUpdateModal(false)} modalOpen={updateModal} handleReload={handleReload}/>
    </>
  );
}
