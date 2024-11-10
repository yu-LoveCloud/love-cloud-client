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

export const createDeliveryAddress = async (addressData) => {
    try {
    const response = await apiClient.post("/delivery-addresses", addressData);
    return response.data;
    } catch (error) {
    console.error("Error creating delivery-addresses:", error);
    throw error;
    }
};