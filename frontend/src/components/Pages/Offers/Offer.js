import React, { useState, useEffect } from "react";
import { useAbortableEffect } from "Utils";
import CategoryDataService from "services/category.service";
import CultivarDataService from "services/cultivar.service";
import UserService from "services/user.service";
import CultivarsList from "components/CultivarsList";
import AddCultivar from "components/AddCultivar";
import EventBus from "common/EventBus";

const Offer = () => {
  const [categories, setCategories] = useState([]);
  const [cultivars, setCultivars] = useState([]);
  const [filteredCultivars, setFilteredCultivars] = useState([]);
  const [offers, setOffers] = useState({});
  const [message, setMessage] = useState("");
  const [newCultivar, setNewCultivar] = useState(false);

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

  const categoryOther = (cultivar) => {
    return cultivar.category === "Other";
  };

  const findLastIndex = (array, compareFn) => {
    const index = array.slice().reverse().findIndex(compareFn);
    const count = array.length - 1;
    return index >= 0 ? count - index : index;
  };

  const moveOtherToEnd = (cultivars) => {
    const first = cultivars.findIndex(categoryOther);
    const last = findLastIndex(cultivars, categoryOther);
    cultivars.push(...cultivars.splice(first, last - first + 1));
  };

  const retrieveCultivars = (status) => {
    CultivarDataService.getAll()
      .then((res) => {
        if (!status.aborted) {
          moveOtherToEnd(res.data);
          setCultivars(res.data);
          setFilteredCultivars(res.data);
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
        if (e.response && e.response.status === 403) {
          EventBus.dispatch("logout");
        }
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
    } else if (name === "offerQuantity") {
      setOffers({
        ...offers,
        [id]: { ...offers[id], offerQuantity: value }
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
    setNewCultivar(true);
    setOffers({
      ...offers,
      [cultivar.id]: { ...offers[cultivar.id], offer: true }
    });
    setCultivars([
      ...cultivars,
      { ...cultivar, category: getCategoryName(cultivar.categoryId) }
    ]);
  };

  useEffect(() => {
    setFilteredCultivars(cultivars);
  }, [cultivars]);

  useEffect(() => {
    if (newCultivar) {
      updateOffer();
      setNewCultivar(false);
    }
  }, [offers]);

  const filterList = (e) => {
    if (e.target.name !== "name") return;
    const filteredList = cultivars.filter((item) => {
      return (
        item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    setFilteredCultivars(filteredList);
  };

  return (
    <>
      <div className="container mb-5">
        <h4 className="title is-4">What I can offer...</h4>

        <CultivarsList
          cultivars={filteredCultivars}
          offers={offers}
          handleInputChange={handleInputChange}
        />
        <button type="submit" onClick={() => updateOffer()}>
          Update
        </button>
        <p>{message}</p>
      </div>
      <div className="container">
        <label className="has-text-weight-bold">Add Cultivar</label>
        <AddCultivar
          onCultivarAdded={handleCultivarAdded}
          onChange={filterList}
        />
      </div>
    </>
  );
};
export default Offer;
