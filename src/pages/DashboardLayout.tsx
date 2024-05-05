import { Grid, GridItem, ResponsiveValue, Show } from "@chakra-ui/react";
import BodySection from "../components/BodySection";
import SidePanel from "../components/SidePanel";
import Navbar from "../components/Navbar";

const templateAreas: ResponsiveValue<string> = `"sidePanel body"`;
const templateRows: ResponsiveValue<string> = "repeat(1, 100%)";
const templateColumns: ResponsiveValue<string> = "15rem 1fr";

const DashboardLayout = () => {
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
          <Navbar />
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
