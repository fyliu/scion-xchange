import React, { useState } from "react";

const TradeByCultivar = ({ cultivars }) => {
  const [currentCultivar, setCurrentCultivar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const setActiveCultivar = (cultivar, index) => {
    //console.log(JSON.stringify(cultivar, null, 2));
    setCurrentCultivar(cultivar);
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="col-md-6 mb-3">
        <h4>Cultivars I offer or want</h4>

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
                {cultivar.category} - {cultivar.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentCultivar ? (
          <div>
            {currentCultivar.users[0].want ? (
              <h4>Users that want this:</h4>
            ) : (
              <h4>Users that offer this:</h4>
            )}
            <div>
              {currentCultivar.users.map((user, index) => (
                <div key={index}>
                  <div>{user.username}</div>
                  <div>{user.email}</div>
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
