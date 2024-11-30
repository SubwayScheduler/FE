import { useState } from "react";

const TimetableForm = () => {
  const [lineId, setLineId] = useState("");
  const [trainCount, setTrainCount] = useState(0);
  const [departureTimes, setDepartureTimes] = useState([]);
  const [error, setError] = useState(null);

  const handleLineIdChange = (e) => {
    setLineId(e.target.value);
  };

  const fetchTimetableData = async () => {
    if (!lineId) {
      setError("호선 ID를 입력하세요.");
      return;
    }
    setError(null); // Clear previous errors
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/scheduler/line/${lineId}/departure-times`
      );
      if (!response.ok) {
        throw new Error("시간표 데이터를 가져오는 데 실패했습니다.");
      }
      const data = await response.json();
      setTrainCount(data.train_count);
      setDepartureTimes(data.departure_times);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-40 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">열차 시간표</h2>
          <p className="text-gray-500 mb-6">
            호선 ID를 입력하고 데이터를 가져오세요.
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              <p>에러: {error}</p>
            </div>
          )}

          {/* Line ID Input */}
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="mb-4">
              <label
                htmlFor="lineId"
                className="block text-sm font-medium text-gray-700"
              >
                호선 ID
              </label>
              <input
                type="text"
                id="lineId"
                name="lineId"
                value={lineId}
                onChange={handleLineIdChange}
                className="mt-1 block w-full h-10 px-4 border rounded bg-gray-50"
                placeholder="예: 3"
              />
            </div>
            <button
              onClick={fetchTimetableData}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              시간표 가져오기
            </button>
          </div>

          {/* Train Count Display */}
          {trainCount > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-600">
                총 열차 대수:{" "}
                <span className="text-blue-600">{trainCount}</span>
              </h3>
            </div>
          )}

          {/* Departure Times Table */}
          {departureTimes.length > 0 && (
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8">
              <h3 className="text-lg font-medium text-gray-600 mb-4">
                열차 출발 시간표
              </h3>
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">출발 시간</th>
                    <th className="border px-4 py-2">CDF 값</th>
                  </tr>
                </thead>
                <tbody>
                  {departureTimes.map((time, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        {time.departure_time}
                      </td>
                      <td className="border px-4 py-2">{time.cdf_value}</td>
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

export default TimetableForm;
