import { Grid, GridItem } from "@chakra-ui/react";
import Cards from "../components/Cards";
import ExpenseOverView from "../components/ExpenseOverview";
import MonthlyReport from "../components/MonthlyReport";
import RecentExpenses from "../components/RecentExpenses";
import useQuerySnapshotDocs from "../hooks/useQuerySnapshotDocs";

const templateAreasLg = `"overview recent-expenses"
                       "monthly-report monthly-report"`;

const templateAreasSm = `"overview overview"
                         "recent-expenses recent-expenses"
                         "monthly-report monthly-report"`;

const templateColumnsLg = "40% 1fr";

const templateColumnsSm = "1fr";

const Home = () => {
  const expenses = useQuerySnapshotDocs();

  return (
    <Grid
      templateAreas={{
        base: templateAreasSm,
        lg: templateAreasLg,
        xl: templateAreasLg,
      }}
      templateColumns={{
        base: templateColumnsSm,
        lg: templateColumnsLg,
        xl: templateColumnsLg,
      }}
      pt={{ base: "1rem", md: "4rem", lg: "4rem", xl: "4rem" }}
      pb={{ base: "1rem", md: "2rem", lg: "2rem", xl: "2rem" }}
    >
      <GridItem area="overview">
        <Cards
          title="Overview"
          ml={{ base: 4, lg: 6, xl: 6 }}
          mr={{ base: 4, lg: 0, xl: 0 }}
        >
            <ExpenseOverView expenses={expenses} />
        </Cards>
      </GridItem>

      <GridItem area="recent-expenses" mt={{ base: 4, lg: 0, xl: 0 }}>
        <Cards title="Recent Expenses" mx={{ base: 4, lg: 6, xl: 6 }}>
          <RecentExpenses expenses={expenses} />
        </Cards>
      </GridItem>

      <GridItem area="monthly-report">
        <Cards
          title="Monthly Report"
          mx={{ base: 4, lg: 6, xl: 6 }}
          mt={4}
          h={{
            base: "calc(100vh - 22.1rem)",
            md: "calc(100vh - 21.6rem)",
            lg: "calc(100vh - 23.55rem)",
            xl: "calc(100vh - 23.55rem)",
          }}
        >
          <MonthlyReport expenses={expenses} />
        </Cards>
      </GridItem>
    </Grid>
  );
};

export default Home;
