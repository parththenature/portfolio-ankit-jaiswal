import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Authentication/Auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  const { authorizationToken } = useAuth();

  // Fetch single user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`https://portfolio-ankit-jaiswal.onrender.com/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://portfolio-ankit-jaiswal.onrender.com/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("User updated successfully");
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Server");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Update User Data</h2>
          <form
            className="p-4 border rounded shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
                required
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
                required
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Mobile
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                autoComplete="off"
                value={data.phone}
                onChange={handleInput}
                required
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
