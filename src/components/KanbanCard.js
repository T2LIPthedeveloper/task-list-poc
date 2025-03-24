import { Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import CardDrawer from "./CardDrawer";

const KanbanCard = ({ task, index, parent, onAssignUser }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { title: task.title, index, parent, task },
  });

  if (!task || !task.title) {
    console.warn("Invalid task data:", task);
    return null;
  }

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: transform ? 1000 : undefined,
  };

  return (
    <CardDrawer
      card={task}
      onAssignUser={onAssignUser}
      trigger={
        // **Single React element to satisfy Drawer.Trigger**
        <Flex
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          padding={4}
          backgroundColor="white"
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.200"
          boxShadow="sm"
          width="100%"
          alignItems="center"
          _hover={{ boxShadow: "md", cursor: "pointer" }}
          transition="box-shadow 0.2s"
        >
          <Text fontWeight="medium" color="gray.700">
            {task.title}
          </Text>
        </Flex>
      }
    />
  );
};

export default KanbanCard;
