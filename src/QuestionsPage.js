import React, { useState } from "react";
import "./QuestionsPage.css";

const QuestionsPage = () => {
  const [formData, setFormData] = useState({
    waterPHLevel: "",
    waterPrecipitateSoap: "",
    totalDissolvedSolids: "",
    chloraminesAmount: "",
    sulfatesDissolved: "",
    electricalConductivity: "",
    organicCarbonAmount: "",
    trihalomethanesAmount: "",
    turbidityUnits: "",
  });
  const [prediction, setPredicition] = useState();
  const [first, setFirst] = useState(true);

  const questionLabels = {
    waterPHLevel: "Your Water pH level (0-14)?",
    waterPrecipitateSoap: "What Capacity of Water precipitate soap in mg/L?",
    totalDissolvedSolids:
      "What is the Total Dissolved Solids in ppm (parts per million)?",
    chloraminesAmount:
      "What is the Amount of Chloramines in ppm (parts per million)?",
    sulfatesDissolved: "What is the Amount of Sulfates dissolved in mg/L?",
    electricalConductivity:
      "What is the Electrical Conductivity of Water in muS/cm?",
    organicCarbonAmount:
      "What is the Amount of Organic Carbon in ppm (parts per million)?",
    trihalomethanesAmount: "What is the Amount of Trihalomethanes in mug/L?",
    turbidityUnits:
      "What is the Measure of Light Emitting property of Water in NTU (Nephelometric Turbidity Units)?",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Ensure the pH value is between 0 and 14
    if (name === "waterPHLevel") {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: Math.max(0, Math.min(14, numericValue)), // Clamp the value between 0 and 14
        }));
      }
    } else {
      // For other fields, parse the value to a float with decimal points
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseFloat(value),
      }));
    }
  };

  const handleSubmit = async () => {
    // TODO: update this to server url when deploying
    const response = await fetch(
      "https://water-quality-prediction-e9ws.onrender.com/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ph: formData.waterPHLevel,
          hardness: formData.waterPrecipitateSoap,
          solids: formData.totalDissolvedSolids,
          chloramines: formData.chloraminesAmount,
          sulfate: formData.sulfatesDissolved,
          conductivity: formData.electricalConductivity,
          organic_carbon: formData.organicCarbonAmount,
          trihalomethanes: formData.trihalomethanesAmount,
          turbidity: formData.turbidityUnits,
        }),
      }
    );

    const result = await response.json();
    // Set the result to some state and update the UI
    setFirst(false);
    setPredicition(result.prediction);
  };

  return (
    <div className="questions-container">
      <h1>Water Portability Check</h1>
      <div className="questions-grid">
        {Object.keys(formData).map((key, index) => (
          <div
            className={`question-box ${formData[key] !== "" ? "answered" : ""}`}
            key={key}
          >
            <label>{questionLabels[key]}</label>
            <input
              type="number"
              step="0.01"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} type="submit">
        Check Portability
      </button>
      <div>
        <h1>
          {first
            ? ""
            : prediction
            ? "The water is good to drink"
            : "The water is not good to drink"}
        </h1>
      </div>
    </div>
  );
};

export default QuestionsPage;
