import React, { useState } from "react";
import { useAbortableEffect } from "../Utils";
import CategoryDataService from "../services/category.service";
import CultivarDataService from "../services/cultivar.service";
import UserService from "../services/user.service";
import AddCultivar from "./AddCultivar";

const Offer = () => {
  const [categories, setCategories] = useState([]);
  const [cultivars, setCultivars] = useState([]);
  const [offers, setOffers] = useState({});
  const [message, setMessage] = useState("");

  useAbortableEffect((status) => {
    retrieveOffers(status);
    retrieveCultivars(status);
    retrieveCategories(status);
  }, []);

  const retrieveCategories = (status) => {
    CategoryDataService.getAll()
      .then((res) => {
        if (!status.aborted) {
          setCategories(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCultivars = (status) => {
    CultivarDataService.getAll()
      .then((res) => {
        if (!status.aborted) {
          setCultivars(res.data);
          //console.log(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveOffers = (status) => {
    UserService.getOffers()
      .then((res) => {
        if (!status.aborted) {
          setOffers(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    const name = e.target.id;
    const id = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (name === "offerDescription") {
      setOffers({
        ...offers,
        [id]: { ...offers[id], offerDescription: value }
      });
    } else {
      setOffers({ ...offers, [id]: { ...offers[id], offer: value } });
    }
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

  const getCategoryName = (categoryId) => {
    for (let category of categories) {
      if (category.id === categoryId) {
        return category.name;
      }
    }
    return "";
  };

  const handleCultivarAdded = (cultivar) => {
    setCultivars([
      ...cultivars,
      { ...cultivar, category: getCategoryName(cultivar.categoryId) }
    ]);
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="container mb-5">
          <h4 className="title is-4">What I can offer...</h4>

          <div className="is-flex is-flex-direction-column">
            {cultivars &&
              cultivars.map((cultivar) => (
                <React.Fragment key={cultivar.id}>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      id={cultivar.id}
                      name={cultivar.id}
                      value={cultivar.id}
                      checked={
                        (offers[cultivar.id] && offers[cultivar.id].offer) ||
                        false
                      }
                      onChange={handleInputChange}
                    />
                    {cultivar.category + " - " + cultivar.name}
                  </label>
                  {offers[cultivar.id] && offers[cultivar.id].offer ? (
                    <textarea
                      className="textarea"
                      id="offerDescription"
                      name={cultivar.id}
                      rows="1"
                      onChange={handleInputChange}
                      placeholder="Description: Address, email, phone, dates to pickup"
                      value={
                        offers[cultivar.id] &&
                        offers[cultivar.id].offerDescription
                      }
                    />
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ))}
          </div>
          <button type="submit" onClick={() => updateOffer()}>
            Update
          </button>
          <p>{message}</p>
        </div>
        <div className="container">
          <label className="has-text-weight-bold">Add Cultivar</label>
          <AddCultivar onCultivarAdded={handleCultivarAdded} />
        </div>
      </div>
    </div>
  );
};

export default Offer;
