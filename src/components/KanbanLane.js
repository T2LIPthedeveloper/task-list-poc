// KanbanLane.js
import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";

const KanbanLane = ({ laneId, tasks = [], title, bgColor = "gray.50", borderColor = "gray.200", onAssignUser }) => {
  const { setNodeRef } = useDroppable({ id: laneId });

  return (
    <Flex flex="1" minW={{ base: "100%", lg: "250px" }} maxW={{ base: "100%", lg: "400px" }} padding={4} flexDirection="column" minH="30rem">
      <Text fontSize="lg" fontWeight="bold" color="blue.700" mb={2}>
        {title || laneId.toUpperCase()}
      </Text>
      <Flex
        ref={setNodeRef}
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        flex="1"
        padding={3}
        flexDirection="column"
        gap={3}
        overflow="auto"
      >
        {tasks.map((task, index) => (
          <KanbanCard key={task.id} task={task} index={index} parent={laneId} onAssignUser={onAssignUser} />
        ))}
      </Flex>
    </Flex>
  );
};

export default KanbanLane;
