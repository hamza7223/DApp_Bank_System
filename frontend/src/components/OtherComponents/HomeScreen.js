import React from "react";
import backgroundImage from "../../img.jpg";
import "../../components/App.css";

const HomeScreen = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const titleStyle = {
    fontWeight: "bold",
    color: "#9c6a33",
    marginBottom: "10px",
  };

  const descriptionStyle = {
    fontSize: "20px",
    fontWeight: 500,
    color: "#9c6a33",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      <div className="main">
        <h1 className="h1" style={titleStyle}>
          Meezan Bank
        </h1>
        <h3 style={titleStyle}>Welcome to Bank Management System</h3>
        <p style={{ paddingBottom: "13vw" }} />
        <p style={descriptionStyle}>The application is developed by: </p>
        <p style={descriptionStyle}>
          Zayn Javaid | Muhammad Abdullah | Moiz Afzal
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
