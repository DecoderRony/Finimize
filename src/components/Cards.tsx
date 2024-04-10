import { Card, CardBody, CardHeader, StyleProps } from "@chakra-ui/react";
import React from "react";

interface Props extends StyleProps {
  title: string;
  children: React.ReactNode;
}

const Cards = ({
  title,
  children: childComponent,
  ...chakraSystemProps
}: Props) => {
  return (
    <Card bgColor="gray.900" borderRadius="0.6rem" {...chakraSystemProps}>
      <CardHeader fontWeight="bold" px="3" py="2">
        {title}
      </CardHeader>
      <hr />
      <CardBody>{childComponent}</CardBody>
    </Card>
  );
};

export default Cards;
