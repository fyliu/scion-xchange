import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import TradeWantByUser from "./TradeWantByUser";
import TradeWantByCultivar from "./TradeWantByCultivar";

const Trade = () => {
  const [wantCultivars, setWantCultivars] = useState([]);
  const [offers, setOffers] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveWantCultivars();
  }, []);

  const retrieveWantCultivars = () => {
    UserService.getTradeWants()
      .then((res) => {
        //console.log(res.data);
        setWantCultivars(res.data);
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

  return (
    <div className="list row">
      <div className="col-md-8 mb-3">
        <h4>Who has what I want...</h4>

        <p>{message}</p>
      </div>

      <TradeWantByUser users={offers} />
      <TradeWantByCultivar cultivars={wantCultivars} />
    </div>
  );
};

export default Trade;
