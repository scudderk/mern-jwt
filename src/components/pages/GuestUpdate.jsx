import React, { Component } from "react";
import api from "../../api";
import Loading from "../misc/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class GuestUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      forename: "",
      surname: "",
      guestGroupID: "",
      isLoading: true,
    };
  }

  handleChangeInputForename = async (event) => {
    const forename = event.target.value;
    this.setState({ forename });
  };
  handleChangeInputSurname = async (event) => {
    const surname = event.target.value;
    this.setState({ surname });
  };
  handleChangeInputGuestGroupID = async (event) => {
    const guestGroupID = event.target.validity.valid
      ? event.target.value
      : this.state.guestGroupID;

    this.setState({ guestGroupID });
  };

  handleUpdateGuest = async () => {
    try {
      const { id, forename, surname, guestGroupID } = this.state;
      const payload = { forename, surname, guestGroupID };

      await api.updateGuestById(id, payload);
      this.setState({
        forename: payload.forename,
        surname: payload.surname,
        guestGroupID: payload.guestGroupID,
      });
      toast.success("Saved successfully 👍", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      window.location.href = `/login`;
    }
  };

  componentDidMount = async () => {
    try {
      const { id } = this.state;
      const guest = await api.getGuestById(id);
      console.log(guest);
      this.setState({
        forename: guest.data.data.forename,
        surname: guest.data.data.surname,
        guestGroupID: guest.data.data.guestGroupID,
      });
      this.setState({ isLoading: false });
    } catch (err) {
      window.location.href = `/login`;
    }
  };

  render() {
    const { forename, surname, guestGroupID, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="form-group">
            <ToastContainer />
            <div className="row">
              <div className="col">
                <div className="h1">Update Guest Details</div>
              </div>
              <div className="col">
                <a className="btn btn-primary float-right" href={"/guest/list"}>
                  Back to guests
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="labelMargin">Forename: </label>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  type="text"
                  value={forename}
                  onChange={this.handleChangeInputForename}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="labelMargin">Surname: </label>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  type="text"
                  value={surname}
                  onChange={this.handleChangeInputSurname}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="labelMargin">Guest Group ID: </label>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  type="number"
                  value={guestGroupID}
                  onChange={this.handleChangeInputGuestGroupID}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={this.handleUpdateGuest}
                >
                  Update Guest
                </button>
                <a className="btn btn-danger ml-2" href={"/guest/list"}>
                  Cancel
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GuestUpdate;
