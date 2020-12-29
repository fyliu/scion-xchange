import React, { useState, useEffect } from "react";
import CultivarDataService from "../services/cultivar.service";

const Cultivar = (props) => {
  const initialCultivarState = {
    id: null,
    name: "",
    species: ""
  };
  const [currentCultivar, setCurrentCultivar] = useState(initialCultivarState);
  const [message, setMessage] = useState("");

  const getCultivar = (id) => {
    CultivarDataService.get(id)
      .then((res) => {
        setCurrentCultivar(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCultivar(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentCultivar({ ...currentCultivar, [name]: value });
  };

  const updateCultivar = () => {
    CultivarDataService.update(currentCultivar.id, currentCultivar)
      .then((res) => {
        console.log(res.data);
        setMessage("The cultivar was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteCultivar = () => {
    CultivarDataService.remove(currentCultivar.id)
      .then((res) => {
        console.log(res.data);
        props.history.push("/cultivars");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCultivar ? (
        <div className="edit-form">
          <h4>Cultivar</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCultivar.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="species">Species</label>
              <input
                type="text"
                className="form-control"
                id="species"
                name="species"
                value={currentCultivar.species}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteCultivar}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCultivar}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Cultivar...</p>
        </div>
      )}
    </div>
  );
};

export default Cultivar;
