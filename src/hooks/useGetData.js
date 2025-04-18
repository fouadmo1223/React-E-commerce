// useGetData.js
import axios from "axios";
import Cookie from "cookie-universal";
import { baseUrl } from "../api/api";

export default function useGetData() {
  const cookie = Cookie();
  const token = cookie.get("E-commerce");

  async function getData(api) {
    try {
      const res = await axios.get(`${baseUrl}/${api}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      
      console.error("Error fetching data:", e);
      throw e;
    }
  }


  async function putData(api, editedUser) {
    try {
      const res = await axios.post(
        `${baseUrl}/${api}`,
        editedUser, // This should be the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (e) {
      console.error("Error updating data:", e);
      throw e;
    }
  }

  return { getData, putData };
}
