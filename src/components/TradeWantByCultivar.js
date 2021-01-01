import React, { useState } from "react";

const TradeWantByCultivar = ({ cultivars }) => {
  const [currentCultivar, setCurrentCultivar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const setActiveCultivar = (cultivar, index) => {
    setCurrentCultivar(cultivar);
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="col-md-6 mb-3">
        <h4>Cultivars I want and who offers them</h4>

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
                {cultivar.name} - {cultivar.category}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentCultivar ? (
          <div>
            <h4>Offered by:</h4>
            <div>
              {currentCultivar.offers.map((user, index) => (
                <dl key={index} className="ml-3">
                  <dt>{user.username}</dt>
                  <dd>{user.email}</dd>
                </dl>
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

export default TradeWantByCultivar;
