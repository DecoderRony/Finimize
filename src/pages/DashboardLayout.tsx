import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  ResponsiveValue,
  Show,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BodySection from "../components/BodySection";
import SidePanel from "../components/SidePanel";
import { sidePanelItems } from "../constants";

const templateAreas: ResponsiveValue<string> = `"sidePanel body"`;
const templateRows: ResponsiveValue<string> = "repeat(1, 100%)";
const templateColumns: ResponsiveValue<string> = "15rem 1fr";

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <Grid
      w="100vw"
      h="100vh"
      templateAreas={{
        base: `"navbar"
                "body"`,
        md: templateAreas,
        lg: templateAreas,
        xl: templateAreas,
      }}
      templateRows={{
        base: "4rem 1fr",
        md: templateRows,
        lg: templateRows,
        xl: templateRows,
      }}
      templateColumns={{
        base: "100%",
        md: templateColumns,
        lg: templateColumns,
        xl: templateColumns,
      }}
    >
      <Show above="md">
        <GridItem area={"sidePanel"}>
          <SidePanel />
        </GridItem>
      </Show>

      <Show below="md">
        <GridItem
          area={"navbar"}
          pt="2"
          pr={{ base: "2", lg: 10, xl: 10 }}
          pl={{ base: "2", lg: 0, xl: 0 }}
        >
          <Box
            zIndex="5"
            bgColor="gray.700"
            borderRadius="0.4rem"
            backdropFilter="blur(10px)"
            overflowX="scroll"
            style={{ scrollbarWidth: "none" }}
          >
            <HStack spacing={0}>
              {sidePanelItems.map((item) => (
                <Button
                  key={item.id}
                  colorScheme="teal"
                  m="2"
                  borderRadius="0.3rem"
                  px="3rem"
                  onClick={() => navigate(item.route)}
                >
                  {item.displayName}
                </Button>
              ))}
            </HStack>
          </Box>
        </GridItem>
      </Show>

      <GridItem
        area={"body"}
        py={{ base: "2", lg: 10, xl: 10 }}
        pr={{ base: "2", lg: 10, xl: 10 }}
        pl={{ base: "2", lg: 0, xl: 0 }}
      >
        <BodySection />
      </GridItem>
    </Grid>
  );
};

export default DashboardLayout;
