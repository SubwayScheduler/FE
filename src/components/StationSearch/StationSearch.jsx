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

    // Simulated response data from the server
    const mockData = [
      { stationNumber: "001", stationName: "Station A" },
      { stationNumber: "002", stationName: "Station B" },
      { stationNumber: "003", stationName: "Station C" },
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
          <h2 className="font-semibold text-xl text-gray-600">역번호 검색</h2>
          <p className="text-gray-500 mb-6">역 이름으로 검색하세요.</p>

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
              <ul className="mt-4">
                {stations.map((station) => (
                  <li key={station.stationNumber} className="mb-4">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-700">
                        {station.stationName}
                      </p>
                      <p className="text-gray-500">{station.stationNumber}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationSearch;