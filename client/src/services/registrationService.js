import api from "./api";

export const getMyRegistration = async () => {
  const { data } = await api.get("/registrations/me");
  return data;
};

export const submitRegistration = async (registrationData) => {
  const { data } = await api.post(
    "/registrations",
    registrationData
  );

  return data;
};