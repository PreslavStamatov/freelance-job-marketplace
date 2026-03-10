import type { AccountSetupState } from "../models/auth";
import { fetchWithAuth } from "../services/authService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { User } from "../store/models/userTypes";
import { updateAccessToken, updateUser } from "../store/slices/userSlice";
import { useLogout } from "./useLogout";

export const useCompleteAccountSetup = () => {

  // const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;
  const dispatch = useAppDispatch();
  const handleLogout = useLogout();
  const accessToken = useAppSelector(state => state.user.jwt);

  const completeAccountSetup = async (
    role: "freelancer" | "employer" | null,
    state: AccountSetupState, updateSetup: React.Dispatch<React.SetStateAction<AccountSetupState>>
  ) => {

    const nextState = {
      ...state,
      role
    };

    updateSetup(nextState);

    if(!accessToken) return;
    
      try {
        const data = await fetchWithAuth(
          `http://localhost:3000/auth/accountSetup`,
          { method: "POST",
            body: JSON.stringify(nextState)
          },
          accessToken
        );

        if (!data) return;

        const response = data.response;
        const newAccessToken = data.newAccessToken;

        if (response.status === 401) {

          handleLogout();
          return;

        } else {

          if (newAccessToken) {
            dispatch(updateAccessToken(newAccessToken));
          };

          const userData: { user: User } = await response.json();

          if (userData?.user) {
            dispatch(updateUser(userData.user));
          }

          return data;

        }
      } catch (err) {
        console.error(err);
      }

    
  };

  return { completeAccountSetup };
};