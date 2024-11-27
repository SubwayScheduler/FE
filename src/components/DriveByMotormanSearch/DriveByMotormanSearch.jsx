import { useState } from "react";

const DriveByMotormanSearch = () => {
  const [motormanId, setMotormanId] = useState(""); // Store the input value for Motorman ID
  const [searchResults, setSearchResults] = useState([]);
  const [responseMessage, setResponseMessage] = useState(""); // Store response or error message

  const handleChange = (e) => {
    setMotormanId(e.target.value); // Update Motorman ID state when input changes
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!motormanId) {
      setResponseMessage("Error: 기관사 ID를 입력하세요.");
      setSearchResults([]);
      return;
    }

    const BASE_URL = import.meta.env.VITE_API_URL; // Get base URL from environment variable
    const apiUrl = `${BASE_URL}/train_motorman/by_motorman?motorman_id=${motormanId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setResponseMessage(""); // Clear any previous error
      } else {
        const errorData = await response.json();
        setResponseMessage(
          `Error: ${errorData.message || "검색에 실패했습니다."}`
        );
        setSearchResults([]);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
      setSearchResults([]);
    }
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            기관사별 운전 정보 조회
          </h2>
          <p className="text-gray-500 mb-6">
            기관사 ID를 입력하여 운전 정보를 조회합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">기관사 검색</p>
                <p>기관사 ID를 입력하여 운전 정보를 조회하십시오.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  {/* Motorman ID Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="motormanId">기관사 ID</label>
                    <input
                      type="text"
                      name="motormanId"
                      id="motormanId"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={motormanId}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Search Button */}
                  <div className="md:col-span-2 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSearch}
                      >
                        검색
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Show Response Message */}
          {responseMessage && (
            <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
              {responseMessage}
            </div>
          )}

          {/* Show Results */}
          {searchResults.length > 0 && (
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <h3 className="text-xl font-medium text-gray-600">검색 결과</h3>
              <table className="min-w-full mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">기관사 ID</th>
                    <th className="px-4 py-2 border-b text-left">객차 ID</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result) => (
                    <tr key={result.Train_ID}>
                      <td className="px-4 py-2 border-b">
                        {result.Motorman_ID}
                      </td>
                      <td className="px-4 py-2 border-b">{result.Train_ID}</td>
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

export default DriveByMotormanSearch;