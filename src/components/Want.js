import React, { useState, useEffect } from "react";
import CultivarDataService from "../services/cultivar.service";
import UserService from "../services/user.service";

const Want = () => {
  const [cultivars, setCultivars] = useState([]);
  const [wants, setWants] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveCultivars();
    retrieveWants();
  }, []);

  const retrieveCultivars = () => {
    CultivarDataService.getAll()
      .then((res) => {
        setCultivars(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveWants = () => {
    UserService.getWants()
      .then((res) => {
        setWants(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    const id = e.target.value;
    const value = e.target.checked;

    setWants({ ...wants, [id]: value });
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

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>What I want...</h4>

        <form>
          {cultivars &&
            cultivars.map((cultivar) => (
              <label key={cultivar.id}>
                <input
                  type="checkbox"
                  value={cultivar.id}
                  checked={wants[cultivar.id] || false}
                  onChange={handleInputChange}
                />
                {cultivar.category + " - " + cultivar.name}
              </label>
            ))}
        </form>
        <button type="submit" onClick={() => updateWant()}>
          Update
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Want;
