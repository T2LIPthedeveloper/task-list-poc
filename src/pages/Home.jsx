import { VStack, Heading } from "@chakra-ui/react";
import KanbanBoard from "../components/KanbanBoard";

const Home = () => {
  return (
    <VStack spacing={6} p={6}>
      <Heading>Kanban Task Manager</Heading>
      <KanbanBoard />
    </VStack>
  );
};

export default Home;
