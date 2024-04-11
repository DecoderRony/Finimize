import { Image, SkeletonCircle } from "@chakra-ui/react";
import { AuthenticatedUserDetails } from "../interface";

const ProfileImage = ({ user }: AuthenticatedUserDetails) => {
  if (user) {
    return (
      <Image
        src={user.photoURL ?? ""}
        borderRadius="50%"
        transform="scale(0.3)"
      ></Image>
    );
  }

  return <SkeletonCircle size="15rem" transform="scale(0.3)" />;
};

export default ProfileImage;
