import React, { useState, useEffect } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchLinks() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const result = await API.get("/getLinks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(result.data.links);
        setLinks(result.data.links);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(
          err.response?.data?.error_message ||
            err.message ||
            "Could Not fetch the links Analytics"
        );
        setLoading(false);
      }
    }
    fetchLinks();
    window.addEventListener("focus", onFocus);
    function onFocus() {
      fetchLinks();
    }
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className="dashboard-container">
      <h2>URL Shortener: Links analytics</h2>
      <div className="button-class">
        <button onClick={() => navigate("/createLink")}>Create Short</button>
        <button onClick={logout}>Logout</button>
      </div>
      <div>{error && <p className="error-message">{error}</p>}</div>
      {links.length === 0 ? (
        <p>
          No Analytics present to show right now. Make your first Short Link.
        </p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Clicks</th>
              <th>Created Date</th>
              <th>Expiration Status</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => (
              <tr key={index}>
                <td>
                  <a
                    href={link.short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.short_url}
                  </a>
                </td>
                <td>{link.long_url}</td>
                <td>{link.clicks}</td>
                <td>{link.creation_date}</td>
                <td>{link.expiration_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Dashboard;
