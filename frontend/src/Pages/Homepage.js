import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
          d="flex"
        justifyContent={"center"}
        p={3}
        w="100%"
        m={"40px 0 15px 0"}
        borderWidth={"1px"}
        borderRadius={"lg"}
        bg={"rgba( 255, 255, 255, 0.1 )"}
        boxShadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
        backdropFilter="blur( 4px )"
        border="1px solid rgba( 255, 255, 255, 0.18 )"
      >
        <Text fontSize="4xl"
          fontFamily={"Neucha"}
          color="#efefef"
          textAlign={"center"} fontWeight={"extrabold"}>
          CHATIFY
        </Text>
      </Box>
      <Box   borderRadius={"lg"}
        bg={"rgba( 255, 255, 255, 0.1 )"}
        boxShadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
        backdropFilter="blur( 4px )"
        border="1px solid rgba( 255, 255, 255, 0.18 )"
        w="100%"
        p={4}
        borderWidth="1px">
        <Tabs isFitted variant="soft-rounded" colorScheme="green" fontFamily={"Neucha"}>
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
