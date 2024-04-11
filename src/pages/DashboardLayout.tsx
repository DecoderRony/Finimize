import { Grid, GridItem, ResponsiveValue } from "@chakra-ui/react";
import BodySection from "../components/BodySection";
import SidePanel from "../components/SidePanel";

const templateAreas: ResponsiveValue<string> = `"sidePanel body"`;
const templateRows: ResponsiveValue<string> = "repeat(2, 100%)";
const templateColumns: ResponsiveValue<string> = "15rem 1fr";

const DashboardLayout = () => {
  return (
    <Grid
      w="100vw"
      h="100vh"
      templateAreas={templateAreas}
      templateRows={templateRows}
      templateColumns={templateColumns}
    >
      <GridItem area={"sidePanel"}>
        <SidePanel />
      </GridItem>

      <GridItem area={"body"} py="10" pr="10">
        <BodySection />
      </GridItem>
    </Grid>
  );
};

export default DashboardLayout;
