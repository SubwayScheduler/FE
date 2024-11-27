import { useState } from "react";

const MotormanEditForm = () => {
  const [formData, setFormData] = useState({
    motormanId: "",
    motormanName: "",
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

    const { motormanId, motormanName } = formData;

    if (!motormanId || !motormanName) {
      setResponseMessage("Error: 기관사 ID와 이름을 모두 입력하세요.");
      return;
    }

    const BASE_URL = import.meta.env.VITE_API_URL; // Get base URL from environment variable
    const apiUrl = `${BASE_URL}/motorman/${motormanId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: motormanName }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(
          data.message || "기관사 정보가 성공적으로 수정되었습니다."
        );
      } else {
        const errorData = await response.json();
        setResponseMessage(
          `Error: ${errorData.message || "수정에 실패했습니다."}`
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
          <h2 className="font-semibold text-xl text-gray-600">
            기관사 정보 수정
          </h2>
          <p className="text-gray-500 mb-6">
            기관사 ID와 이름을 입력하여 정보를 수정합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">기관사 수정 정보</p>
                <p>기관사 ID와 이름을 입력하십시오.</p>
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
                      value={formData.motormanId}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Motorman Name Field */}
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

                  {/* Submit Button */}
                  <div className="md:col-span-2 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                      >
                        수정
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

export default MotormanEditForm;
