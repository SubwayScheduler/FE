import { useState } from "react";
import MotormanRegisterForm from "../../components/MotormanRegisterForm/MotormanRegisterForm";
import MotormanSearch from "../../components/MotormanSearch/MotormanSearch";
import MotormanEditForm from "../../components/MotormanEditForm/MotormanEditForm";
import MotormanDeleteForm from "../../components/MotormanDeleteForm/MotormanDeleteForm";
import TrainCreateForm from "../../components/TrainCreateForm/TrainCreateForm";
import TrainSearchForm from "../../components/TrainSearchForm/TrainSearchForm";
import TrainUpdateForm from "../../components/TrainUpdateForm/TrainUpdateForm";
import TrainDeleteForm from "../../components/TrainDeleteForm/TrainDeleteForm";
import LineCreateForm from "../../components/LineCreateForm/LineCreateForm";
import LineSearchForm from "../../components/LineSearchForm/LineSearchForm";
import EditLineForm from "../../components/EditLineForm/EditLineForm";
import LineDeleteForm from "../../components/LineDeleteForm/LineDeleteForm";
import DriveByTrainSearch from "../../components/DriveByTrainSearch/DriveByTrainSearch";
import DriveByMotormanSearch from "../../components/DriveByMotormanSearch/DriveByMotormanSearch";
import DriveCreateForm from "../../components/DriveCreateForm/DriveCreateForm";
import DriveDeleteForm from "../../components/DriveDeleteForm/DriveDeleteForm";
import StationUpdateForm from "../../components/StationUpdateForm/StationUpdateForm";
import CongestionUpdateForm from "../../components/CongestionUpdateForm/CongestionUpdateForm";
import DownloadStationForm from "../../components/DownloadStationForm/DownloadStationForm";
import DownloadCongestionForm from "../../components/DownloadCongestionForm/DownloadCongestionForm";

export default function AdminCRUD() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState(null);

  const toggleGroup = (group) => {
    setExpandedGroup((prevGroup) => (prevGroup === group ? null : group));
  };

  const renderComponent = () => {
    switch (selectedMenu) {
      case "기관사 등록":
        return <MotormanRegisterForm />;
      case "기관사 검색":
        return <MotormanSearch />;
      case "기관사 수정":
        return <MotormanEditForm />;
      case "기관사 삭제":
        return <MotormanDeleteForm />;
      case "객차 등록":
        return <TrainCreateForm />;
      case "객차 검색":
        return <TrainSearchForm />;
      case "객차 수정":
        return <TrainUpdateForm />;
      case "객차 삭제":
        return <TrainDeleteForm />;
      case "호선 등록":
        return <LineCreateForm />;
      case "호선 조회":
        return <LineSearchForm />;
      case "호선 수정":
        return <EditLineForm />;
      case "호선 삭제":
        return <LineDeleteForm />;
      case "객차별 운전 정보 조회":
        return <DriveByTrainSearch />;
      case "기관사별 운전 정보 조회":
        return <DriveByMotormanSearch />;
      case "운전 정보 등록":
        return <DriveCreateForm />;
      case "운전 정보 삭제":
        return <DriveDeleteForm />;
      case "호선별 역/플랫폼 정보 업데이트":
        return <StationUpdateForm />;
      case "호선별 혼잡도 정보 업데이트":
        return <CongestionUpdateForm />;
      case "호선별 역 정보 다운로드 (csv)":
        return <DownloadStationForm />;
      case "호선별 혼잡도 정보 다운로드 (csv)":
        return <DownloadCongestionForm />;
      default:
        return null;
    }
  };

  return (
    <section className="mt-28 mx-auto md:w-9/12">
      <div className="flex flex-col md:flex-row gap-x-6 overflow-x-auto">
        {[
          "기관사 관리",
          "객차 관리",
          "호선 관리",
          "운전 정보 관리",
          "호선 정보 업데이트",
          "호선 정보 다운로드",
        ].map((group) => (
          <div
            key={group}
            className={`transition-all duration-300 ${
              expandedGroup === group
                ? "flex-grow-[2] bg-gray-200"
                : "flex-grow bg-gray-100"
            } md:rounded-lg p-4`}
          >
            <button
              className="text-lg font-bold"
              onClick={() => toggleGroup(group)}
            >
              {group}
            </button>
            {expandedGroup === group && (
              <ul className="mt-4 space-y-2">
                {group === "기관사 관리" && (
                  <>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("기관사 등록")}
                        className="block"
                      >
                        기관사 등록
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("기관사 검색")}
                        className="block"
                      >
                        기관사 검색
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("기관사 수정")}
                        className="block"
                      >
                        기관사 수정
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("기관사 삭제")}
                        className="block"
                      >
                        기관사 삭제
                      </button>
                    </li>
                  </>
                )}
                {group === "객차 관리" && (
                  <>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("객차 등록")}
                        className="block"
                      >
                        객차 등록
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("객차 검색")}
                        className="block"
                      >
                        객차 검색
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("객차 수정")}
                        className="block"
                      >
                        객차 수정
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("객차 삭제")}
                        className="block"
                      >
                        객차 삭제
                      </button>
                    </li>
                  </>
                )}
                {group === "호선 관리" && (
                  <>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("호선 등록")}
                        className="block"
                      >
                        호선 등록
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("호선 조회")}
                        className="block"
                      >
                        호선 조회
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("호선 수정")}
                        className="block"
                      >
                        호선 수정
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("호선 삭제")}
                        className="block"
                      >
                        호선 삭제
                      </button>
                    </li>
                  </>
                )}
                {group === "운전 정보 관리" && (
                  <>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("객차별 운전 정보 조회")}
                        className="block"
                      >
                        객차별 운전 정보 조회
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setSelectedMenu("기관사별 운전 정보 조회")
                        }
                        className="block"
                      >
                        기관사별 운전 정보 조회
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("운전 정보 등록")}
                        className="block"
                      >
                        운전 정보 등록
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedMenu("운전 정보 삭제")}
                        className="block"
                      >
                        운전 정보 삭제
                      </button>
                    </li>
                  </>
                )}
                {group === "호선 정보 업데이트" && (
                  <>
                    <li>
                      <button
                        onClick={() =>
                          setSelectedMenu("호선별 역/플랫폼 정보 업데이트")
                        }
                        className="block"
                      >
                        호선별 역/플랫폼 정보 업데이트
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setSelectedMenu("호선별 혼잡도 정보 업데이트")
                        }
                        className="block"
                      >
                        호선별 혼잡도 정보 업데이트
                      </button>
                    </li>
                  </>
                )}
                {group === "호선 정보 다운로드" && (
                  <>
                    <li>
                      <button
                        onClick={() =>
                          setSelectedMenu("호선별 역 정보 다운로드 (csv)")
                        }
                        className="block"
                      >
                        호선별 역 정보 다운로드 (csv)
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setSelectedMenu("호선별 혼잡도 정보 다운로드 (csv)")
                        }
                        className="block"
                      >
                        호선별 혼잡도 정보 다운로드 (csv)
                      </button>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="py-14 min-h-screen">{renderComponent()}</div>
    </section>
  );
}
