import React, { useState, useEffect } from "react";
import CultivarDataService from "../services/cultivar.service";
import CategoryDataService from "../services/category.service";

const AddCultivar = () => {
  const initialCultivarState = {
    id: null,
    category: "",
    name: ""
  };
  const [formInputs, setFormInputs] = useState(initialCultivarState);
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);

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

  const handleInputChange = (e) => {
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
        setFormInputs({
          id: res.data.id,
          name: res.data.name,
          category: res.data.category
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newCultivar = () => {
    setFormInputs(initialCultivarState);
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
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              onChange={handleInputChange}
              name="categoryId"
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
              onChange={handleInputChange}
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
