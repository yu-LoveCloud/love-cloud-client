import { apiClient } from "./apiClient";

export const getFundingList = async () => {
  try {
    //TODO: coupleId를 파라미터로 받아서 사용하도록 수정
    const response = await apiClient.get("/couples/1/fundings");
    return response.data;
  } catch (error) {
    console.error("Error fetching funding list:", error);
    throw error;
  }
};
