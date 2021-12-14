import React, { useState, useEffect } from "react";
import CultivarDataService from "services/cultivar.service";
import CategoryDataService from "services/category.service";

const Cultivar = (props) => {
  const initialCultivarState = {
    id: null,
    category: "",
    name: ""
  };
  const [currentCultivar, setCurrentCultivar] = useState(initialCultivarState);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveCategories();
  }, []);

  const retrieveCategories = () => {
    CategoryDataService.getAll()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getCultivar = (id) => {
    CultivarDataService.get(id)
      .then((res) => {
        setCurrentCultivar(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCultivar(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (e) => {
    const value =
      e.target.type === "select-one" ? +e.target.value : e.target.value;
    const { name } = e.target;
    setCurrentCultivar({ ...currentCultivar, [name]: value });
  };

  const updateCultivar = () => {
    CultivarDataService.update(currentCultivar.id, currentCultivar)
      .then((res) => {
        setMessage("The cultivar was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteCultivar = () => {
    CultivarDataService.remove(currentCultivar.id)
      .then((res) => {
        console.log(res.data);
        props.history.push("/cultivars");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCultivar ? (
        <div className="edit-form">
          <h4>Cultivar</h4>
          <form>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                className="form-control"
                id="category"
                onChange={handleInputChange}
                name="categoryId"
                value={currentCultivar.categoryId}
              >
                <option value="">-</option>
                {categories &&
                  categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCultivar.name}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteCultivar}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCultivar}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Cultivar...</p>
        </div>
      )}
    </div>
  );
};

export default Cultivar;
