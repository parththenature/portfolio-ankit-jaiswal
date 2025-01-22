import { useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [data, setData] = useState({
    username: "Ankit Jaiswal",
    email: "ankitias9260@gmail.com",
    phone: "9260936885",
  });

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call to update user data
      setTimeout(() => {
        toast.success("Settings updated successfully");
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in Server");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4" style={{ color: "#c770f0" }}>
            Settings
          </h2>
          <form
            className="p-4 border rounded shadow-sm"
            onSubmit={handleSubmit}
            style={{
              background: "linear-gradient(to left, rgb(27 20 41), rgb(20 15 35))",
              color: "#fff",
            }}
          >
            {/* Profile Section */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={{ color: "#fff" }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                value={data.username}
                onChange={handleInput}
                required
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: "#fff" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                value={data.email}
                onChange={handleInput}
                required
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
              />
            </div>

            {/* Mobile Section */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label" style={{ color: "#fff" }}>
                Mobile
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                value={data.phone}
                onChange={handleInput}
                required
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#c770f0",
                  borderColor: "#c770f0",
                  color: "#fff",
                }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
