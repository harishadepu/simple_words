import { useState, useEffect } from "react";
import axios from "axios";
import ResultCard from "./components/ResultCard";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const backendUrl = import.meta.env.VITE_URL

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript); // put voice text into textarea
      };

      recog.onend = () => setListening(false);

      setRecognition(recog);
    }
  }, []);

  const handleSubmit = async () => {
    if (!text || typeof text !== "string" || !text.trim()) {
      setError("Please enter valid text.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post(backendUrl+"api/summarize", {
        text,
      });

      const data = res.data; // axios gives parsed JSON here
      setResult(data);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    } else {
      setError("Speech recognition not supported in this browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-center text-3xl font-bold text-gray-800">
        Messy Text into Structured Text
      </h1>
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 space-y-5">
        <h1 className="text-2xl font-semibold text-gray-800">LLM Summarizer</h1>

        <textarea
          rows={8}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Paste or speak your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Summarize"}
          </button>

          <button
            onClick={startListening}
            className={`px-4 py-2 rounded-lg font-medium ${
              listening ? "bg-red-500 text-white" : "bg-gray-300"
            }`}
          >
            🎤 {listening ? "Listening..." : "Talk"}
          </button>
        </div>

        <ResultCard error={error} result={result} />
      </div>
    </div>
  );
}