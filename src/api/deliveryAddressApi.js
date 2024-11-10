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

export const updateDeliveryAddress = async (addressId, addressData) => {
    try {
    const response = await apiClient.put(`/delivery-addresses/${addressId}`, addressData);
    return response.data;
    } catch (error) {
    console.error("Error updating delivery-addresses:", error);
    throw error;
    }
}

export const getDeliveryAddress = async (addressId) => {
    try {
    const response = await apiClient.get(`/delivery-addresses/${addressId}`);
    return response.data;
    } catch (error) {
    console.error("Error fetching delivery-address:", error);
    throw error;
    }
}

export const deleteDeliveryAddress = async (addressId) => {
    try {
    const response = await apiClient.delete(`/delivery-addresses/${addressId}`);
    return response.data;
    } catch (error) {
    console.error("Error deleting delivery-address:", error);
    throw error;
    }
}

export const getDefaultDeliveryAddress = async () => {
    try {
    const response = await apiClient.get(`/delivery-addresses/default`);
    return response.data;
    } catch (error) {
    console.error("Error fetching default delivery-address:", error);
    throw error;
    }
}