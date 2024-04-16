import { Image, SkeletonCircle } from "@chakra-ui/react";
import { AuthenticatedUserDetails } from "../interface";
import ProfileImg from "../assets/profile-img.png";

const ProfileImage = ({ user }: AuthenticatedUserDetails) => {
  if (user) {
    return (
      <Image
        src={user.photoURL ?? ProfileImg}
        borderRadius="50%"
        transform="scale(0.3)"
      ></Image>
    );
  }

  return <SkeletonCircle size="15rem" transform="scale(0.3)" />;
};

export default ProfileImage;
