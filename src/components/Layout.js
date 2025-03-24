import { Box, Flex, Spacer, Button, Text } from "@chakra-ui/react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

return (
    <Box>
        <Flex as="header" bg="blue.600" p={4} color="white" align="center" boxShadow="md">
            <Text fontSize="2xl" fontWeight="bold">Kanban App</Text>
            <Spacer />
            {user && (
                <Flex align="center">
                    <Text mr={4} fontSize="lg">{user.displayName || user.email}</Text>
                    <Button onClick={handleLogout} colorScheme="red" variant="solid">
                        Logout
                    </Button>
                </Flex>
            )}
        </Flex>
        <Box as="main" p={6} bg="gray.50" minH="calc(100vh - 64px)" boxShadow="inner">
            {children}
        </Box>
    </Box>
);
};

export default Layout;
