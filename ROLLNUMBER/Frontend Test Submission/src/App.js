import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [urls, setUrls] = useState([]);

  const generateShortcode = () =>
    Math.random().toString(36).substring(2, 7);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.startsWith("http")) {
      alert("Please enter a valid URL (must start with http/https)");
      return;
    }

    const finalShortcode = shortcode || generateShortcode();
    const expiry =
      validity && !isNaN(validity)
        ? `${validity} minutes`
        : "30 minutes";

    const newEntry = {
      original: url,
      short: `http://localhost:3000/${finalShortcode}`,
      expiry,
    };

    setUrls([...urls, newEntry]);
    setUrl("");
    setValidity("");
    setShortcode("");
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f7fa", // light gray professional bg
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937", // dark slate text
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb", // professional blue
          marginBottom: "30px",
        }}
      >
        🚀 URL Shortener
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{
            padding: "12px",
            width: "320px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
          }}
        />
        <input
          type="number"
          placeholder="Validity (minutes)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          style={{
            padding: "12px",
            width: "160px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
          }}
        />
        <input
          type="text"
          placeholder="Custom shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          style={{
            padding: "12px",
            width: "160px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          Shorten
        </button>
      </form>

      {/* Results */}
      {urls.length > 0 && (
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#374151" }}>
            📊 Shortened URLs
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f3f4f6" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Original URL
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Short URL
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Expiry
                </th>
              </tr>
            </thead>
            <tbody>
              {urls.map((u, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <td style={{ padding: "12px" }}>{u.original}</td>
                  <td style={{ padding: "12px" }}>
                    <a
                      href={u.original}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#2563eb", fontWeight: "500" }}
                    >
                      {u.short}
                    </a>
                  </td>
                  <td style={{ padding: "12px" }}>{u.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
