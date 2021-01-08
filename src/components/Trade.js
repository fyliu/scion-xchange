import merge from "lodash/merge";
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import TradeByUser from "./TradeByUser";
import TradeByCultivar from "./TradeByCultivar";

const Trade = () => {
  const [cultivars, setCultivars] = useState([]);
  const [users, setUsers] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveCultivars();
  }, []);

  const retrieveCultivars = () => {
    UserService.getTrade()
      .then((res) => {
        setCultivars(res.data);
        let users = {};
        res.data.map((cultivar) => {
          cultivar.users.map((user) => {
            if (!(user.username in users)) {
              users[user.username] = {
                email: user.email,
                cultivars: new Set()
              };
            }
            users[user.username].cultivars.add({
              name: cultivar.category + " - " + cultivar.name,
              offer: user.offer,
              want: user.want
            });
          });
        });
        setUsers(users);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8 mb-3">
        <p>{message}</p>
      </div>

      <TradeByUser users={users} />
      <TradeByCultivar cultivars={cultivars} />
    </div>
  );
};

export default Trade;
