import React, { useState } from "react";
import { useAbortableEffect } from "../Utils";
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

  useAbortableEffect((status) => {
    retrieveCategories(status);
  }, []);

  const retrieveCategories = (status) => {
    setIsLoadingCategory(true);
    CategoryDataService.getAll()
      .then((res) => {
        if (!status.aborted) {
          res.data.forEach((category, index) => {
            if (category.name === "Other") {
              const other = res.data.splice(index, 1);
              res.data.push(...other);
            }
          });
          setCategories(res.data);
          setIsLoadingCategory(false);
        }
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
          )} - ${formInputs.name})!`
        );
        setFormInputs({ ...formInputs, name: "" });
        setSubmitted(true);
      })
      .catch((e) => {
        const resMessage =
          (e.response && e.response.data && e.response.data.message) ||
          e.message ||
          e.toString();

        setMessage(resMessage);
      });
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => {
      return category.id === +categoryId;
    });
    return category.name;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    saveCultivar();
  };

  return (
    <form onSubmit={handleFormSubmit} action="#">
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
              <button className="btn btn-success col align-self-center">
                Add
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddCultivar;
