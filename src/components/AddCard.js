import React, { useState } from "react";
import {
    Box,
    Input,
    Button,
    Flex,
    Text,
} from "@chakra-ui/react";

const AddCard = ({ addCard }) => {
    const [title, setTitle] = useState("");

    const handleAddCard = () => {
        if (title.trim()) {
            addCard(title);
            setTitle("");
        }
    };

    return (
        <Box p={4} bg="white" borderRadius="md" boxShadow="md" mb={4}>
            <Flex align="center" mb={3}>
                <Text fontSize="lg" fontWeight="bold" color="blue.600">Add a new task</Text>
            </Flex>
            <Flex>
                <Input
                    placeholder="Enter task title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && title.trim() && handleAddCard()}
                    mr={3}
                    size="md"
                    borderRadius="md"
                    boxShadow="sm"
                    bg="white"
                    color="gray.800"
                />
                <Button
                    colorScheme="blue"
                    onClick={handleAddCard}
                    isDisabled={!title.trim()}
                    size="md"
                    boxShadow="sm"
                >
                    Add Task
                </Button>
            </Flex>
        </Box>
    );
};

export default AddCard;
