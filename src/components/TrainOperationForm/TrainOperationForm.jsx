import { useState } from "react";

const TrainOperationForm = () => {
  const [formData, setFormData] = useState({
    trainId: "",
    lineNumber: "",
    capacity: "", // Replaced direction with capacity
    action: "",
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
          <h2 className="font-semibold text-xl text-gray-600">
            열차 운용 정보
          </h2>
          <p className="text-gray-500 mb-6">
            열차ID를 이용해 호선번호, 수용량 정보를 수정합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">열차 운용 정보</p>
                <p>
                  열차ID, 호선번호, 수용량 정보를 입력하고 수정/삭제/삽입을
                  선택하십시오.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  {/* Train ID Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="trainId">열차 ID</label>
                    <input
                      type="text"
                      name="trainId"
                      id="trainId"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.trainId}
                      onChange={handleChange}
                    />
                  </div>

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

                  {/* Capacity Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="capacity">수용량</label>
                    <input
                      type="number"
                      name="capacity"
                      id="capacity"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.capacity}
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

export default TrainOperationForm;
