import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { toast } from "react-toastify";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLocalStorage, userAuthentication } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(
        `https://portfolio-ankit-jaiswal.onrender.com/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const res_data = await response.json();
      console.log("From login", res_data.extraDetails);

      if (response.ok) {
        // Stored the token in localStorage
        storeTokenInLocalStorage(res_data.token);
        console.log("Token stored:", res_data.token);
        setUser({ email: "", password: "" });
        await userAuthentication(); // Fetch updated user data
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        // console.log("Invalid Credentials");
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.log("From Login", error);
    }
  };

  const formStyle = {
    background: "linear-gradient(to left, rgb(27 20 41), rgb(20 15 35))",
    color: "rgb(250, 250, 250)",
    minHeight: "100vh",
    padding: "20px",
  };

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "rgb(250, 250, 250)",
  };

  return (
    <div
      style={formStyle}
      className="d-flex align-items-center justify-content-center mobile-margin"
    >
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card" style={formStyle}>
              <div className="card-body">
                <h2 className="text-center mb-5">Login Form</h2>

                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <label className="mb-2">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div className="form-group mb-5">
                    <label className="mb-2">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        width: "auto",
                        minWidth: "150px",
                      }}
                    >
                      Login
                    </button>
                  </div>
                  <p style={{ marginTop: "1.5rem" }}>
                    If you are a new user, please register first to create your
                    account
                  </p>
                  <div className="text-center" style={{ marginTop: "1rem" }}>
                    <Link to="/register">
                      <button
                        type="button"
                        className="btn btn-primary px-4 py-2"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          width: "auto",
                          minWidth: "150px",
                        }}
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
