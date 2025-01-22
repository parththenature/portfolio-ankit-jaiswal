import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./Auth";
import { toast } from "react-toastify";

export const Contact = () => {
  const [userData, setUserData] = useState(true);
  const { user } = useAuth();
  const defaultContactFormData = {
    username: user ? user.username : "",
    email: user ? user.email : "",
    message: "",
  };

  const [contact, setContact] = useState(defaultContactFormData);

  // Update contact state if user data is available
  useEffect(() => {
    if (userData && user) {
      setContact({
        username: user.username,
        email: user.email,
        message: "",
      });
      setUserData(false);
    }
  }, [user, userData]);

  // let tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://portfolio-ankit-jaiswal.onrender.com/api/form/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        }
      );
      if (response.ok) {
        console.log("Before Reset:", contact);
        setContact(defaultContactFormData);
        console.log("After Reset:", contact);
        const data = await response.json();
        console.log(data);
        toast.success("Message has been sent successfully!");
      }
    } catch (error) {
      toast.error("Message has been failed");
      console.log(error);
    }
  };

  const formStyle = {
    background: "linear-gradient(to left, rgb(27 20 41), rgb(20 15 35))",
    color: "rgb(250, 250, 250)",
    minHeight: "100vh",
    padding: "20px",
    boxShadow: "none",
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
                <h2 className="text-center mb-5">Contact Us</h2>

                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <label className="mb-2">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={contact.username}
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
                      value={contact.email}
                      onChange={handleInput}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div className="form-group mb-5">
                    <label className="mb-2">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      value={contact.message}
                      onChange={handleInput}
                      style={{
                        ...inputStyle,
                        minHeight: "150px",
                        resize: "vertical",
                      }}
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
                      Send Message
                    </button>
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
