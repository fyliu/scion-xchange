import React, { useState } from "react";

const TradeOfferByCultivar = ({ cultivars }) => {
  const [currentCultivar, setCurrentCultivar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const setActiveCultivar = (cultivar, index) => {
    setCurrentCultivar(cultivar);
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="col-md-6 mb-3">
        <h4>Cultivars I offer and who wants them</h4>

        <ul className="list-group">
          {cultivars &&
            cultivars.map((cultivar, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCultivar(cultivar, index)}
                key={index}
              >
                {cultivar.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentCultivar ? (
          <div>
            <h4>Demand</h4>
            <div>
              <label>
                <strong>Cultivar:</strong>
              </label>{" "}
              <p className="ml-3">{currentCultivar.name}</p>
            </div>
            <div>
              <label>
                <strong>Wanted by:</strong>
              </label>{" "}
              <dl className="ml-3">
                {currentCultivar.wants.map((user) => (
                  <>
                    <dt>{user.username}</dt>
                    <dd>{user.email}</dd>
                  </>
                ))}
              </dl>
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

export default TradeOfferByCultivar;
