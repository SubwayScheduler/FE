import { useState } from "react";
import { useSelector } from "react-redux";

const MotormanSearch = () => {
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    motormanName: "",
  });

  const [motormans, setMotormans] = useState([]);
  const [error, setError] = useState("");

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
    const apiUrl = `${BASE_URL}/motorman/?motorman_name=${formData.motormanName}`;

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
        setMotormans(data); // Update motormans state with the response data
        setError(""); // Clear any previous error
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || "Failed to fetch data."}`);
        setMotormans([]); // Clear previous results
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setMotormans([]); // Clear previous results
    }
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            기관사 ID 검색
          </h2>
          <p className="text-gray-500 mb-6">
            기관사 이름으로 기관사 ID와 열차 운용정보를 검색합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">기관사 검색</p>
                <p>기관사 이름을 입력하십시오.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label htmlFor="motormanName">기관사 이름</label>
                    <input
                      type="text"
                      name="motormanName"
                      id="motormanName"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.motormanName}
                      onChange={handleChange}
                    />
                  </div>

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
          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
              {error}
            </div>
          )}

          {/* Search Results */}
          {motormans.length > 0 && (
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <h3 className="text-xl font-medium text-gray-600">검색 결과</h3>
              <ul className="mt-4">
                {motormans.map((motorman) => (
                  <li key={motorman.ID} className="mb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-700">
                          {motorman.name}
                        </p>
                        <p className="text-gray-500">
                          기관사 ID: {motorman.ID}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotormanSearch;
