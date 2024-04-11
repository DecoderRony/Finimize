import { Button, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PanelItem, sidePanelItems } from "../constants";
import { auth } from "../services/Firebase-config";
import DisplayName from "./DisplayName";
import ProfileImage from "./ProfileImage";

const getActiveItem = (urlPath: string) => {
  const itemDerivedFromPath = sidePanelItems.find((item) =>
    urlPath.substring(1).includes(item.id)
  );

  if (!itemDerivedFromPath) return sidePanelItems[0];

  return itemDerivedFromPath;
};

const SidePanel = () => {
  const { pathname: urlPath } = useLocation();
  const [selectedItem, setSelectedItem] = useState(getActiveItem(urlPath));
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    setSelectedItem(getActiveItem(urlPath));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [urlPath, auth]);

  const handleClick = (item: PanelItem) => {
    navigate(item.route);
  };

  return (
    <Stack gap="0" spacing="0" mt="-3rem">
      <ProfileImage user={user} />

      <DisplayName user={user} />

      <Stack gap="0" spacing="0" w="100%" p="5" mt="5">
        {sidePanelItems.map((item) => {
          return item === selectedItem ? (
            <Button key={item.id} width="100%" p="6" justifyContent="start">
              <HStack gap="3">
                <Icon as={item.icon}></Icon>
                <Text>{item.displayName}</Text>
              </HStack>
            </Button>
          ) : (
            <HStack
              py="3"
              px="6"
              gap="3"
              key={item.id}
              _hover={{
                cursor: "pointer",
                color: "white",
              }}
              transition="0.3s"
              color="gray.500"
              onClick={() => handleClick(item)}
            >
              <Icon as={item.icon}></Icon>
              <Text>{item.displayName}</Text>
            </HStack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SidePanel;
