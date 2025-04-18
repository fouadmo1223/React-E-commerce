import { useContext } from "react";
import { UserContext } from "./../../../contetx/UserContetx";

export default function useCheckUser() {
  const { user } = useContext(UserContext);
  return !!user;
}