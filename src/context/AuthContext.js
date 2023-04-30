import React, { createContext, useCallback, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const storedAuthTokens = localStorage.getItem("authTokens");
    console.log(storedAuthTokens);
    return storedAuthTokens ? JSON.parse(storedAuthTokens) : null;
  });

  const [user, setUser] = useState(() => {
    const storedAuthTokens = localStorage.getItem("authTokens");
    return storedAuthTokens ? jwt_decode(storedAuthTokens) : null;
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const payload = {
      email: `${e.target.email.value}`,
      password: `${e.target.password.value}`,
    };
    console.log(payload);
    await axios
      .post("http://127.0.0.1:7000/account/login/", payload)
      .then((res) => {
        console.log(res.data);
        setAuthTokens(res.data.authTokens);
        setUser(jwt_decode(res.data.authTokens.access));
        localStorage.setItem("authTokens", res.data.authTokens);
        navigate("/Myforms");
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          alert("Something went wrong!");
        }
      });
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const updateToken = useCallback(async () => {
    const refreshToken = authTokens.refresh;
    console.log("update token");
    if (authTokens && refreshToken) {
      // Null check for authTokens
      await axios
        .post("http://127.0.0.1:7000/account/token/refresh/", {
          // headers:{
          //     'content-Type':'application/json'
          // },
          refresh: refreshToken,
        })
        .then((res) => {
          console.log(res.data);
          setAuthTokens(res.data);
          setUser(jwt_decode(res.data.access));
          localStorage.setItem("authTokens", res.data);
          navigate("/Myforms");
        })
        .catch((err) => {
          setAuthTokens(null);
          setUser(null);
          localStorage.removeItem("authTokens");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        });
      // if(res.status === 200){
      //     setAuthTokens(res.data.authTokens)
      //         setUser(jwt_decode(res.data.authTokens.access))
      //         localStorage.setItem('authTokens', res.data.authTokens);
      // }else{
      //     setAuthTokens(null)
      //     setUser(null)
      //     localStorage.removeItem('authTokens')

      //     setTimeout(() => {
      //       navigate("/login");
      //     }, 2000);
      // }
    }

    if (loading) {
      setLoading(false);
    }
  }, [authTokens, loading, navigate]);

  const contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    authTokens: authTokens,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const fourMinutes = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading, updateToken]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
