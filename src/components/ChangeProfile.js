import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectProfile } from "../redux/slices/profileSelectSlice";

const initialProfile = "profile1";

export default function ChangeProfile() {
  const dispatch = useDispatch();
  const profileSelect = useSelector((state) => state.profileSelect);
  const profileData = useSelector((state) => state.profileData);
  const status = useSelector((state) => state.registerStatus);

  useEffect(() => {
    if (localStorage.getItem("profileSelect") === null) {
      localStorage.setItem("profileSelect", initialProfile);
      dispatch(setSelectProfile(initialProfile));
    } else {
      dispatch(setSelectProfile(localStorage.getItem("profileSelect")));
    }
  }, [dispatch]);

  const handleProfileChange = (event) => {
    localStorage.setItem("profileSelect", event.target.value);
    dispatch(setSelectProfile(event.target.value));
  };

  return (
    <select
      className="select select-bordered select-xs max-w-[200px] min-w-[200px]"
      value={profileSelect}
      onChange={(event) => handleProfileChange(event)}
      disabled={!(status === "" || status === "disconnected")}
    >
      {Object.keys(profileData).map((profileName, index) => {
        return (
          <option key={index} value={profileName}>
            {profileData[profileName].extension + "@" + profileData[profileName].server + ")"}
          </option>
        );
      })}
    </select>
  );
}
