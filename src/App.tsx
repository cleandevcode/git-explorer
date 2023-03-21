import React, { useCallback, useState } from "react";
import {
  Container,
  Box,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { CloseIcon } from "@chakra-ui/icons";
import { User } from "./util/types";
import UserItem from "./components/UserItem";

function App() {
  const toast = useToast();

  const [username, setUserName] = useState(``);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = (keyword: string) => {
    setUsers([]);
    setLoading(true);
    const apiUrl = `https://api.github.com/search/users?q=${keyword}`;
    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.items?.length > 5) {
          const temp = res.data.items.slice(0, 5);
          setUsers(temp);
        } else setUsers(res.data.items);
        if (!res.data.items.length)
          toast({
            title: `No matched results`,
            status: "warning",
            position: "top-right",
          });
      })
      .catch((err) => {
        console.log(`Error occured while getting Users`, err);
        toast({
          title:
            err?.response?.data?.message ||
            `Error occured while fetching users`,
          status: "error",
          position: "top-right",
        });
      })
      .finally(() => setLoading(false));
  };

  const handleClick = useCallback(() => {
    if (!username.length) return;
    fetchUsers(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <Container maxW="xl">
      <Box
        padding="4"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <InputGroup>
          <Input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick();
              }
            }}
          />
          {username.length && (
            <InputRightElement>
              <CloseIcon
                onClick={() => {
                  setUserName("");
                  setUsers([]);
                }}
                w={2}
                cursor="pointer"
              />
            </InputRightElement>
          )}
        </InputGroup>
        <Button
          colorScheme="teal"
          variant="solid"
          width="full"
          marginTop="4"
          isLoading={loading}
          disabled={!username.length}
          onClick={handleClick}
        >
          Search
        </Button>
      </Box>
      {users.length > 0 &&
        users.map((user) => <UserItem key={user.id} user={user} />)}
    </Container>
  );
}

export default App;
