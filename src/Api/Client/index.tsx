import AxiosInstance from "../../AxiosInstance";

// 오늘의 묵상
const getTodayMeditation = (date: string) => {
  return AxiosInstance.get(`/client/todayMeditation?date=${date}`);
};

export { getTodayMeditation };
