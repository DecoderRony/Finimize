import {
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PanelItem, sidePanelItems } from "../constants";
import { auth } from "../services/firebase-config";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  useEffect(() => setSelectedItem(getActiveItem(urlPath)), []);

  const currentUser = auth.currentUser;

  const handleClick = (item: PanelItem) => {
    setSelectedItem(item);
    navigate(item.route);
  };

  return (
    <Stack gap="0" spacing="0" mt="-3rem">
      <Image
        src={currentUser?.photoURL ?? ""}
        borderRadius="50%"
        transform="scale(0.3)"
      ></Image>

      <Center mt="-4.5rem">
        <Text fontWeight="bold">{currentUser?.displayName}</Text>
      </Center>

      {/* <Center> */}
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
              onClick={() => handleClick(item)}
            >
              <Icon as={item.icon} color="gray.500"></Icon>
              <Text color="gray.500">{item.displayName}</Text>
            </HStack>
          );
        })}
      </Stack>
      {/* </Center> */}
    </Stack>
  );
};

export default SidePanel;
