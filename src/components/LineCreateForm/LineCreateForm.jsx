import { useState } from "react";

const LineCreateForm = () => {
  const [formData, setFormData] = useState({
    lineName: "",
    direction: "", // "ROUND_TRIP" or "CIRCULAR"
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

    const { lineName, direction } = formData;

    if (!lineName || !direction) {
      setResponseMessage("Error: 모든 필드를 입력하세요.");
      return;
    }

    const BASE_URL = import.meta.env.VITE_API_URL; // Get base URL from environment variable
    const apiUrl = `${BASE_URL}/line/`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          route_shape: direction,
          name: lineName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message || "호선이 성공적으로 생성되었습니다.");
      } else {
        const errorData = await response.json();
        setResponseMessage(
          `Error: ${errorData.message || "생성에 실패했습니다."}`
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
          <h2 className="font-semibold text-xl text-gray-600">호선 등록</h2>
          <p className="text-gray-500 mb-6">
            호선 이름과 운행 방향을 입력하여 새로운 호선을 만듭니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">호선 생성 정보</p>
                <p>호선 이름과 운행 방향을 입력하십시오.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  {/* Line Name Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="lineName">호선 이름</label>
                    <input
                      type="text"
                      name="lineName"
                      id="lineName"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.lineName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Direction Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="direction">운행 방향</label>
                    <select
                      name="direction"
                      id="direction"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.direction}
                      onChange={handleChange}
                    >
                      <option value="">선택하세요</option>
                      <option value="ROUND-TRIP">왕복</option>
                      <option value="CIRCULAR">순환</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-2 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                      >
                        생성
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

export default LineCreateForm;
