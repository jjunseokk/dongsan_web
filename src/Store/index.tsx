import { create } from "zustand";
import { persist } from "zustand/middleware";

interface profileType {
  profile: any;
  setProfile: (value: {}) => void;
}

const userProfileStore = create(
  persist<profileType>(
    (set) => ({
      profile: {
        id: 0,
        name: "",
        password: "",
        phoneNumber: "",
        thumbnail: "",
        userApprove: "",
        userId: "",
      },
      setProfile: (value) =>
        set((state) => ({
          profile: { ...state.profile, ...value },
        })),
    }),
    {
      name: "userProfile",
    }
  )
);

export default userProfileStore;
