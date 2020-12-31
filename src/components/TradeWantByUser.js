import React, { useState } from "react";

const TradeWantByUser = ({ users }) => {
  const [currentOffer, setCurrentOffer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const setActiveOffer = (offer, index) => {
    setCurrentOffer(offer);
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="col-md-6 mb-3">
        <h4>Who offers what I want</h4>

        <ul className="list-group">
          {users &&
            Object.entries(users).map((offer, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveOffer(offer, index)}
                key={index}
              >
                {offer[0]}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentOffer ? (
          <div>
            <h4>Availability</h4>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              <p className="ml-3">{currentOffer[1].email}</p>
            </div>
            <div>
              <label>
                <strong>Offers:</strong>
              </label>{" "}
              <ul className="ml-3">
                {Array.from(currentOffer[1].cultivars).map(
                  (cultivar, index) => (
                    <li key={index}>{cultivar}</li>
                  )
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

export default TradeWantByUser;
