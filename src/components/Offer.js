import React, { useState, useEffect } from "react";
import "../App.css";
import PlantDataService from "../services/plant.service";

const Offer = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    retrievePlants();
  }, []);

  const retrievePlants = () => {
    PlantDataService.getAll()
      .then(res => {
        setPlants(res.data);
        //console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onSubmit = e => {
    e.preventDefault();

    console.log(e);
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>What I can offer...</h4>

        <form onSubmit={onSubmit}>
          {plants &&
            plants.map(plant => (
              <div key={plant.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={plant.id}
                />
                <label className="form-check-label" htmlFor={plant.id}>
                  {plant.name + " - " + plant.species}
                </label>
              </div>
            ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Offer;
