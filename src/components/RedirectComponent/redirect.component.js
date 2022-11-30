import React, { useEffect } from "react";
import axios from "axios";

export default function Redirect(props) {
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/" + props.match.params.id)
      .then((res) => {
        console.log(res);
        window.location = res.data;
      });
  }, []);

  return <div></div>;
}
