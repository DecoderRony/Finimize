import { Grid, GridItem } from "@chakra-ui/react";
import ExpenseOverview from "../components/ExpenseOverview";
import Cards from "../components/Cards";

const templateAreas = `"overview recent-expenses"
                       "monthly-report monthly-report"`;

const Home = () => {
  return (
    <Grid templateAreas={templateAreas} templateColumns={"40% 1fr"} pt="4rem">
      <GridItem area="overview">
        <Cards title="Overview" ml={6}>
          <ExpenseOverview />
        </Cards>
      </GridItem>

      <GridItem area="recent-expenses">
        <Cards title="Recent Expenses" ml={4} mr={6}>
          <ExpenseOverview />
        </Cards>
      </GridItem>

      <GridItem area="monthly-report">
        <Cards title="Monthly Report" mx={6} mt={4}>
          <ExpenseOverview />
        </Cards>
      </GridItem>
    </Grid>
  );
};

export default Home;
