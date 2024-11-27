import { useState } from "react";

const MotormanRegisterForm = () => {
  const [formData, setFormData] = useState({
    motormanName: "", // Only the name field is required
  });

  const [responseMessage, setResponseMessage] = useState(""); // For showing response

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
    const apiUrl = `${BASE_URL}/motorman/`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: formData.motormanName }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message);
      } else {
        const errorData = await response.json();
        setResponseMessage(
          `Error: ${errorData.message || "Failed to register."}`
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
          <h2 className="font-semibold text-xl text-gray-600">기관사 등록</h2>
          <p className="text-gray-500 mb-6">
            기관사 이름을 입력하여 새로운 기관사를 등록합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">기관사 등록 정보</p>
                <p>기관사의 이름을 입력하십시오.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
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
                        등록
                      </button>
                    </div>
                  </div>

                  {/* Response Message */}
                  <div className="md:col-span-2">
                    {responseMessage && (
                      <p className="text-green-500 font-medium">
                        {responseMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotormanRegisterForm;
