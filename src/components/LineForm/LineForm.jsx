import { useState } from "react";

const LineForm = () => {
  const [formData, setFormData] = useState({
    stationNumber: "",
    direction: "",
    lineNumber: "",
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
            노선 정보 수정
          </h2>
          <p className="text-gray-500 mb-6">
            역 번호를 이용해 상/하행, 호선 번호를 수정합니다.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">노선 정보</p>
                <p>
                  역 번호, 상/하행, 호선 번호와 수정/삭제/삽입 정보를
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

export default LineForm;
