import { apiClient } from "./apiClient";

export const getItem = async (productOptionsId) => {
  try {
    const response = await apiClient.get("items/" + productOptionsId);
    return response.data;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
};
