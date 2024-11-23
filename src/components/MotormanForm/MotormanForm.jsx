import { useState } from "react";

const MotormanForm = () => {
  const [formData, setFormData] = useState({
    motormanId: "",
    carriageId: "",
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
          <h2 className="font-semibold text-xl text-gray-600">
            기관사 열차운용 정보 수정
          </h2>
          <p className="text-gray-500 mb-6">
            기관사 ID, 객차 ID와 수정/삭제/삽입 정보를 입력하십시오.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">기관사 정보</p>
                <p>기관사 ID, 객차 ID와 수정/삭제/삽입 정보를 입력하십시오.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                  {/* Motorman ID Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="motormanId">기관사 ID</label>
                    <input
                      type="text"
                      name="motormanId"
                      id="motormanId"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.motormanId}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Carriage ID Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="carriageId">객차 ID</label>
                    <input
                      type="text"
                      name="carriageId"
                      id="carriageId"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.carriageId}
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

export default MotormanForm;
