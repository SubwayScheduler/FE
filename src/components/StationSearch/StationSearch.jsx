import { useState } from "react";

const StationSearch = () => {
  const [formData, setFormData] = useState({
    stationName: "",
  });

  const [stations, setStations] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated response data from the server, including stationName, stationId, bound_to, and line number
    const mockData = [
      {
        stationNumber: "001",
        stationName: "Station A",
        bound_to: "Upbound",
        lineNumber: "Line 1",
      },
      {
        stationNumber: "002",
        stationName: "Station B",
        bound_to: "Downbound",
        lineNumber: "Line 2",
      },
      {
        stationNumber: "003",
        stationName: "Station C",
        bound_to: "Upbound",
        lineNumber: "Line 3",
      },
    ];

    // Filter data based on the input stationName (case insensitive search)
    const filteredData = mockData.filter((station) =>
      station.stationName
        .toLowerCase()
        .includes(formData.stationName.toLowerCase())
    );

    setStations(filteredData);
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">역 번호 검색</h2>
          <p className="text-gray-500 mb-6">
            역 이름으로 역 번호, 상/하행, 호선 번호를 검색합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">역 검색</p>
                <p>역 이름을 입력하십시오.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label htmlFor="stationName">역 이름</label>
                    <input
                      type="text"
                      name="stationName"
                      id="stationName"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.stationName}
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
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {stations.length > 0 && (
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <h3 className="text-xl font-medium text-gray-600">
                Search Results
              </h3>
              <table className="min-w-full table-auto border-collapse mt-4">
                <thead>
                  <tr>
                    <th className="border-b px-4 py-2 text-left">역 번호</th>
                    <th className="border-b px-4 py-2 text-left">역 이름</th>
                    <th className="border-b px-4 py-2 text-left">상/하행</th>
                    <th className="border-b px-4 py-2 text-left">호선 번호</th>
                  </tr>
                </thead>
                <tbody>
                  {stations.map((station) => (
                    <tr key={station.stationNumber}>
                      <td className="border-b px-4 py-2">
                        {station.stationNumber}
                      </td>
                      <td className="border-b px-4 py-2">
                        {station.stationName}
                      </td>
                      <td className="border-b px-4 py-2">{station.bound_to}</td>
                      <td className="border-b px-4 py-2">
                        {station.lineNumber}
                      </td>
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

export default StationSearch;
