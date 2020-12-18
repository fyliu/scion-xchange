import React, { useState } from "react";
import PlantDataService from "../services/plant.service";

const AddPlant = () => {
  const initialPlantState = {
    id: null,
    name: "",
    species: ""
  };
  const [plant, setPlant] = useState(initialPlantState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPlant({ ...plant, [name]: value });
  };

  const savePlant = () => {
    var data = {
      name: plant.name,
      species: plant.species
    };

    PlantDataService.create(data)
      .then(res => {
        setPlant({
          id: res.data.id,
          name: res.data.name,
          species: res.data.species
        });
        setSubmitted(true);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPlant = () => {
    setPlant(initialPlantState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfullly!</h4>
          <button className="btn btn-success" onClick={newPlant}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form=group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={plant.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form=group">
            <label htmlFor="species">Species</label>
            <input
              type="text"
              className="form-control"
              id="species"
              required
              value={plant.species}
              onChange={handleInputChange}
              name="species"
            />
          </div>

          <button onClick={savePlant} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPlant;
