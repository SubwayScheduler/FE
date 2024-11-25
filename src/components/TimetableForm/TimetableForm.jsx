import { useState } from "react";

const TimetableForm = () => {
  const [formData, setFormData] = useState({
    lineNumber: "",
    direction: "",
    availableTrains: "",
  });

  const [timetableData, setTimetableData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate mock data from the server
    const mockData = [
      { lineNumber: "Line 1", direction: "Upbound", availableTrains: 5 },
      { lineNumber: "Line 2", direction: "Downbound", availableTrains: 3 },
      { lineNumber: "Line 3", direction: "Upbound", availableTrains: 6 },
    ];

    // Set mock data as the timetable data
    setTimetableData(mockData);
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            열차 운행 시간표
          </h2>
          <p className="text-gray-500 mb-6">
            호선 번호, 상/하행, 이용 가능 열차 대수를 입력하고 제출하여 시간표를
            확인하십시오.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">열차 운행 시간표 입력</p>
                <p>호선 번호, 상/하행, 이용 가능 열차 대수를 입력하십시오.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  {/* Line Number Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="lineNumber">호선 번호</label>
                    <input
                      type="text"
                      name="lineNumber"
                      id="lineNumber"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.lineNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Direction Field (Upbound/Downbound) */}
                  <div className="md:col-span-2">
                    <label htmlFor="direction">상/하행</label>
                    <select
                      name="direction"
                      id="direction"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.direction}
                      onChange={handleChange}
                    >
                      <option value="">선택하세요</option>
                      <option value="Upbound">상행</option>
                      <option value="Downbound">하행</option>
                    </select>
                  </div>

                  {/* Available Trains Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="availableTrains">이용 가능 열차 대수</label>
                    <input
                      type="number"
                      name="availableTrains"
                      id="availableTrains"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.availableTrains}
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
                        제출
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Display Timetable Table */}
          {timetableData.length > 0 && (
            <div className="bg-white rounded shadow-lg p-4 md:p-8">
              <h3 className="text-xl font-medium text-gray-600 mb-4">
                열차 운행 시간표
              </h3>
              <table className="min-w-full table-auto border-collapse">
                {/* <thead>
                  <tr>
                    <th className="border-b px-4 py-2 text-left">호선 번호</th>
                    <th className="border-b px-4 py-2 text-left">상/하행</th>
                    <th className="border-b px-4 py-2 text-left">
                      이용 가능 열차 대수
                    </th>
                  </tr>
                </thead> */}
                <tbody>
                  {timetableData.map((data, index) => (
                    <tr key={index}>
                      <td className="border-b px-4 py-2">{data.lineNumber}</td>
                      <td className="border-b px-4 py-2">{data.direction}</td>
                      <td className="border-b px-4 py-2">
                        {data.availableTrains}
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

export default TimetableForm;
