import Storage from "../storage";

const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const token = Storage.getItem("TOKEN");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export default fetchWithToken;
