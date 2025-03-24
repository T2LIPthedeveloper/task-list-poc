import {
  Drawer,
  Button,
  Box,
  Text,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

const CardDrawer = ({ card, onAssignUser, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const users = ["Alice", "Bob", "Charlie"]; // Replace with real user data

  if (!card || !card.title) {
    console.warn("Invalid card data:", card);
    return null;
  }

  const handleAssign = () => {
    if (selectedUser) {
      onAssignUser(card.id, selectedUser);
    }
    setIsOpen(false);
  };

  // **Ensure trigger is always a single element**
  const triggerElement = trigger ? (
    trigger
  ) : (
    <Button onClick={() => setIsOpen(true)}>Open</Button>
  );

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen} placement="end" size="md">
      <Drawer.Trigger asChild>{triggerElement}</Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.CloseTrigger asChild>
            <Button position="absolute" top={2} right={2}>
              Close
            </Button>
          </Drawer.CloseTrigger>
          <Drawer.Header>
            <Drawer.Title fontWeight="bold">Task Details</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Box mb={4}>
              <Text fontWeight="bold">Title:</Text>
              <Text>{card.title}</Text>
            </Box>
            <Box mb={3}>
              <Text fontWeight="bold" mb={1}>
                Assign User
              </Text>
              <Select
                placeholder="Select user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                {users.map((user, idx) => (
                  <option key={idx} value={user}>
                    {user}
                  </option>
                ))}
              </Select>
            </Box>
          </Drawer.Body>
          <Drawer.Footer>
            <Button colorScheme="blue" mr={3} onClick={handleAssign}>
              Assign
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default CardDrawer;
