import { useState } from "react";

const DurationForm = () => {
  const [formData, setFormData] = useState({
    departureStationNumber: "",
    arrivalStationNumber: "",
    duration: "",
    action: "", // To store Edit/Delete/Insert action
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">소요시간 정보</h2>
          <p className="text-gray-500 mb-6">
            출발역 번호, 도착역 번호, 소요시간 및 수정/삭제/삽입을 입력하십시오.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">소요시간 정보</p>
                <p>
                  출발역 번호, 도착역 번호, 소요시간 정보를 입력하고
                  수정/삭제/삽입을 선택하십시오.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  {/* Departure Station Number Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="departureStationNumber">출발역 번호</label>
                    <input
                      type="text"
                      name="departureStationNumber"
                      id="departureStationNumber"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.departureStationNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Arrival Station Number Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="arrivalStationNumber">도착역 번호</label>
                    <input
                      type="text"
                      name="arrivalStationNumber"
                      id="arrivalStationNumber"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.arrivalStationNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Duration Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="duration">소요시간(분)</label>
                    <input
                      type="text"
                      name="duration"
                      id="duration"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="예: 5"
                    />
                  </div>

                  {/* Action Field (Edit/Delete/Insert) */}
                  <div className="md:col-span-2">
                    <label htmlFor="action">수정/삭제/삽입</label>
                    <select
                      name="action"
                      id="action"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.action}
                      onChange={handleChange}
                    >
                      <option value="">선택하세요</option>
                      <option value="Edit">수정</option>
                      <option value="Delete">삭제</option>
                      <option value="Insert">삽입</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-2 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
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

export default DurationForm;
