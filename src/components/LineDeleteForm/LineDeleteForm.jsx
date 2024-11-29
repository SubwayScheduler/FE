import { useState } from "react";
import { useSelector } from "react-redux";

const LineDeleteForm = () => {
  const { token } = useSelector((state) => state.auth);
  const [lineId, setLineId] = useState(""); // Store the input value for Line ID
  const [responseMessage, setResponseMessage] = useState(""); // Store the response message

  const handleChange = (e) => {
    setLineId(e.target.value); // Update the Line ID value when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lineId) {
      setResponseMessage("Error: 호선 ID를 입력하세요.");
      return;
    }

    const BASE_URL = import.meta.env.VITE_API_URL; // Get base URL from environment variable
    const apiUrl = `${BASE_URL}/line/${lineId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message || "호선이 성공적으로 삭제되었습니다.");
      } else {
        const errorData = await response.json();
        setResponseMessage(
          `Error: ${errorData.message || "삭제에 실패했습니다."}`
        );
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">호선 삭제</h2>
          <p className="text-gray-500 mb-6">
            호선 ID를 입력하여 노선을 삭제합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">호선 삭제</p>
                <p>호선 ID를 입력하여 노선을 삭제하십시오.</p>
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
                      value={lineId}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-2 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Message */}
          {responseMessage && (
            <div
              className={`p-4 rounded mb-6 ${
                responseMessage.startsWith("Error")
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {responseMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineDeleteForm;
