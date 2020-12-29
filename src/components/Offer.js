import React, { useState, useEffect } from "react";
import CultivarDataService from "../services/cultivar.service";
import UserService from "../services/user.service";

const Offer = () => {
  const [cultivars, setCultivars] = useState([]);
  const [offers, setOffers] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveCultivars();
    retrieveOffers();
  }, []);

  const retrieveCultivars = () => {
    CultivarDataService.getAll()
      .then((res) => {
        setCultivars(res.data);
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
          {cultivars &&
            cultivars.map((cultivar) => (
              <label key={cultivar.id}>
                <input
                  type="checkbox"
                  name={cultivar.id + " " + cultivar.name}
                  value={cultivar.id}
                  checked={offers[cultivar.id] || false}
                  onChange={handleInputChange}
                />
                {cultivar.name + " - " + cultivar.species}
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
