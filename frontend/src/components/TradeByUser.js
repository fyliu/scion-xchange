import React, { useState } from "react";
import { useAbortableEffect } from "../Utils";
import UserService from "../services/user.service";

const TradeByUser = ({ users }) => {
  //console.log(users);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [offers, setOffers] = useState({});

  useAbortableEffect((status) => {
    retrieveOffers(status);
  }, []);

  const retrieveOffers = (status) => {
    UserService.getOffers()
      .then((res) => {
        if (!status.aborted) {
          //console.log(res.data);
          setOffers(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveUser = (user, index) => {
    //console.log(user);
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const cultivarsOffered = (user) => {
    return Array.from(user[1].cultivars).reduce((count, cultivar) => {
      return count + (cultivar.offer === true ? 1 : 0);
    }, 0);
  };

  const cultivarsWanted = (user) => {
    return Array.from(user[1].cultivars).reduce((count, cultivar) => {
      return count + (cultivar.want === true ? 1 : 0);
    }, 0);
  };

  return (
    <>
      <div className="col-md-6 mb-6">
        <h4 className="title is-4">Who can I trade with</h4>
        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user[0]}
                &nbsp;
                <span className="badge badge-pill badge-success">
                  {cultivarsOffered(user)} offers
                </span>
                <span className="badge badge-pill badge-info">
                  {cultivarsWanted(user)} wants
                </span>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6 my-4">
        {currentUser ? (
          <div>
            <h4 className="title is-5">Availability</h4>
            {currentUser[1].email !== "" ? (
              <div className="block">
                <label className="has-text-weight-bold">Email:</label>
                <p className="ml-3">{currentUser[1].email}</p>
              </div>
            ) : (
              ""
            )}
            {currentUser[1].contactInfo && currentUser[1].contactInfo !== "" ? (
              <div className="block">
                <label className="has-text-weight-bold">Contact Info:</label>
                <p className="ml-3">{currentUser[1].contactInfo}</p>
              </div>
            ) : (
              ""
            )}
            <div className="block">
              <label className="has-text-weight-bold">Cultivars:</label>
              <ul className="ml-3">
                {Array.from(currentUser[1].cultivars).map((cultivar, index) =>
                  cultivar.want ? (
                    <li key={index}>
                      <strong>Wants:</strong> {cultivar.name}
                    </li>
                  ) : cultivar.offer ? (
                    <li key={index}>
                      <strong>Offers:</strong> {cultivar.name}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a user...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TradeByUser;
