import { useState } from "react";
import CongestionForm from "../../components/CongestionForm/CongestionForm";
import DurationForm from "../../components/DurationForm/DurationForm";
import LineForm from "../../components/LineForm/LineForm";
import MotormanForm from "../../components/MotormanForm/MotormanForm";
import MotormanSearch from "../../components/MotormanSearch/MotormanSearch";
import StationForm from "../../components/StationForm/StationForm";
import StationSearch from "../../components/StationSearch/StationSearch";
import TrainOperationForm from "../../components/TrainOperationForm/TrainOperationForm";

export default function AdminCRUD() {
  const [selectedMenu, setSelectedMenu] = useState("MotormanSearch");

  const renderComponent = () => {
    switch (selectedMenu) {
      case "MotormanSearch":
        return <MotormanSearch />;
      case "MotormanForm":
        return <MotormanForm />;
      case "StationSearch":
        return <StationSearch />;
      case "StationForm":
        return <StationForm />;
      case "LineForm":
        return <LineForm />;
      case "TrainOperationForm":
        return <TrainOperationForm />;
      case "DurationForm":
        return <DurationForm />;
      case "CongestionForm":
        return <CongestionForm />;
      default:
        return null;
    }
  };

  return (
    <section className="mt-28 mx-auto md:w-9/12">
      <ul className="flex flex-row gap-x-4 gap-y-3 flex-wrap font-bold text-sm">
        <li className="bg-gray-100 rounded px-3 py-2">
          <button onClick={() => setSelectedMenu("MotormanSearch")}>
            기관사 ID 검색
          </button>
        </li>
        <li className="bg-gray-100 rounded px-3 py-2">
          <button onClick={() => setSelectedMenu("MotormanForm")}>
            기관사 열차운용 정보 수정
          </button>
        </li>
        <li className="bg-gray-100 rounded px-3 py-2">
          <button onClick={() => setSelectedMenu("StationSearch")}>
            역번호 검색
          </button>
        </li>
        <li className="bg-gray-100 rounded px-3 py-2">
          <button onClick={() => setSelectedMenu("LineForm")}>
            노선 정보 수정
          </button>
        </li>
        <li className="bg-gray-100 rounded px-3 py-2">
          <button onClick={() => setSelectedMenu("TrainOperationForm")}>
            열차 운용 정보
          </button>
        </li>
        <li className="bg-gray-100 rounded px-3 py-2">
          <button onClick={() => setSelectedMenu("StationForm")}>
            역 정보 수정
          </button>
        </li>
        <li className="bg-gray-100 rounded px-3 py-2">
          <button onClick={() => setSelectedMenu("DurationForm")}>
            소요시간 정보
          </button>
        </li>
        <li className="bg-gray-100 rounded px-3 py-2">
          <button onClick={() => setSelectedMenu("CongestionForm")}>
            혼잡도 정보 관리
          </button>
        </li>
      </ul>
      <div className="py-14">{renderComponent()}</div>
    </section>
  );
}
