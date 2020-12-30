import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Trade = () => {
  const [trades, setTrades] = useState([]);
  const [message, setMessage] = useState("");
  const [currentCultivar, setCurrentCultivar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveTrades();
  }, []);

  const retrieveTrades = () => {
    UserService.getTradeWants()
      .then((res) => {
        //console.log(res.data);
        setTrades(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveCultivar = (cultivar, index) => {
    setCurrentCultivar(cultivar);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Who has what I want...</h4>

        <p>{message}</p>
      </div>
      <div className="col-md-6">
        <h4>Cultivars</h4>

        <ul className="list-group">
          {trades &&
            trades.map((cultivar, index) => (
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
            <h4>Availability</h4>
            <div>
              <label>
                <strong>Cultivar:</strong>
              </label>{" "}
              {currentCultivar.name}
            </div>
            <div>
              <label>
                <strong>From:</strong>
              </label>{" "}
              <dl>
                {currentCultivar.offers.map((user) => (
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
            <p>Please click on a Cultivar...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trade;
