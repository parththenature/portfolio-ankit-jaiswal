import { useEffect, useState } from "react";
import { useAuth } from "../Authentication/Auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Table, Button, Container, Card, Spinner } from "react-bootstrap";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authorizationToken, API } = useAuth();

  const getAllUsersData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("User Deleted Successfully");
        getAllUsersData();
      } else {
        throw new Error(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "User Delete Failed");
    }
  };

  useEffect(() => {
    getAllUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fluid
      className="px-4"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    >
      <Card className="border-0 shadow-sm bg-transparent">
        <Card.Header className="bg-transparent border-0 pt-4 pb-3">
          <h2 className="text-white mb-0 fs-4">User Management</h2>
        </Card.Header>
        <Card.Body className="px-0 py-3">
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table
                hover
                // variant="dark"
                className="mb-0 border"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <thead>
                  <tr className="text-white">
                    <th
                      className="border text-start px-3"
                      style={{
                        width: "100px",
                        backgroundColor: "rgb(27 20 41)",
                        color: "#fff",
                      }}
                    >
                      Name
                    </th>
                    <th
                      className="border text-start px-3"
                      style={{
                        width: "100px",
                        backgroundColor: "rgb(27 20 41)",
                        color: "#fff",
                      }}
                    >
                      Email
                    </th>
                    <th
                      className="border text-start px-3"
                      style={{
                        width: "100px",
                        backgroundColor: "rgb(27 20 41)",
                        color: "#fff",
                      }}
                    >
                      Phone
                    </th>
                    <th
                      className="border text-start px-3"
                      style={{
                        width: "100px",
                        backgroundColor: "rgb(27 20 41)",
                        color: "#fff",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="text-white">
                      <td
                        className="border text-start px-3"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      >
                        {user.username}
                      </td>
                      <td
                        className="border text-start px-3"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      >
                        {user.email}
                      </td>
                      <td
                        className="border text-start px-3"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      >
                        {user.phone}
                      </td>
                      <td
                        className="border"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      >
                        <div className="d-flex gap-4">
                          <Link
                            to={`/admin/users/${user._id}/edit`}
                            className="btn btn-sm btn-outline-info"
                            style={{ textDecoration: "none" }}
                          >
                            Edit
                          </Link>
                          <Button
                            // variant="outline-danger"
                            size="sm"
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-white py-4">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
