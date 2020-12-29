import React, { useState, useEffect } from "react";
import PlantDataService from "../services/plant.service";
import UserService from "../services/user.service";

const Offer = () => {
  const [plants, setPlants] = useState([]);
  const [offers, setOffers] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrievePlants();
    retrieveOffers();
  }, []);

  const retrievePlants = () => {
    PlantDataService.getAll()
      .then((res) => {
        setPlants(res.data);
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveOffers = () => {
    UserService.getOffers()
      .then((res) => {
        setOffers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    const id = e.target.value;
    const value = e.target.checked;

    setOffers({ ...offers, [id]: value });
  };

  const updateOffer = () => {
    UserService.updateOffers(offers)
      .then((res) => {
        setMessage("Offer was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>What I can offer...</h4>

        <form>
          {plants &&
            plants.map((plant) => (
              <label key={plant.id}>
                <input
                  type="checkbox"
                  name={plant.id + " " + plant.name}
                  value={plant.id}
                  checked={offers[plant.id] || false}
                  onChange={handleInputChange}
                />
                {plant.name + " - " + plant.species}
              </label>
            ))}
        </form>
        <button type="submit" onClick={() => updateOffer()}>
          Update
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Offer;
