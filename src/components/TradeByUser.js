import React, { useState } from "react";

const TradeByUser = ({ users }) => {
  //console.log(users);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const setActiveUser = (user, index) => {
    //console.log(user);
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="col-md-6 mb-6">
        <h4 className="title is-4">Who can I trade with</h4>
        <ul className="list-group">
          {users &&
            Object.entries(users).map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user[0]}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6 my-4">
        {currentUser ? (
          <div>
            <h4 className="title is-5">Availability</h4>
            {currentUser[1].email != "" ? (
              <div className="block">
                <label className="has-text-weight-bold">Email:</label>
                <p className="ml-3">{currentUser[1].email}</p>
              </div>
            ) : (
              ""
            )}
            {currentUser[1].contactInfo != "" ? (
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
