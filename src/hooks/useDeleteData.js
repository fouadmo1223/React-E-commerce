
import { Axios } from "../api/axios";

export default function useDeleteData() {
  
  async function deleteData(api) {
    try {
      const res = await Axios.delete(api);
      return res.data;
    } catch (e) {
      console.error("Error deleting data:", e);
      throw e;
    }
  }
  return { deleteData };
}
