import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import TradeWantByUser from "./TradeWantByUser";
import TradeWantByCultivar from "./TradeWantByCultivar";
import TradeOfferByUser from "./TradeOfferByUser";
import TradeOfferByCultivar from "./TradeOfferByCultivar";

const Trade = () => {
  const [wantCultivars, setWantCultivars] = useState([]);
  const [offerCultivars, setOfferCultivars] = useState([]);
  const [offers, setOffers] = useState({});
  const [wants, setWants] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveWantCultivars();
    retrieveOfferCultivars();
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
            offers[offer.username].cultivars.add(
              cultivar.name + " - " + cultivar.category
            );
          });
        });
        setOffers(offers);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveOfferCultivars = () => {
    UserService.getTradeOffers()
      .then((res) => {
        setOfferCultivars(res.data);
        let wants = {};
        res.data.map((cultivar) => {
          cultivar.wants.map((want) => {
            if (!(want.username in wants)) {
              wants[want.username] = {
                email: want.email,
                cultivars: new Set()
              };
            }
            wants[want.username].cultivars.add(
              cultivar.name + " - " + cultivar.category
            );
          });
        });
        setWants(wants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8 mb-3">
        <h4>Who can I trade with...</h4>

        <p>{message}</p>
      </div>

      <TradeWantByUser users={offers} />
      <TradeWantByCultivar cultivars={wantCultivars} />

      <TradeOfferByUser users={wants} />
      <TradeOfferByCultivar cultivars={offerCultivars} />
    </div>
  );
};

export default Trade;
