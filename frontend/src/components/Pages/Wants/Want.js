import React, { useState, useEffect } from "react";
import { useAbortableEffect } from "Utils";
import CategoryDataService from "services/category.service";
import CultivarDataService from "services/cultivar.service";
import UserService from "services/user.service";
import AddCultivar from "components/AddCultivar";
import EventBus from "common/EventBus";

const Want = () => {
  const [categories, setCategories] = useState([]);
  const [cultivars, setCultivars] = useState([]);
  const [filteredCultivars, setFilteredCultivars] = useState([]);
  const [wants, setWants] = useState({});
  const [message, setMessage] = useState("");
  const [newCultivar, setNewCultivar] = useState(false);

  useAbortableEffect((status) => {
    retrieveCultivars(status);
    retrieveWants(status);
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
        //console.log(e);
        if (e.response && e.response.status === 403) {
          EventBus.dispatch("logout");
        }
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

  const retrieveWants = (status) => {
    UserService.getWants()
      .then((res) => {
        if (!status.aborted) {
          setWants(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    //const name = e.target.id;
    const id = e.target.name;
    const value = e.target.checked;

    setWants({ ...wants, [id]: { ...wants[id], want: value } });
  };

  const updateWant = () => {
    UserService.updateWants(wants)
      .then((res) => {
        setMessage("Want was updated successfully!");
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
    setWants({
      ...wants,
      [cultivar.id]: { ...wants[cultivar.id], want: true }
    });
    setCultivars([
      ...cultivars,
      { ...cultivar, category: getCategoryName(cultivar.categoryId) }
    ]);
  };

  useEffect(() => {
    if (newCultivar) {
      updateWant();
      setNewCultivar(false);
    }
  }, [wants]);

  const formatQuantity = (units, value) => {
    return value > 1 ? units[1] : units[0];
  };

  const quantityOffered = (cultivar) => {
    const quantity = cultivar.offers.reduce(
      (totals, offer) => {
        return {
          offered: totals.offered + offer.offerQuantity,
          offers: totals.offers + 1
        };
      },
      { offered: 0, offers: 0 }
    );
    return quantity.offered > 0 && quantity.offers > 0 ? (
      <label>
        <span className="tag">
          {quantity.offered} available from{" "}
          {quantity.offers +
            " " +
            formatQuantity(["person", "people"], quantity.offers)}
        </span>
      </label>
    ) : quantity.offers > 0 ? (
      <label>
        <span className="tag">
          offered by{" "}
          {quantity.offers +
            " " +
            formatQuantity(["person", "people"], quantity.offers)}
        </span>
      </label>
    ) : null;
  };

  const filterList = (e) => {
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
        <h4 className="title is-4">What I want...</h4>

        <table className="table is-striped is-narrow is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Cultivar</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredCultivars &&
              filteredCultivars.map((cultivar) => (
                <tr key={cultivar.id}>
                  <td>
                    <div className="field is-grouped">
                      <p className="control">
                        <input
                          type="checkbox"
                          id={cultivar.id}
                          name={cultivar.id}
                          value={cultivar.id}
                          checked={
                            (wants[cultivar.id] && wants[cultivar.id].want) ||
                            false
                          }
                          onChange={handleInputChange}
                        />
                        <label className="checkbox">
                          {cultivar.category + " - " + cultivar.name}
                        </label>
                      </p>
                      {quantityOffered(cultivar)}
                    </div>
                  </td>
                  <td>
                    {cultivar.offers.map((offer) => {
                      return offer.description !== "" ? (
                        <label key={offer.username}>
                          <strong>{offer.username}</strong> :{" "}
                          {offer.description}
                        </label>
                      ) : (
                        ""
                      );
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button type="submit" onClick={() => updateWant()}>
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

export default Want;
