import React, { useState, useEffect } from "react";
import CultivarDataService from "../services/cultivar.service";
import { Link } from "react-router-dom";

const CultivarsList = () => {
  const [cultivars, setCultivars] = useState([]);
  const [currentCultivar, setCurrentCultivar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveCultivars();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCultivars = () => {
    CultivarDataService.getAll()
      .then((res) => {
        setCultivars(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveCultivar = (cultivar, index) => {
    setCurrentCultivar(cultivar);
    setCurrentIndex(index);
  };

  const findByName = () => {
    CultivarDataService.findByName(searchName)
      .then((res) => {
        setCultivars(res.data);
        console.log(res.data);
      })
      .catch((e) => {
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
        <h4>Cultivars List</h4>

        <ul className="list-group">
          {cultivars &&
            cultivars.map((cultivar, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCultivar(cultivar, index)}
                key={index}
              >
                {cultivar.name} - {cultivar.category}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentCultivar ? (
          <div>
            <h4>Cultivar</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentCultivar.name}
            </div>
            <div>
              <label>
                <strong>Category:</strong>
              </label>{" "}
              {currentCultivar.category}
            </div>
            <Link
              to={"/cultivars/" + currentCultivar.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Cultivar...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CultivarsList;
