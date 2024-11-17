import { apiClient } from "./apiClient";

export const getInvitationImageList = async () => {
  try {
    const response = await apiClient.get("/invitation-images");
    return response.data;
  } catch (error) {
    console.error("Error fetching invitation image list:", error);
    throw error;
  }
};

export const getMyInvitation = async () => {
  try {
    const response = await apiClient.get("/invitations");
    return response.data;
  } catch (error) {
    console.error("Error fetching my-invitation:", error);
    throw error;
  }
};

export const getInvitation = async (invitationId) => {
  try {
    const response = await apiClient.get(`/invitations/${invitationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invitation:", error);
    throw error;
  }
};

export const createInvitation = async (invitationData) => {
  try {
    const response = await apiClient.post("/invitations", invitationData);
    return response.data;
  } catch (error) {
    console.error("Error creating invitation:", error);
    throw error;
  }
};

export const updateInvitation = async (invitationData) => {
  try {
    const response = await apiClient.put(`/invitations`, invitationData);
    return response.data;
  } catch (error) {
    console.error("Error updating invitation:", error);
    throw error;
  }
};

export const deleteInvitation = async () => {
  try {
    const response = await apiClient.delete(`/invitations`);
    return response.data;
  } catch (error) {
    console.error("Error deleting invitation:", error);
    throw error;
  }
};
