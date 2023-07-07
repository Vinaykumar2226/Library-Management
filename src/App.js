import "./App.css";
import { useState } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import axios from "axios";
import img1 from "./img/img1.jpg";
import img2 from "./img/img2.jpg";
import Main from "./Main";
import { useNavigate } from "react-router-dom";

function App() {
  // const navigate = useNavigate();
  const [obj, setObj] = useState();
  const [books, setBooks] = useState("");
  const handleClick = () => {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=richdad&key=AIzaSyAWzDHPIr4bI043w6hpet7idHGG2wvP_94"
      )
      .then((response) => setBooks(response));
  };

  return obj ? (
    <Main books={books} />
  ) : (
    <div className="container">
      <div className="container2">
        <img src={img1} className="image" />
        <div className="Login-Container">
          <h1>
            Welcome to
            <br /> Library Management
          </h1>

          <img src={img2} className="img2" />
          <div className="content">
            <p className="para">
              "Writing and reading decrease our sense of isolation. They deepen
              and widen and expand our sense of life: They feed the soul. When
              writers make us shake our heads with the exactness of their prose
              and their truths, and even make us laugh about ourselves or life,
              our buoyancy is restored."
            </p>
          </div>

          <LoginSocialGoogle
            client_id={
              "1039189653841-8cote6v4e7ge3i6gpmhpcba890psvh63.apps.googleusercontent.com"
            }
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onResolve={({ provider, data }) => {
              setBooks(data);
              setObj(data);
              // navigate("/Main");
              // console.log(provider.access_token + "rep");
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;

{
  /* <div className="container">
      <div className="container2">
        <img src={img1} className="image" />
        <div className="Login-Container">
          <h1>
            Welcome to
            <br /> Library Management
          </h1>

          <img src={img2} className="img2" />
          <div className="content">
            <p className="para">
              "Writing and reading decrease our sense of isolation. They deepen
              and widen and expand our sense of life: They feed the soul. When
              writers make us shake our heads with the exactness of their prose
              and their truths, and even make us laugh about ourselves or life,
              our buoyancy is restored."
            </p>
          </div>

          <LoginSocialGoogle
            client_id={
              "1039189653841-8cote6v4e7ge3i6gpmhpcba890psvh63.apps.googleusercontent.com"
            }
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onResolve={({ provider, data }) => {
              console.log(data);
              setObj(data);
              // navigate("/Main");
              // console.log(provider.access_token + "rep");
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
        </div>
      </div>
      <div></div>
    </div> */
}
