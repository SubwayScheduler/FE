import { useState } from "react";

const CongestionForm = () => {
  const [formData, setFormData] = useState({
    stationNumber: "",
    direction: "", // Added direction for Upbound/Downbound
    time: "05:30", // default time
    congestion: "",
    action: "", // Action for Edit/Delete/Insert
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

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 5; hour <= 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 5 && minute === 0) continue; // Skip 05:00
        const time = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  return (
    <div className="min-h-20 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            혼잡도 정보 관리
          </h2>
          <p className="text-gray-500 mb-6">
            역 번호, 상/하행, 시간, 혼잡도 및 수정/삭제/삽입을 입력하십시오.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">혼잡도 정보 관리</p>
                <p>
                  역 번호, 상/하행, 시간, 혼잡도 및 수정/삭제/삽입을
                  입력하십시오.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  {/* Station Number Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="stationNumber">역 번호</label>
                    <input
                      type="text"
                      name="stationNumber"
                      id="stationNumber"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.stationNumber}
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

                  {/* Time Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="time">시간</label>
                    <select
                      name="time"
                      id="time"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.time}
                      onChange={handleChange}
                    >
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Congestion Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="congestion">혼잡도</label>
                    <input
                      type="number"
                      step="0.01"
                      name="congestion"
                      id="congestion"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.congestion}
                      onChange={handleChange}
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

export default CongestionForm;
