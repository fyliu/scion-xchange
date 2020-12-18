import React, { useState, useEffect } from "react";
import PlantDataService from "../services/plant.service";
import { Link } from "react-router-dom";

const PlantsList = () => {
  const [plants, setPlants] = useState([]);
  const [currentPlant, setCurrentPlant] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrievePlants();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrievePlants = () => {
    PlantDataService.getAll()
      .then(res => {
        setPlants(res.data);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActivePlant = (plant, index) => {
    setCurrentPlant(plant);
    setCurrentIndex(index);
  };

  const findByName = () => {
    PlantDataService.findByName(searchName)
      .then(res => {
        setPlants(res.data);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Plants List</h4>

        <ul className="list-group">
          {plants &&
            plants.map((plant, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePlant(plant, index)}
                key={index}
              >
                {plant.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentPlant ? (
          <div>
            <h4>Plant</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentPlant.name}
            </div>
            <div>
              <label>
                <strong>Species:</strong>
              </label>{" "}
              {currentPlant.species}
            </div>
            <Link
              to={"/plants/" + currentPlant.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Plant...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantsList;
