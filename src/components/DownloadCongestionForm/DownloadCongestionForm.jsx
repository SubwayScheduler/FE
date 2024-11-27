import { useState } from "react";

const DownloadCongestionForm = () => {
  const [lineId, setLineId] = useState(""); // Store the Line ID (호선 ID)
  const [responseMessage, setResponseMessage] = useState(""); // Store response or error messages

  const handleLineIdChange = (e) => {
    setLineId(e.target.value); // Update Line ID state when input changes
  };

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!lineId) {
      setResponseMessage("Error: 호선 ID를 입력해주세요.");
      return;
    }

    const BASE_URL = import.meta.env.VITE_API_URL; // Get base URL from environment variable
    const apiUrl = `${BASE_URL}/line_csv/${lineId}/export/congestion`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const filename = `congestion_line_${lineId}.csv`; // Use Line ID in the filename

        // Create a download link and trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        setResponseMessage("혼잡도 정보가 성공적으로 다운로드되었습니다.");
      } else {
        const errorData = await response.json();
        setResponseMessage(
          `Error: ${errorData.message || "다운로드에 실패했습니다."}`
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
            호선별 혼잡도 정보 다운로드 (CSV)
          </h2>
          <p className="text-gray-500 mb-6">
            호선 ID를 입력하여 해당 호선의 혼잡도 정보를 CSV 파일로
            다운로드합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">혼잡도 정보 다운로드</p>
                <p>호선 ID를 입력하여 CSV 파일을 다운로드하십시오.</p>
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

                  {/* Download Button */}
                  <div className="md:col-span-2 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleDownload}
                      >
                        다운로드
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

export default DownloadCongestionForm;
