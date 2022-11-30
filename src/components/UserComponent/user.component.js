import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GenerateRandomUrl from "../GenerateRandomURL/generaterandom.component";
import GenerateCustomUrl from "../GenerateCustomUrl/generatecustom.component";


export default function UserComponent() {   
  const [userName, setuserName] = useState(null);
  const [picture, setpicture] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    console.log(config);

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/auth", config)
      .then((res) => {
        console.log(res);
        setuserName(res.data.name);
        setpicture(res.data.picture);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function userLogout() {
    localStorage.removeItem("x-auth-token");
    setuserName(null);
    setpicture(null);
    window.location = "/";
  }

  return (
    <Router>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/me">
            <span style={{ fontWeight: "bold", color: "#ba4949" }}>
              HexaShort
            </span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>

            <a>
              <img
                src={picture}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
              />
              {"  "}
              {userName}
              {"  "}
              <button className="btn btn-outline-danger" onClick={userLogout}>
                Logout
              </button>
            </a>
          </div>
        </nav>

        <div>
          <div className="row">
            <div className="col-md-4">
              {" "}
              <div className="container">
                <div className="row" style={{ marginTop: "10%" }}>
                  <center>
                    <div className="col-md-6"> 
                    </div>
                    <div className="col-md-6 text-center">
                      <br /> 
                      <p>
                        Free URL shortener to create the perfect short URLs for
                        your business. Its helps you shorten, create and
                        share branded links.
                      </p>
                      <p>
                        <span style={{ fontSize: "10px" }}>
                          team-c 
                        </span>
                      </p>
                    </div>
                  </center>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row" style={{ marginTop: "10%" }}>
                <div className="container">
                  {" "}
                  <div className="col-md-12">
                    <h3 className="text-center">Generate Random URL</h3>
                    <hr />
                    <GenerateRandomUrl />
                  </div>
                  <div className="col-md-12">
                    <h3 className="text-center">Generate Customized URL</h3>
                    <hr />
                    <GenerateCustomUrl />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}
