import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState("");

  const [workflow, setWorkflow] = useState({
    text: true,
    upload: false,
    generate: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setWorkflow((prev) => ({ ...prev, [name]: checked }));
    setError("");
  };
  const backendUrl = import.meta.env.VITE_URL

  const handleEnhance = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/enhance-text`,{ prompt });
      setEnhancedPrompt(res.data.enhancedText);
    } catch (err) {
      const message = err.response?.data?.error || err.message;
      setError("Error enhancing text: " + message);
    }
  };

  const handleGenerateImage = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/generate-image`, { prompt: enhancedPrompt || prompt });
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      const message = err.response?.data?.error || err.message;
      setError("Error generating image: " + message);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setUploadedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${backendUrl}/api/analyze-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Image analysis result: " + JSON.stringify(res.data));
    } catch (err) {
      const message = err.response?.data?.error || err.message;
      setError("Error analyzing image: " + message);
    }
  };

  return (
    <div className="app-container">
      <h1>AI Workflow Selector</h1>

      {enhancedPrompt && (
        <div>
          <h3>Enhanced Prompt:</h3>
          <p>{enhancedPrompt}</p>
        </div>
      )}

      {/* Workflow Selection */}
      <div className="workflow-selector">
        <label>
          <input
            type="checkbox"
            name="text"
            checked={workflow.text}
            onChange={handleCheckboxChange}
          />
          Text Workflow
        </label>
        <label>
          <input
            type="checkbox"
            name="upload"
            checked={workflow.upload}
            onChange={handleCheckboxChange}
          />
          Image Upload Workflow
        </label>
        <label>
          <input
            type="checkbox"
            name="generate"
            checked={workflow.generate}
            onChange={handleCheckboxChange}
          />
          Generate Image Workflow
        </label>
      </div>

      {/* Text Workflow */}
      {workflow.text && (
        <div className="workflow-block">
          <textarea
            rows="4"
            placeholder="Enter your text prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button onClick={handleEnhance}>Enhance Text</button>
        </div>
      )}

      {/* Image Upload Workflow */}
      {workflow.upload && (
        <div className="workflow-block">
          <h3>Upload an Image</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploadedImage && (
            <div>
              <h4>Uploaded Image Preview:</h4>
              <img src={uploadedImage} alt="Uploaded" />
            </div>
          )}
        </div>
      )}

      {/* Generate Image Workflow */}
      {workflow.generate && (
        <div className="workflow-block">
          <textarea
            rows="4"
            placeholder="Enter your text prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button onClick={handleGenerateImage}>Generate Image</button>
          {imageUrl && (
            <div>
              <h3>Generated Image:</h3>
              <img src={imageUrl} alt="Generated" />
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default App;