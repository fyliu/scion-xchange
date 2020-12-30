import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Trade = () => {
  const [trades, setTrades] = useState([]);
  const [offers, setOffers] = useState({});
  const [message, setMessage] = useState("");
  const [currentCultivar, setCurrentCultivar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(-1);

  useEffect(() => {
    retrieveTrades();
  }, []);

  const retrieveTrades = () => {
    UserService.getTradeWants()
      .then((res) => {
        //console.log(res.data);
        setTrades(res.data);
        let offers = {};
        res.data.map((cultivar) => {
          cultivar.offers.map((offer) => {
            if (!(offer.username in offers)) {
              offers[offer.username] = {
                email: offer.email,
                cultivars: new Set()
              };
            }
            offers[offer.username].cultivars.add(cultivar.name);
          });
        });
        setOffers(offers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveCultivar = (cultivar, index) => {
    setCurrentCultivar(cultivar);
    setCurrentIndex(index);
  };

  const setActiveOffer = (offer, index) => {
    setCurrentOffer(offer);
    setCurrentOfferIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-8 mb-3">
        <h4>Who has what I want...</h4>

        <p>{message}</p>
      </div>

      <div className="col-md-6 mb-3">
        <h4>People View</h4>

        <ul className="list-group">
          {offers &&
            Object.entries(offers).map((offer, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentOfferIndex ? "active" : "")
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
                <strong>Has:</strong>
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
      <div className="col-md-6 mb-3">
        <h4>Cultivars View</h4>

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
              <p className="ml-3">{currentCultivar.name}</p>
            </div>
            <div>
              <label>
                <strong>From:</strong>
              </label>{" "}
              <dl className="ml-3">
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
            <p>Please click on a cultivar...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trade;
