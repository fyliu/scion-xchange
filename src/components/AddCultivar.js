import React, { useState, useEffect } from "react";
import CultivarDataService from "../services/cultivar.service";
import CategoryDataService from "../services/category.service";

const AddCultivar = ({ onCultivarAdded }) => {
  const initialCultivarState = {
    id: null,
    category: "",
    name: ""
  };
  const [message, setMessage] = useState("");
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [formInputs, setFormInputs] = useState(initialCultivarState);
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    retrieveCategories();
  }, []);

  const retrieveCategories = () => {
    setIsLoadingCategory(true);
    CategoryDataService.getAll()
      .then((res) => {
        setCategories(res.data);
        setIsLoadingCategory(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    setSubmitted(false);
    setMessage("");
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const saveCultivar = () => {
    var data = {
      name: formInputs.name,
      category: formInputs.categoryId
    };

    CultivarDataService.create(data)
      .then((res) => {
        onCultivarAdded && onCultivarAdded(res.data);
        setMessage(
          `You submitted successfully (${getCategoryName(
            formInputs.categoryId
          )} ${formInputs.name})!`
        );
        setFormInputs({ ...formInputs, name: "" });
        setSubmitted(true);
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

  return (
    <div>
      {submitted ? (
        <div>
          <p>{message}</p>
        </div>
      ) : (
        ""
      )}
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="field has-addons has-addons-centered">
            <p className="control">
              <span
                className={`select ${isLoadingCategory ? "is-loading" : ""}`}
              >
                <select
                  className="form-control"
                  id="category"
                  onChange={handleInputChange}
                  name="categoryId"
                  value={formInputs.categoryId}
                >
                  <option value="">Category</option>
                  {categories &&
                    categories.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </span>
            </p>
            <p className="control is-expanded">
              <input
                type="text"
                className="input"
                placeholder="Cultivar name"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={formInputs.name}
              />
            </p>
            <p className="control">
              <button
                onClick={saveCultivar}
                className="btn btn-success col align-self-center"
              >
                Submit
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCultivar;
