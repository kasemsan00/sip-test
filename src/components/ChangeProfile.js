export default function ChangeProfile() {
    const handleProfileChange = (event) => {
        console.log(event.target.value);
    };

    return (
        <select className="select select-bordered select-sm w-full" onChange={(event) => handleProfileChange(event)}>
            <option value="profile1">Profile 1</option>
            <option value="profile2">Profile 2</option>
            <option value="profile3">Profile 3</option>
            <option value="profile4">Profile 4</option>
        </select>
    );
}
