import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLocalStorage } = useAuth();

  // handling the input values
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(
        `https://portfolio-ankit-jaiswal.onrender.com/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const res_data = await response.json();
      console.log("Response from server", res_data.extraDetails);

      if (response.ok) {
        // Stored the token in local storage
        storeTokenInLocalStorage(res_data.token);

        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration Successful");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }

      console.log(response);
    } catch (error) {
      console.log("From Register", error);
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
                <h2 className="text-center mb-5">Registration Form</h2>

                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <label className="mb-2">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      style={inputStyle}
                      required
                    />
                  </div>

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

                  <div className="form-group mb-4">
                    <label className="mb-2">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={user.phone}
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
                      Register
                    </button>
                  </div>
                  <p style={{ marginTop: "1.5rem", textAlign: "center" }}>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      style={{
                        color: "#c95bf5", // Bootstrap blue
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
