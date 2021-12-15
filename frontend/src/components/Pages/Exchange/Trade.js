import React, { useState } from "react";
import { useAbortableEffect } from "Utils";
import UserService from "services/user.service";
import TradeByUser from "./TradeByUser";
import TradeByCultivar from "./TradeByCultivar";
import EventBus from "common/EventBus";

const Trade = () => {
  const [cultivars, setCultivars] = useState([]);
  const [users, setUsers] = useState([]);

  useAbortableEffect((status) => {
    retrieveTrades(status);
  }, []);

  const compareCultivar = (a, b) => {
    const nameA = a.category + a.name;
    const nameB = b.category + b.name;
    return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
  };

  const categoryOther = (cultivar) => {
    return cultivar.category === "Other";
  };

  const findLastIndex = (array, compareFn) => {
    const index = array.slice().reverse().findIndex(compareFn);
    const count = array.length - 1;
    return index >= 0 ? count - index : index;
  };

  const moveOtherToEnd = (cultivars) => {
    const first = cultivars.findIndex(categoryOther);
    const last = findLastIndex(cultivars, categoryOther);
    cultivars.push(...cultivars.splice(first, last - first + 1));
  };

  const retrieveTrades = (status) => {
    UserService.getTrade()
      .then((res) => {
        if (!status.aborted) {
          res.data.sort(compareCultivar);
          moveOtherToEnd(res.data);
          setCultivars(res.data);
          let users = {};
          res.data.forEach((cultivar) => {
            cultivar.users.forEach((user) => {
              if (!(user.username in users)) {
                users[user.username] = {
                  email: user.email,
                  contactInfo: user.contactInfo,
                  cultivars: new Set()
                };
              }
              users[user.username].cultivars.add({
                name: cultivar.category + " - " + cultivar.name,
                offer: user.offer,
                want: user.want,
                offerDescription: user.offerDescription,
                offerQuantity: user.offerQuantity
              });
            });
          });
          let usersArray = Object.entries(users);
          usersArray.sort((a, b) => {
            return ("" + a[0]).localeCompare(b[0]);
          });
          setUsers(usersArray);
        }
      })
      .catch((e) => {
        //console.log(e);
        if (e.response && e.response.status === 403) {
          EventBus.dispatch("logout");
        }
      });
  };

  return (
    <div className="list row">
      <TradeByCultivar cultivars={cultivars} />
      <TradeByUser users={users} />
    </div>
  );
};

export default Trade;
