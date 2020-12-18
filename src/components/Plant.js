import React, { useState, useEffect } from "react";
import PlantDataService from "../services/plant.service";

const Plant = props => {
  const initialPlantState = {
    id: null,
    name: "",
    species: ""
  };
  const [currentPlant, setCurrentPlant] = useState(initialPlantState);
  const [message, setMessage] = useState("");

  const getPlant = id => {
    PlantDataService.get(id)
      .then(res => {
        setCurrentPlant(res.data);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPlant(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPlant({ ...currentPlant, [name]: value });
  };

  const updatePlant = () => {
    PlantDataService.update(currentPlant.id, currentPlant)
      .then(res => {
        console.log(res.data);
        setMessage("The plant was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePlant = () => {
    PlantDataService.remove(currentPlant.id)
      .then(res => {
        console.log(res.data);
        props.history.push("/plants");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPlant ? (
        <div className="edit-form">
          <h4>Plant</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentPlant.name}
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
                value={currentPlant.species}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deletePlant}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePlant}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Plant...</p>
        </div>
      )}
    </div>
  );
};

export default Plant;
