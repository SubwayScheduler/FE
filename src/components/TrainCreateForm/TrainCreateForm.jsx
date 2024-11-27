import { useState } from "react";

const TrainCreateForm = () => {
  const [formData, setFormData] = useState({
    trainId: "",
    capacity: "",
  });

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

    const { trainId, capacity } = formData;

    if (!trainId || !capacity) {
      setResponseMessage("Error: 호선ID와 수용량을 모두 입력하세요.");
      return;
    }

    const BASE_URL = import.meta.env.VITE_API_URL; // Get base URL from environment variable
    const apiUrl = `${BASE_URL}/train/`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Line_ID: trainId,
          capacity: Number(capacity), // Ensure capacity is sent as a number
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message || "객차가 성공적으로 등록되었습니다.");
      } else {
        const errorData = await response.json();
        setResponseMessage(
          `Error: ${errorData.message || "등록에 실패했습니다."}`
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
          <h2 className="font-semibold text-xl text-gray-600">객차 등록</h2>
          <p className="text-gray-500 mb-6">
            호선ID와 수용량을 입력하여 새로운 객차를 등록합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">객차 등록 정보</p>
                <p>호선ID와 수용량을 입력하십시오.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  {/* Train ID Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="trainId">호선ID</label>
                    <input
                      type="text"
                      name="trainId"
                      id="trainId"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.trainId}
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
                        등록
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

export default TrainCreateForm;
