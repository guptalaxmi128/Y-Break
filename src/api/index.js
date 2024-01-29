import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: 'https://y-break.onrender.com/',

});

api.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).authToken
      }`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export const addAdmin = (userInfo) => api.post(`api/admin/register`, userInfo);
export const login = (userInfo) => api.post(`api/admin/login`, userInfo);
export const createCard = (formData) => {
    return api.post(`api/admin/createCard`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  export const getCard = () => api.get(`api/admin/cards`);
  export const deleteCard = (id) =>
  api.delete(`api/admin/deleteCard/${id}`);
  export const updateCard = (formData) => {
    const id = formData.get('id');
    formData.delete('id');
    return api.put(`api/admin/updateCard/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  export const getCardById = (id) => api.get(`api/admin/cards/${id}`);

  export const addCardData = (cardInfo) => {
    return api.post(`api/admin/createCardData`, cardInfo);
  };

  export const getCardData = (cardId) => api.get(`api/admin/cardsData/${cardId}`);
  export const deleteCardData = (id) =>
  api.delete(`api/admin/deleteCardData/${id}`);
  export const updateCardData = ({id,...dataInfo}) => {
    return api.put(`api/admin/updateCardData/${id}`, dataInfo)
  };

 

  export const addSteps = (stepsInfo) => {
    return api.post(`api/admin/createStep`, stepsInfo);
  };

  export const getSteps = (cardId) => api.get(`api/admin/steps/${cardId}`); 
  export const deleteSteps = (id) =>
  api.delete(`api/admin/deleteStep/${id}`);
  export const updateSteps = ({id,...stepsInfo}) => {
    return api.put(`api/admin/updateStep/${id}`, stepsInfo)
  };

  export const getUsers = () => api.get(`api/admin/users`); 