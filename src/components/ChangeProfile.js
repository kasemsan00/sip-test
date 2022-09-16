import { useSelector } from "react-redux";

export default function ChangeProfile() {
    const profile = useSelector((state) => state.profile);

    console.log(profile);

    const handleProfileChange = (event) => {
        console.log(event.target.value);
    };

    return (
        <select className="select select-bordered select-sm w-full" onChange={(event) => handleProfileChange(event)}>
            {/* {profile.map((item, index) => {
                return (
                    <option key={index} value="profile1">
                        {item.name}
                    </option>
                );
            })} */}
        </select>
    );
}
