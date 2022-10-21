import React, { useState, useEffect } from "react";
import axios from "axios";
import mailSvg from "./assets/mail.svg";
import womanSvg from "./assets/woman.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const getRandomUser = async () => {
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data.results[0]);
        setUserData(res.data.results[0]);
        setUserInfo({
          title: "My name is",
          info: `${userData.name.first} ${userData.name.last}`,
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getRandomUser();
  }, []);

  //get info Section

  const getInfo = (hover) => {
    switch (hover) {
      case "profile":
        setUserInfo({
          title: "My name is ",
          info: `${userData.name.first} ${userData.name.last}`,
        });
        break;
      case "email":
        setUserInfo({
          title: "My email is",
          info: userData.email,
        });
        break;
      case "age":
        setUserInfo({
          title: "My age is",
          info: userData.dob.age,
        });
        break;
      case "location":
        setUserInfo({
          title: "My location is",
          info: `${userData.location.city} - ${userData.location.country}`,
        });
        break;
      case "tel":
        setUserInfo({
          title: "My phone number is",
          info: userData.phone,
        });
        break;
      case "password":
        setUserInfo({
          title: "My password is",
          info: userData.login.password,
        });
        break;
      default:
        break;
    }
  };

  //get info section is done

  return (
    <main>
      {userData && (
        <>
          <div className="block bcg-orange">
            <img src={cwSvg} alt="cw" id="cw" />
          </div>
          <div className="block">
            <div className="container">
              <img
                src={userData.picture.large}
                alt="random user"
                className="user-img"
              />
              <p className="user-title">
                {userInfo !== [] ? userInfo.title : "My name is"}
              </p>
              <p className="user-value">
                {userInfo !== []
                  ? userInfo.info
                  : `${userData.name.first} ${userData.name.last}`}
              </p>
              <div className="values-list">
                <button
                  className="icon"
                  data-label="name"
                  onMouseEnter={() => getInfo("profile")}
                >
                  <img src={womanSvg} alt="user" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="email"
                  onMouseEnter={() => getInfo("email")}
                >
                  <img src={mailSvg} alt="mail" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="age"
                  onMouseEnter={() => getInfo("age")}
                >
                  <img src={womanAgeSvg} alt="age" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="street"
                  onMouseEnter={() => getInfo("location")}
                >
                  <img src={mapSvg} alt="map" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="phone"
                  onMouseEnter={() => getInfo("tel")}
                >
                  <img src={phoneSvg} alt="phone" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="password"
                  onMouseEnter={() => getInfo("password")}
                >
                  <img src={padlockSvg} alt="lock" id="iconImg" />
                </button>
              </div>
              <div className="btn-group">
                <button
                  className="btn"
                  type="button"
                  onClick={() => getRandomUser()}
                >
                  new user
                </button>
                <button className="btn" type="button">
                  add user
                </button>
              </div>

              <table className="table">
                <thead>
                  <tr className="head-tr">
                    <th className="th">Firstname</th>
                    <th className="th">Email</th>
                    <th className="th">Phone</th>
                    <th className="th">Age</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="body-tr"></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}

export default App;
