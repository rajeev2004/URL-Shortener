import React, { useState, useEffect } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
function Shorten() {
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const result = await API.post(
        "/createLink",
        { longUrl, customAlias, expirationDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShortUrl(result.data.shortUrl);
      setLoading(false);
      setLongUrl("");
      setCustomAlias("");
      setExpirationDate("");
    } catch (err) {
      setError(
        err.response?.data?.error_message || "Could not generate the link"
      );
      setLoading(false);
    }
  }
  return (
    <div className="shorten-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-components">
          <label>
            <p>Enter URL:</p>
          </label>
          <input
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter long url"
            required
          />
        </div>
        <div className="form-components">
          <label>
            <p>Custom Alias (optional):</p>
          </label>
          <input
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="Enter Custom Alias (optional)"
          />
        </div>
        <div className="form-components">
          <label>
            <p>Expiration Date (optional):</p>
          </label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            placeholder="Enter Expiration Date(optional)"
          />
        </div>
        <div>{error && <p className="error-message">{error}</p>}</div>
        {loading && (
          <div className="loading-shorten-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}
        <div>
          {shortUrl && (
            <p>
              Short URL:{" "}
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </p>
          )}
        </div>
        <div className="form-components">
          <div className="button-class">
            <button type="submit">Shorten</button>
            <button type="button" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Shorten;
