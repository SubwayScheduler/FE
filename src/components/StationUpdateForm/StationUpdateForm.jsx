import { useState } from "react";
import { useSelector } from "react-redux";

const StationUpdateForm = () => {
  const { token } = useSelector((state) => state.auth);
  const [lineId, setLineId] = useState(""); // Store the Line ID (호선 ID)
  const [csvFile, setCsvFile] = useState(null); // Store the CSV file
  const [responseMessage, setResponseMessage] = useState(""); // Store response or error messages

  const handleLineIdChange = (e) => {
    setLineId(e.target.value); // Update Line ID state when input changes
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]); // Update CSV file state when file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lineId || !csvFile) {
      setResponseMessage("Error: 호선 ID와 CSV 파일을 모두 입력하세요.");
      return;
    }

    const BASE_URL = import.meta.env.VITE_API_URL; // Get base URL from environment variable
    const deleteUrl = `${BASE_URL}/line_csv/${lineId}/delete/stations`;
    const uploadUrl = `${BASE_URL}/line_csv/${lineId}/import/stations`;

    try {
      // Step 1: Delete existing stations
      const deleteResponse = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        setResponseMessage(
          `Error: ${errorData.message || "삭제에 실패했습니다."}`
        );
        return;
      }

      const deleteMessage = await deleteResponse.json();
      setResponseMessage(deleteMessage.message || "기존 역 정보 삭제 성공.");

      // Step 2: Upload new stations
      const formData = new FormData();
      formData.append("file", csvFile);

      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        setResponseMessage(
          `Error: ${errorData.message || "업로드에 실패했습니다."}`
        );
        return;
      }

      const uploadMessage = await uploadResponse.json();
      setResponseMessage(
        uploadMessage.message ||
          "역/플랫폼 정보가 성공적으로 업데이트되었습니다."
      );
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            호선별 역/플랫폼 정보 업데이트
          </h2>
          <p className="text-gray-500 mb-6">
            호선 ID와 CSV 파일을 입력하여 역/플랫폼 정보를 업데이트합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">호선 정보 입력</p>
                <p>호선 ID와 CSV 파일을 입력하여 정보를 업데이트하십시오.</p>
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
                      onChange={handleLineIdChange}
                    />
                  </div>

                  {/* File Upload Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="csvFile">CSV 파일 업로드</label>
                    <input
                      type="file"
                      name="csvFile"
                      id="csvFile"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      onChange={handleFileChange}
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
                        업데이트
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

export default StationUpdateForm;
