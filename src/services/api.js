import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};



export const getPaymentMethods = async () => {
  const response = await api.get(`shops/payment_method`, {
    headers: getAuthHeaders(),
  });
  return response.data.data;
};

export const setPaymentMethod = async (id) => {
  const response = await api.post(
    "shops/set-payment-method",
    { payment_method_id: id },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const deletePaymentMethod = async (id) => {
  const response = await api.post(
    "shops/delete-payment-method",
    { payment_method_id: id },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const getCartProducts = async (slug) => {
  const response = await api.post("products-details", { slug });
  return response.data.data;
};
