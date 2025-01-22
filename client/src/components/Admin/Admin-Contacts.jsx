import { useEffect, useState } from "react";
import { useAuth } from "../Authentication/Auth";
import { toast } from "react-toastify";
import { Table, Button, Container, Card, Spinner } from "react-bootstrap";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authorizationToken, API } = useAuth();

  const getContactsData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setContactData(data);
      } else {
        throw new Error("Failed to fetch contacts");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        toast.success("Message deleted successfully");
        getContactsData();
      } else {
        throw new Error("Failed to delete message");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete message");
    }
  };

  useEffect(() => {
    getContactsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fluid
      className="px-4"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    >
      <Card
        className="border-0 shadow-sm bg-transparent"
        style={{ backgroundColor: "red" }}
      >
        <Card.Header className="bg-transparent border-0 pt-4 pb-3">
          <h2 className="text-white mb-0 fs-4">Message Management</h2>
        </Card.Header>
        <Card.Body className="px-0 py-3">
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table
                // hover
                // variant="dark"
                className="mb-0 border"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <thead>
                  <tr className="text-white">
                    <th
                      className="border text-start px-3"
                      style={{
                        backgroundColor: "rgb(27 20 41)",
                        color: "#fff",
                      }}
                    >
                      Username
                    </th>
                    <th
                      className="border text-start px-3"
                      style={{
                        backgroundColor: "rgb(27 20 41)",
                        color: "#fff",
                      }}
                    >
                      Email
                    </th>
                    <th
                      className="border text-start px-3"
                      style={{
                        backgroundColor: "rgb(27 20 41)",
                        color: "#fff",
                      }}
                    >
                      Message
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
                  {contactData.map((contact) => (
                    <tr key={contact._id} className="text-white">
                      <td
                        className="border text-start px-3"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      >
                        {contact.username}
                      </td>
                      <td
                        className="border text-start px-3"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      >
                        {contact.email}
                      </td>
                      <td
                        className="border text-start px-3"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      >
                        <div
                          style={{
                            maxWidth: "400px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {contact.message}
                        </div>
                      </td>
                      <td
                        className="border"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      >
                        <Button
                          // variant="outline-danger"
                          size="sm"
                          onClick={() => deleteContactById(contact._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {contactData.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-white py-4">
                        No messages found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Message Modal */}
      <style>{`
        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .table td, .table th {
          vertical-align: middle;
        }
        .table-dark {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .table-dark td, .table-dark th {
          border-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </Container>
  );
};
