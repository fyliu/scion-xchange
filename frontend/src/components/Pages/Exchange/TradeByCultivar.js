import React, { useState } from "react";
import { useAbortableEffect } from "Utils";
import UserService from "services/user.service";

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

  const usersWant = (cultivar) => {
    return cultivar.users.reduce((count, user) => {
      return count + (user.want === true ? 1 : 0);
    }, 0);
  };

  const usersOffer = (cultivar) => {
    return cultivar.users.reduce((count, user) => {
      return count + (user.offer === true ? 1 : 0);
    }, 0);
  };

  return (
    <>
      <div className="columns">
        <div className="column">
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
          <table className="table is-striped is-narrow is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Cultivars</th>
              </tr>
            </thead>
            <tbody>
              {cultivars &&
                cultivars.map((cultivar, index) => {
                  return (isWantedByUser(cultivar) &&
                    inMyOffer(cultivar) &&
                    filter === "offer") ||
                    (isOfferedByUser(cultivar) &&
                      inMyWant(cultivar) &&
                      filter === "want") ? (
                    <tr key={cultivar.id}>
                      <td
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveCultivar(cultivar, index)}
                        key={index}
                        style={{ display: "relative" }}
                      >
                        {cultivar.category} - {cultivar.name}
                        &nbsp;
                        {filter === "want" ? (
                          <span className="tag is-rounded is-success">
                            {usersOffer(cultivar)} offers
                          </span>
                        ) : (
                          <span className="tag is-rounded is-info">
                            {usersWant(cultivar)} wants
                          </span>
                        )}
                      </td>
                    </tr>
                  ) : null;
                })}
            </tbody>
          </table>
        </div>
        <div className="column">
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
                      <span className="has-text-weight-bold">
                        {user.username}
                      </span>
                      {user.email !== "" ? (
                        <span>&nbsp;{user.email}</span>
                      ) : null}
                      {user.offerDescription !== "" ? (
                        <div>({user.offerDescription})</div>
                      ) : null}
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
      </div>
    </>
  );
};

export default TradeByCultivar;
