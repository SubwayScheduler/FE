import { useState } from "react";

const MotormanSearch = () => {
  const [formData, setFormData] = useState({
    motormanName: "",
  });

  const [motormans, setMotormans] = useState([]);

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
      { motormanName: "name example", motormanId: "motorman1" },
      { motormanName: "another name", motormanId: "motorman2" },
    ];

    // Filter data based on the input motormanName (case insensitive search)
    const filteredData = mockData.filter((motorman) =>
      motorman.motormanName
        .toLowerCase()
        .includes(formData.motormanName.toLowerCase())
    );

    setMotormans(filteredData);
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            기관사 ID 검색
          </h2>
          <p className="text-gray-500 mb-6">
            기관사 이름으로 기관사 ID와 열차 운용정보를 검색합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">기관사 검색</p>
                <p>기관사 이름을 입력하십시오.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
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

          {motormans.length > 0 && (
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <h3 className="text-xl font-medium text-gray-600">
                Search Results
              </h3>
              <ul className="mt-4">
                {motormans.map((motorman) => (
                  <li key={motorman.motormanId} className="mb-4">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-700">
                        {motorman.motormanName}
                      </p>
                      <p className="text-gray-500">{motorman.motormanId}</p>
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

export default MotormanSearch;
