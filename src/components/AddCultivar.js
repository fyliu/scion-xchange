import React, { useState } from "react";
import CultivarDataService from "../services/cultivar.service";

const AddCultivar = () => {
  const initialCultivarState = {
    id: null,
    name: "",
    species: ""
  };
  const [cultivar, setCultivar] = useState(initialCultivarState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCultivar({ ...cultivar, [name]: value });
  };

  const saveCultivar = () => {
    var data = {
      name: cultivar.name,
      species: cultivar.species
    };

    CultivarDataService.create(data)
      .then((res) => {
        setCultivar({
          id: res.data.id,
          name: res.data.name,
          species: res.data.species
        });
        setSubmitted(true);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newCultivar = () => {
    setCultivar(initialCultivarState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfullly!</h4>
          <button className="btn btn-success" onClick={newCultivar}>
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
              value={cultivar.name}
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
              value={cultivar.species}
              onChange={handleInputChange}
              name="species"
            />
          </div>

          <button onClick={saveCultivar} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCultivar;
