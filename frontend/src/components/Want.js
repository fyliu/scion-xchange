import React, { useState } from "react";
import { useAbortableEffect } from "../Utils";
import CategoryDataService from "../services/category.service";
import CultivarDataService from "../services/cultivar.service";
import UserService from "../services/user.service";
import AddCultivar from "./AddCultivar";

const Want = () => {
  const [categories, setCategories] = useState([]);
  const [cultivars, setCultivars] = useState([]);
  const [wants, setWants] = useState({});
  const [message, setMessage] = useState("");

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
    const name = e.target.id;
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
    setCultivars([
      ...cultivars,
      { ...cultivar, category: getCategoryName(cultivar.categoryId) }
    ]);
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="container mb-5">
          <h4 className="title is-4">What I want...</h4>

          <div className="is-flex is-flex-direction-column">
            {cultivars &&
              cultivars.map((cultivar) => (
                <label key={cultivar.id}>
                  <input
                    type="checkbox"
                    id={cultivar.id}
                    name={cultivar.id}
                    value={cultivar.id}
                    checked={
                      (wants[cultivar.id] && wants[cultivar.id].want) || false
                    }
                    onChange={handleInputChange}
                  />
                  {cultivar.category + " - " + cultivar.name}
                </label>
              ))}
          </div>
          <button type="submit" onClick={() => updateWant()}>
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

export default Want;
