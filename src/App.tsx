import React, { useEffect, useState } from "react";
import "./styles/app.css";
import { TeacherInfo } from "./models/teacherInfo";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import { fetchCsrfToken, get_teacher_info } from "./services/requests";
import Cookies from "js-cookie";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState<TeacherInfo | undefined>(
    undefined
  );

  useEffect(() => {
    fetchCsrfToken().then((res: any) => {
      if (res.status !== 200) {
        console.log(res.status);
      } else {
        const csrfToken = res.data.csrfToken;
        Cookies.set("csrftoken", csrfToken, { expires: 20, secure: true });
      }
    });
  }, []);

  useEffect(() => {
    if (loading) {
      const credentials = Cookies.get("credentials");
      console.log(credentials);

      if (credentials !== undefined) {
        setLoggedIn(true);
        console.log("Logged in");
        if (teacherInfo !== undefined) {
          setLoading(false);
          return;
        }
        get_teacher_info().then((res: any) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              setLoggedIn(false);
              setLoading(false);
              return;
            }
          } else {
            console.log(res.data);

            setTeacherInfo(res.data);
            setLoading(false);
          }
        });
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    }

    // eslint-disable-next-line
  }, [loggedIn]);

  return (
    <div className="appPage">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : loggedIn && teacherInfo ? (
        <MainPage teacherInfo={teacherInfo} />
      ) : (
        <Login setLoggedIn={setLoggedIn} setLoading={setLoading} />
      )}
    </div>
  );
}

export default App;
