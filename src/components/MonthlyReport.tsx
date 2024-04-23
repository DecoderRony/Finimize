import { SimpleGrid } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ExpensesProps } from "../interface";

interface BarProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = ({ fill, x, y, width, height }: BarProps) => {
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const MonthlyReport = ({ expenses }: ExpensesProps) => {
  const currentMonthExpenses = expenses?.filter((expense) => {
    const date = new Date();
    const splitDateString = expense.date.split("-");
    return date.getMonth() + 1 === +splitDateString[1];
  });

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 2 }} w="100%" h="100%">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={currentMonthExpenses}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" minTickGap={1} />
          <YAxis includeHidden domain={[0, 5000]} allowDataOverflow />
          <Tooltip />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {currentMonthExpenses?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={currentMonthExpenses}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" minTickGap={1} />
          <YAxis includeHidden domain={[0, 5000]} allowDataOverflow />
          <Tooltip />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {currentMonthExpenses?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </SimpleGrid>
  );
};

export default MonthlyReport;
