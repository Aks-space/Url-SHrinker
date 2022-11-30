import React, { useState, useEffect } from "react";
import axios from "axios";
import copy from "copy-to-clipboard";

export default function GenerateCustomUrl() {
  const [urls, seturls] = useState([]);
  const [longUrl, setlongUrl] = useState();
  const [urlCode, seturlCode] = useState();
  const [shortUrl, setShortUrl] = useState();
  const [customCode, setcustomCode] = useState();
  const [urlalert, seturlalert] = useState(null);

  //COPY TEXT
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/api/url").then((res) => {
      console.log("url codes " + res.data);
      seturls(res.data);
    });
  }, []);

  function copyToClipboard(e) {
    copy(shortUrl);
    setCopySuccess("Copied!");
  }

  function onFormSubmit(e) {
    setCopySuccess("");
    setShortUrl("Generating......");

    e.preventDefault();

    let letter = customCode.slice();

    //console.log("Size of the input array" + letter.length);

    var i;
    for (i = 0; i < letter.length; i++) {
      //console.log("letter" + letter[i]);
      if (letter[i] == "/") {
        alert("You cant use forwardslash");
        setShortUrl("Please Try Again......");
        return false;
      }
    }

    urls.map((url) => {
      if (url.urlCode == customCode) {
        alert("Already Exist..Please use another custom code");
        return false;
      }
    });

    const newUrl = {
      longUrl,
      customCode,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/url/shortencustom",
        newUrl
      )
      .then((res) => {
        console.log(res);
        seturlCode(res.data.urlCode);
        setShortUrl("hexashort.tk/" + res.data.urlCode);
      })
      .catch(() => {
        setShortUrl("Please Try Again......");
      });
  }

  return (
    <div>
      <div className="container">
        <center>
          <div style={{ margin: "auto" }}>
            <form onSubmit={onFormSubmit}>
              <div class="form-group col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Long Url"
                  onChange={(e) => {
                    setlongUrl(e.target.value);
                  }}
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Custom Code"
                  onChange={(e) => {
                    setcustomCode(e.target.value);

                    let letter = e.target.value.slice();

                    //console.log("Size of the input array" + letter.length);

                    var i;
                    for (i = 0; i < letter.length; i++) {
                      //console.log("letter" + letter[i]);
                      if (letter[i] == "/") {
                        alert("You cant use forwardslash");
                      }
                    }

                    urls.map((url) => {
                      if (url.urlCode === e.target.value) {
                        seturlalert("alert-danger");
                      } else if (url.urlCode !== e.target.value) {
                        seturlalert("alert-success");
                      } else {
                        seturlalert(null);
                      }
                    });
                  }}
                  required
                />

                <br />

                {urlalert === "alert-danger" ? (
                  <div class="alert alert-danger" role="alert">
                    Already Exist!
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div class="form-group col-md-6">
                <button type="submit" class="btn btn-primary">
                  GET SHORTEN LINK
                </button>
              </div>
            </form>
          </div>
        </center>
      </div>

      <div className="container">
        <center>
          <p
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              axios
                .get(process.env.REACT_APP_BACKEND_URL + "/" + urlCode)
                .then((res) => {
                  console.log(res);
                  window.open(
                    res.data,
                    "_blank" // <- This is what makes it open in a new window.
                  );
                });
            }}
          >
            {shortUrl}
          </p>

          <div style={{ marginBottom: "10px" }}>
            {!shortUrl ? (
              " "
            ) : (
              <button onClick={copyToClipboard}>Copy Url</button>
            )}
            &nbsp; &nbsp;
            {copySuccess}
          </div>
        </center>
      </div>
    </div>
  );
}
