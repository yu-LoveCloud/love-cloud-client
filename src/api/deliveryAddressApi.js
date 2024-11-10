import { apiClient } from "./apiClient";


export const getDeliveryAddressList = async () => {
    try {
      const response = await apiClient.get(`/delivery-addresses`);
      return response.data;
    } catch (error) {
      console.error("Error fetching delivry-addresses:", error);
      throw error;
    }
  };