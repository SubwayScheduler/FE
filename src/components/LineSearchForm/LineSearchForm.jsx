import { useState } from "react";
import { useSelector } from "react-redux";

const LineSearchForm = () => {
  const { token } = useSelector((state) => state.auth);
  const [searchResults, setSearchResults] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    const BASE_URL = import.meta.env.VITE_API_URL; // Get base URL from environment variable
    const apiUrl = `${BASE_URL}/line/`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
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
        setSearchResults([]); // Clear previous results
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
      setSearchResults([]); // Clear previous results
    }
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">호선 검색</h2>
          <p className="text-gray-500 mb-6">
            검색 버튼을 클릭하여 노선 정보를 확인하세요.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="text-gray-600">
              <p className="font-medium text-lg">검색</p>
              <p>버튼을 클릭하여 결과를 확인하세요.</p>
            </div>

            <div className="text-right mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSearch}
              >
                검색
              </button>
            </div>
          </div>

          {/* Show Response Message */}
          {responseMessage && (
            <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
              {responseMessage}
            </div>
          )}

          {/* Show Results if search is successful */}
          {searchResults.length > 0 && (
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <h3 className="text-xl font-medium text-gray-600">검색 결과</h3>
              <table className="min-w-full mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">호선 이름</th>
                    <th className="px-4 py-2 border-b text-left">운행 방향</th>
                    <th className="px-4 py-2 border-b text-left">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((line) => (
                    <tr key={line.ID}>
                      <td className="px-4 py-2 border-b">{line.name}</td>
                      <td className="px-4 py-2 border-b">{line.route_shape}</td>
                      <td className="px-4 py-2 border-b">{line.ID}</td>
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

export default LineSearchForm;
