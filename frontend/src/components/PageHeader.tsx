import { HStack, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, children }: Props) => {
  return (
    <HStack justifyContent="space-between" pb="3">
      <Text fontSize="1.8rem" fontWeight="bold">
        {title}
      </Text>

      {children}
    </HStack>
  );
};

export default PageHeader;
