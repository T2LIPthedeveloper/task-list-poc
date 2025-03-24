import { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import KanbanLane from "./KanbanLane";
import AddCard from "./AddCard";

const KanbanBoard = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [unassignedItems, setUnassignedItems] = useState([]);

  // Fetch tasks from Firebase and organize them by status
  useEffect(() => {
    const tasksQuery = collection(db, "tasks");

    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const allTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTodoItems(allTasks.filter((task) => task.status === "todo"));
        setInProgressItems(
          allTasks.filter((task) => task.status === "in-progress")
        );
        setDoneItems(allTasks.filter((task) => task.status === "done"));
        setUnassignedItems(
          allTasks.filter(
            (task) => task.status === "unassigned" || !task.status
          )
        );
      },
      (error) => {
        console.error("Error listening to tasks collection:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add a new task to Firebase
  const addNewCard = async (title) => {
    await addDoc(collection(db, "tasks"), {
      title,
      status: "unassigned",
      createdAt: new Date(),
    });
  };

  // Handle drag and drop between lanes
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const taskId = active.id;
      const newStatus = over.id;
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { status: newStatus });
    }
  };

  // Assign a user to a task
  const assignUserToTask = async (taskId, user) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { assignedTo: user });
  };

  return (
    <Box bg="gray.50" minHeight="100vh" p={6}>
      <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
        <Flex flexDirection="column" mx="auto">
          <AddCard addCard={addNewCard} />
          <Flex
            gap={6}
            p={1}
            flexWrap={{ base: "wrap", lg: "nowrap" }}
            justifyContent="space-between"
          >
            <KanbanLane
              title="To Do"
              laneId="todo"
              tasks={todoItems}
              bgColor="blue.50"
              borderColor="blue.200"
              onAssignUser={assignUserToTask}
            />
            <KanbanLane
              title="In Progress"
              laneId="in-progress"
              tasks={inProgressItems}
              bgColor="yellow.50"
              borderColor="yellow.200"
              onAssignUser={assignUserToTask}
            />
            <KanbanLane
              title="Done"
              laneId="done"
              tasks={doneItems}
              bgColor="green.50"
              borderColor="green.200"
              onAssignUser={assignUserToTask}
            />
            <KanbanLane
              title="Unassigned"
              laneId="unassigned"
              tasks={unassignedItems}
              bgColor="gray.50"
              borderColor="gray.200"
              onAssignUser={assignUserToTask}
            />
          </Flex>
        </Flex>
      </DndContext>
    </Box>
  );
};

export default KanbanBoard;
