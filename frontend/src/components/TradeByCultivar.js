import React, { useState } from "react";
import { useAbortableEffect } from "../Utils";
import UserService from "../services/user.service";

const TradeByCultivar = ({ cultivars }) => {
  const [currentCultivar, setCurrentCultivar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [offers, setOffers] = useState({});
  const [wants, setWants] = useState({});
  const [filter, setFilter] = useState("want");

  useAbortableEffect((status) => {
    retrieveOffers(status);
    retrieveWants(status);
  }, []);

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
    const { value } = e.target;

    setFilter(value);
    setActiveCultivar(null, -1);
  };

  const setActiveCultivar = (cultivar, index) => {
    //console.log(JSON.stringify(cultivar, null, 2));
    setCurrentCultivar(cultivar);
    setCurrentIndex(index);
  };

  const inMyWant = (cultivar) => {
    return wants[cultivar.id] && wants[cultivar.id].want;
  };

  const inMyOffer = (cultivar) => {
    return offers[cultivar.id] && offers[cultivar.id].offer;
  };

  const isOfferedByUser = (cultivar) => {
    return cultivar.users.reduce((offered, user) => {
      return offered || user.offer === true;
    });
  };

  const isWantedByUser = (cultivar) => {
    return cultivar.users.reduce((wanted, user) => {
      return wanted || user.want === true;
    });
  };

  return (
    <>
      <div className="col-md-6 mb-6">
        <div className="block">
          <span className="title is-4">Cultivars I...</span>
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
              return (isWantedByUser(cultivar) &&
                inMyOffer(cultivar) &&
                filter === "offer") ||
                (isOfferedByUser(cultivar) &&
                  inMyWant(cultivar) &&
                  filter === "want") ? (
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
            {filter === "offer" ? (
              <h4 className="title is-5">Users that want this:</h4>
            ) : (
              <h4 className="title is-5">Users that offer this:</h4>
            )}
            <div>
              {currentCultivar.users.map((user, index) =>
                (filter === "offer" && user.want === true) ||
                (filter === "want" && user.offer === true) ? (
                  <div key={index} className="block">
                    <div className="has-text-weight-bold">{user.username}</div>
                    {user.email !== "" ? <div>{user.email}</div> : ""}
                    {user.contactInfo !== "" ? (
                      <div>{user.contactInfo}</div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : null
              )}
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
