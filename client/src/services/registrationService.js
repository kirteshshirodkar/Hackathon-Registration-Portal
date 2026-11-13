
import api from "./api";

export const getMyRegistration = async () => {
  const { data } = await api.get("/registrations/me");
  return data;
};
