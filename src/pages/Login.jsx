import { Button, VStack, Heading, Input, Box, Text, Tabs } from "@chakra-ui/react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const { user, loginWithGoogle, loginWithEmailPassword, signUpWithEmailPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleEmailLogin = () => {
    loginWithEmailPassword(email, password);
  };

  const handleEmailSignUp = () => {
    signUpWithEmailPassword(email, password);
  };

  return (
    <VStack spacing={6} p={6} bg="white" boxShadow="lg" borderRadius="md" w="full" maxW="md" mx="auto" mt={12}>
      <Heading color="blue.700">Login / Sign Up</Heading>
      <Button onClick={loginWithGoogle} colorScheme="blue" variant="solid" w="full">
        Login with Google
      </Button>
      <Tabs.Root defaultValue="login" isFitted variant="enclosed" w="full">
        <Tabs.List mb="1em">
          <Tabs.Trigger value="login">Login</Tabs.Trigger>
          <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="login">
          <Box w="full">
            <Text mb="8px" color="blue.700">Email address</Text>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" color="blue.800" />
          </Box>
          <Box w="full" mt={4}>
            <Text mb="8px" color="blue.700">Password</Text>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" color="blue.800" />
          </Box>
          <Button onClick={handleEmailLogin} colorScheme="blue" w="full" mt={4}>
            Login with Email
          </Button>
        </Tabs.Content>
        <Tabs.Content value="signup">
          <Box w="full">
            <Text mb="8px" color="blue.700">Email address</Text>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" color="blue.800" />
          </Box>
          <Box w="full" mt={4}>
            <Text mb="8px" color="blue.700">Password</Text>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" color="blue.800" />
          </Box>
          <Button onClick={handleEmailSignUp} colorScheme="blue" w="full" mt={4}>
            Sign Up with Email
          </Button>
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
};

export default Login;
