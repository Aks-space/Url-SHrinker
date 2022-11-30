import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import { GoogleLogin } from "react-google-login";

//import components
import GenerateRandomUrl from "../GenerateRandomURL/generaterandom.component";

export default function Mainpage() {
  const [userName, setuserName] = useState(null);
  const [picture, setpicture] = useState(null);

  const responseSuccessGoogle = (response) => {
    console.log(response); 
    axios({
      method: "POST",
      url: process.env.REACT_APP_BACKEND_URL + "/api/auth/googlelogin",
      data: { tokenId: response.tokenId },
    }).then((res) => {
      alert("Login Success");
      localStorage.setItem("x-auth-token", res.data.token);

      const config = {
        headers: {
          "x-auth-token": res.data.token,
        },
      };

      console.log(config);

      axios
        .get(process.env.REACT_APP_BACKEND_URL + "/api/auth", config)
        .then((res) => {
          console.log(res);
          setuserName(res.data.name);
          setpicture(res.data.picture);
          window.location = "/me";
        })
        .catch((err) => {
          alert(err);
        });
    });
  };

  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  function userLogout() {
    localStorage.removeItem("x-auth-token");
    setuserName(null);
    setpicture(null);
    window.location = "/";
  }

  return (
    <Router>
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/"> 
            <span style={{ fontWeight: "bold", color: "#ba4949" }}>
              Url-Shotner
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

            {userName !== null ? (
              <>
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
                  <button
                    className="btn btn-outline-danger"
                    onClick={userLogout}
                  >
                    Logout
                  </button>
                </a>
              </>
            ) : (
              <GoogleLogin
                clientId="832304410996-o3j7n3jf6jjj83ajhgsigj4p64ri3ifq.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
                cookiePolicy={"single_host_origin"}
              />
            )}
          </div>
        </nav>
          <br />
        <div>
          <div className="container">
            <div className="row">
              <center>
                <div className="col-md-6 text-center">
                  <p>
                    Free URL shortener to create the perfect short URLs for your
                    business. Its helps you shorten, create and share
                    branded links.
                  </p> 
                  <p style={{ fontWeight: "bold" }}>
                    Create an account for customized urls
                  </p>
                  <p>
                    <span style={{ fontSize: "10px" }}>
                      By Team-C 
                    </span>
                  </p>
                </div>
              </center>
            </div>
          </div>
          <GenerateRandomUrl />
        </div>
      </div>
    </Router>
  );
}
