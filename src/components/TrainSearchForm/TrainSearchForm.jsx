import { useState } from "react";

const TrainSearchForm = () => {
  const [formData, setFormData] = useState({
    lineId: "",
    capacity: "",
  });

  const [trainData, setTrainData] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const BASE_URL = import.meta.env.VITE_API_URL; // Get base URL from environment variable
    let apiUrl = `${BASE_URL}/train/?`;

    // Add query parameters dynamically based on input
    if (formData.lineId) {
      apiUrl += `line_id=${formData.lineId}&`;
    }
    if (formData.capacity) {
      apiUrl += `capacity=${formData.capacity}&`;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTrainData(data);
        setResponseMessage(""); // Clear any previous error
      } else {
        const errorData = await response.json();
        setResponseMessage(
          `Error: ${errorData.message || "검색에 실패했습니다."}`
        );
        setTrainData([]); // Clear previous results
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
      setTrainData([]); // Clear previous results
    }
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">객차 검색</h2>
          <p className="text-gray-500 mb-6">
            호선 ID와 수용량을 입력하여 객차를 검색합니다. (입력은 선택
            사항입니다.)
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">객차 검색</p>
                <p>호선 ID와 수용량을 입력하십시오.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  {/* Line ID Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="lineId">호선 ID</label>
                    <input
                      type="text"
                      name="lineId"
                      id="lineId"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.lineId}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Capacity Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="capacity">수용량</label>
                    <input
                      type="number"
                      name="capacity"
                      id="capacity"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.capacity}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-2 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                      >
                        검색
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {responseMessage && (
            <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
              {responseMessage}
            </div>
          )}

          {/* Search Results */}
          {trainData.length > 0 && (
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <h3 className="text-xl font-medium text-gray-600">검색 결과</h3>
              <table className="min-w-full mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">호선 ID</th>
                    <th className="px-4 py-2 border-b text-left">수용량</th>
                    <th className="px-4 py-2 border-b text-left">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {trainData.map((train) => (
                    <tr key={train.ID}>
                      <td className="px-4 py-2 border-b">{train.Line_ID}</td>
                      <td className="px-4 py-2 border-b">{train.capacity}</td>
                      <td className="px-4 py-2 border-b">{train.ID}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainSearchForm;
