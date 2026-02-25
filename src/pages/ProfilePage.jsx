import { useSelector } from "react-redux";
import Profile from "../components/Profile/Profile";
import { selectUser } from "../redux/Auth/selectors";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
