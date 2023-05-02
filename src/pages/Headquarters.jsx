import axios from "../utils/axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalRouter, ModalHeader } from "reactstrap";

const url = axios;
class HQ extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      name:'',
      contactName:'',
      contactPhone:'',
      contactEmail:'',
      city:'',
      address:'',
      zipcode:''
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
    axios.put(url+this.state.form.name, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }

  peticionDelete=()=>{
    axios.delete(url+this.state.form.name).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarSede=(headquarters)=>{
    this.setState({
      tipoModal: 'actualizar',
      form:{
        name: headquarters.name,
        contactName: headquarters.contact.name,
        contactPhone:headquarters.contact.phone,
        contactEmail:headquarters.contact.email,
        city:headquarters.location.city,
        address:headquarters.location.address,
        zipcode:headquarters.location.zipcode
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

function Headquarters() {
  const { form } = this.state;
  return (
    <div className="Headquarters">
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
            <th>Nombre</th>
            <th>Nombre contacto</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Ciudad</th>
            <th>Direccion</th>
            <th>Codigo postal</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((headquarters) => {
            return (
              <tr>
                <td>{headquarters.name}</td>
                <td>{headquarters.contact.name}</td>
                <td>{headquarters.contact.phone}</td>
                <td>{headquarters.contact.email}</td>
                <td>{headquarters.location.city}</td>
                <td>{headquarters.location.address}</td>
                <td>{headquarters.location.zipcode}</td>

                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.seleccionarSede(headquarters);
                      this.modalInsertar();
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  {"   "}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.seleccionarSede(headquarters);
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
            <label htmlFor="id">Nombre</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              readOnly
              onChange={this.handleChange}
              value={form ? form.name : ""}
            />
            <br />
            <label htmlFor="nombre">Nombre contacto</label>
            <input
              className="form-control"
              type="text"
              name="contact.name"
              id="contact.name"
              onChange={this.handleChange}
              value={form ? form.contactName : ""}
            />
            <br />
            <label htmlFor="nombre">Telefono</label>
            <input
              className="form-control"
              type="text"
              name="contact.phone"
              id="phone"
              onChange={this.handleChange}
              value={form ? form.contactPhone : ""}
            />
            <br />
            <label htmlFor="nombre">Email</label>
            <input
              className="form-control"
              type="text"
              name="contact.email"
              id="contact.email"
              onChange={this.handleChange}
              value={form ? form.contactEmail : ""}
            />
            <br />
            <label htmlFor="nombre">Ciudad</label>
            <input
              className="form-control"
              type="text"
              name="location.city"
              id="city"
              onChange={this.handleChange}
              value={form ? form.city : ""}
            />
            <br />
            <label htmlFor="nombre">Direccion</label>
            <input
              className="form-control"
              type="text"
              name="location.address"
              id="address"
              onChange={this.handleChange}
              value={form ? form.address : ""}
            />
            <br />
            <label htmlFor="nombre">Codigo zip</label>
            <input
              className="form-control"
              type="text"
              name="location.zipcode"
              id="zipcode"
              onChange={this.handleChange}
              value={form ? form.zipcode : ""}
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
          Estás seguro que deseas eliminar a la sede {form && form.name}
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
  );
}

export default Headquarters;
