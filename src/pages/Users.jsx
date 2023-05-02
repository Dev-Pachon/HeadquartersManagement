import axios from "../utils/axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalRouter, ModalHeader } from "reactstrap";

const url = axios;
//Verify api
class User extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      id:'',
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      headquarter:''
    },
    tipoModal:''
  };

  peticionGet = () => {
    axios.get(url).then((response) => {
      this.setState({ data: response.data });
    });
  };


  peticionPost=async()=>{
   await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionPut=()=>{
    axios.put(url+this.state.form.id, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }

  peticionDelete=()=>{
    axios.delete(url+this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarUsuario=(users)=>{
    this.setState({
      tipoModal: 'actualizar',
      form:{
        id:users.id,
        firstname: users.firstname,
        lastname: users.lastname,
        email:users.email,
        password:users.password,
        headquarter:users.headquarter
      }
    })
  }
  handleChange=async e=>{
    e.persist();
    await this.setState({
      ...this.state.form,
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    this.peticionGet();
  }
}
export default function Users() {
    const { form } = this.state;
  return (
    <div className="Users">
      <br />
      <br />
      <br />
      <button
        className="btn btn-success"
        onClick={() => {
          this.setState({ form: null, tipoModal: "insertar" });
          this.modalInsertar();
        }}
      >
        Agregar Sede
      </button>
      <br />
      <br />
      <table className="table ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Sede</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((users) => {
            return (
              <tr>
                <td>{users.id}</td>
                <td>{users.firstname}</td>
                <td>{users.lastname}</td>
                <td>{users.email}</td>
                <td>{users.password}</td>
                <td>{users.headquarter}</td>

                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.seleccionarUsuario(users);
                      this.modalInsertar();
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  {"   "}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.seleccionarUsuario(users);
                      this.setState({ modalEliminar: true });
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{ display: "block" }}>
          <span style={{ float: "right" }} onClick={() => this.modalInsertar()}>
            x
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              className="form-control"
              type="text"
              name="id"
              id="id"
              readOnly
              onChange={this.handleChange}
              value={form ? form.id : ""}
            />
            <br />
            <label htmlFor="nombre">Nombre</label>
            <input
              className="form-control"
              type="text"
              name="firstname"
              id="firstname"
              onChange={this.handleChange}
              value={form ? form.firstname : ""}
            />
            <br />
            <label htmlFor="nombre">Apellido</label>
            <input
              className="form-control"
              type="text"
              name="lastname"
              id="lastname"
              onChange={this.handleChange}
              value={form ? form.lastname : ""}
            />
            <br />
            <label htmlFor="nombre">Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              id="email"
              onChange={this.handleChange}
              value={form ? form.email : ""}
            />
            <br />
            <label htmlFor="nombre">Contraseña</label>
            <input
              className="form-control"
              type="text"
              name="password"
              id="password"
              onChange={this.handleChange}
              value={form ? form.password : ""}
            />
            <br />
            <label htmlFor="nombre">Sede</label>
            <input
              className="form-control"
              type="text"
              name="headquarter"
              id="headquarter"
              onChange={this.handleChange}
              value={form ? form.headquarter : ""}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          {this.state.tipoModal == "insertar" ? (
            <button
              className="btn btn-success"
              onClick={() => this.peticionPost()}
            >
              Insertar
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => this.peticionPut()}
            >
              Actualizar
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={() => this.modalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalEliminar}>
        <ModalBody>
          Estás seguro que deseas eliminar al usuario {form && form.name}
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => this.peticionDelete()}
          >
            Sí
          </button>
          <button
            className="btn btn-secundary"
            onClick={() => this.setState({ modalEliminar: false })}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
