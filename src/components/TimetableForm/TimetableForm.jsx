import { useState } from "react";

const TimetableForm = () => {
  const [lineId, setLineId] = useState("");
  const [boundTo, setBoundTo] = useState("");
  const [trainCount, setTrainCount] = useState(0);
  const [etas, setEtas] = useState([]);
  const [stations, setStations] = useState([]);
  const [trainSchedules, setTrainSchedules] = useState([]);
  const [error, setError] = useState(null);

  const handleLineIdChange = (e) => {
    setLineId(e.target.value);
  };

  const parseTimeStringToSeconds = (timeString) => {
    const parts = timeString.split(":").map(Number);
    if (parts.length === 2) {
      // MM:SS
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
    } else if (parts.length === 3) {
      // HH:MM:SS
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  };

  const formatSecondsToTimeString = (seconds) => {
    const h = Math.floor(seconds / 3600) % 24;
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const fetchTimetableData = async () => {
    if (!lineId) {
      setError("호선 ID를 입력하세요.");
      return;
    }
    if (boundTo === "") {
      setError("내선/외선을 선택하세요.");
      return;
    }
    setError(null); // Clear previous errors
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/scheduler/line/${lineId}/departure-times?bound_to=${boundTo}`
      );
      if (!response.ok) {
        throw new Error("시간표 데이터를 가져오는 데 실패했습니다.");
      }
      const data = await response.json();
      setTrainCount(data.train_count);
      setEtas(data.etas);

      // Process stations
      let cumulativeTime = 0;
      const processedStations = data.etas.map((station) => {
        const timeInSeconds = parseTimeStringToSeconds(station.et);
        cumulativeTime += timeInSeconds;
        return {
          station_name: station.station_name,
          cumulative_time: cumulativeTime, // in seconds
        };
      });
      setStations(processedStations);

      // Process train schedules
      const trainSchedules = data.departure_times.map((departure) => {
        const departureTimeInSeconds = parseTimeStringToSeconds(
          departure.departure_time
        );
        const arrivalTimes = processedStations.map((station) => {
          const arrivalTimeInSeconds =
            departureTimeInSeconds + station.cumulative_time;
          // Wrap around midnight if necessary
          const arrivalTimeInSecondsAdjusted = arrivalTimeInSeconds % 86400;
          return formatSecondsToTimeString(arrivalTimeInSecondsAdjusted);
        });
        return {
          departure_time: departure.departure_time,
          arrival_times: arrivalTimes, // array of arrival times at each station
        };
      });
      setTrainSchedules(trainSchedules);
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
            호선 ID와 내선/외선을 입력하고 데이터를 가져오세요.
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              <p>에러: {error}</p>
            </div>
          )}

          {/* Input Form */}
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            {/* Line ID Input */}
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

            {/* Bound To Input */}
            <div className="mb-4">
              <label
                htmlFor="boundTo"
                className="block text-sm font-medium text-gray-700"
              >
                내선/외선 (왕복선일 경우 반영되지 않습니다)
              </label>
              <select
                id="boundTo"
                name="boundTo"
                value={boundTo}
                onChange={(e) => setBoundTo(e.target.value)}
                className="mt-1 block w-full h-10 px-4 border rounded bg-gray-50"
              >
                <option value="">선택하세요</option>
                <option value="1">내선</option>
                <option value="0">외선</option>
              </select>
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

          {/* Train Schedule Table */}
          {trainSchedules.length > 0 && (
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mt-6">
              <h3 className="text-lg font-medium text-gray-600 mb-4">
                열차 운행 시간표
              </h3>
              <div className="overflow-x-auto overflow-y-auto max-h-screen text-sm">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="tracking-tighter">
                      <th className="border px-4 py-2 bg-gray-300">
                        출발 시간
                      </th>
                      {stations.map((station) => (
                        <th
                          key={station.station_name}
                          className="border px-4 py-2 bg-gray-300"
                        >
                          {station.station_name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {trainSchedules.map((train, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2 bg-gray-300">
                          {train.departure_time}
                        </td>
                        {train.arrival_times.map((arrivalTime, idx) => (
                          <td key={idx} className="border px-4 py-2">
                            {arrivalTime}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimetableForm;
