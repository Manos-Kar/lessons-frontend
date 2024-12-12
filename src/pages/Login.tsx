import { useEffect, useState } from "react";
import { fetchCsrfToken, login } from "../services/requests";
import { saveCredentialsToCookie } from "../services/requestTemplates";
import Cookies from "js-cookie";

type Props = {
  setLoggedIn: (value: boolean) => void;
  setLoading: (value: boolean) => void;
};

export default function Login(props: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, [username, password]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  function handleLogin() {
    setValidationMessage("");
    if (username && password) {
      login(username, password).then((res: any) => {
        if (res.status !== 200) {
          console.log(res);

          setValidationMessage(res.message);
        } else {
          saveCredentialsToCookie(username, password);
          fetchCsrfToken().then((res: any) => {
            if (res.status !== 200) {
              console.log(res.status);
            } else {
              const csrfToken = res.data.csrfToken;
              Cookies.set("csrftoken", csrfToken, {
                expires: 20,
                secure: true,
              });
              props.setLoggedIn(true);
              props.setLoading(true);
            }
          });
        }
      });
    } else {
      alert("Please enter a username and password");
    }
  }

  return (
    <>
      <div className="basicPageComponent">
        <div className="loginInputContainer">
          <div className="inputContainer">
            <p className="loginInputLabel">Username:</p>
            <input
              type="text"
              className="username loginInput"
              onChange={(e: any) => setUsername(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <p className="loginInputLabel">Password:</p>
            <input
              type="password"
              className="password loginInput"
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="loginButton" onClick={handleLogin}>
          Login
        </button>
        {validationMessage !== "" && (
          <p className="validationMessage">{validationMessage}</p>
        )}
      </div>
    </>
  );
}
