import React, { useState } from "react";

const TradeByCultivar = ({ cultivars }) => {
  const [currentCultivar, setCurrentCultivar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [filter, setFilter] = useState("want");

  const handleInputChange = (e) => {
    const { value } = e.target;

    setFilter(value);
    setActiveCultivar(null, -1);
  };

  const setActiveCultivar = (cultivar, index) => {
    //console.log(JSON.stringify(cultivar, null, 2));
    setCurrentCultivar(cultivar);
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="col-md-6 mb-6">
        <div className="block">
          <span className="title is-4">Cultivars I</span>
          <p className="control">
            <span className="select">
              <select
                className="form-control"
                id="category"
                onChange={handleInputChange}
                name="categoryId"
                value={filter}
              >
                <option value="want">want</option>
                <option value="offer">offer</option>
                ))
              </select>
            </span>
          </p>
        </div>
        <ul className="list-group">
          {cultivars &&
            cultivars.map((cultivar, index) => {
              return (cultivar.users[0].want && filter === "offer") ||
                (cultivar.users[0].offer && filter === "want") ? (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveCultivar(cultivar, index)}
                  key={index}
                >
                  {cultivar.category} - {cultivar.name}
                </li>
              ) : (
                ""
              );
            })}
        </ul>
      </div>
      <div className="col-md-6 my-6">
        {currentCultivar ? (
          <div>
            {currentCultivar.users[0].want ? (
              <h4 className="title is-5">Users that want this:</h4>
            ) : (
              <h4 className="title is-5">Users that offer this:</h4>
            )}
            <div>
              {currentCultivar.users.map((user, index) => (
                <div key={index} className="block">
                  <div className="has-text-weight-bold">{user.username}</div>
                  {user.email != "" ? <div>{user.email}</div> : ""}
                  {user.contactInfo != "" ? <div>{user.contactInfo}</div> : ""}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a cultivar...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TradeByCultivar;
