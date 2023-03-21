import React, { useCallback, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Repository, User } from "../util/types";
import RepoItem from "./RepoItem";

const UserItem: React.FC<{ user: User }> = ({ user }) => {
  const [prevUser, setPrevUser] = useState<User>();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchRepo = (username: string) => {
    if (!username.length) return;
    setLoading(true);
    const url = `https://api.github.com/users/${username}/repos`;
    axios
      .get(url)
      .then((res) => {
        if (res.data) {
          setRepos(res.data);
        }
      })
      .catch((err) => {
        console.log(`Error while fetching Repo->`, err);
      })
      .finally(() => setLoading(false));
  };

  const handleOpen = useCallback(() => {
    setIsOpen(!isOpen);
    setPrevUser(user);

    if (prevUser?.id !== user?.id) {
      fetchRepo(user?.name || user?.login);
    }
  }, [isOpen, setIsOpen, setPrevUser, prevUser, user]);

  return (
    <Container mt={2}>
      <Button width="full" justifyContent="space-between" onClick={handleOpen}>
        <HStack>
          <Avatar src={user?.avatar_url} size="xs" />
          <Text mr="2">{user?.name || user?.login}</Text>
        </HStack>
        {isOpen ? (
          <ChevronUpIcon w={6} h={6} />
        ) : (
          <ChevronDownIcon w={6} h={6} />
        )}
      </Button>
      {isOpen && (
        <>
          {loading && (
            <Box
              alignItems="center"
              justifyContent="center"
              display="flex"
              p={2}
            >
              <Spinner />
            </Box>
          )}
          {!loading && repos?.length === 0 && (
            <HStack alignItems="center" justifyContent="center" p="2">
              <Text>No repository found</Text>
            </HStack>
          )}
          {!loading && repos?.length > 0 && (
            <Box marginLeft="3">
              {repos.map((item) => (
                <RepoItem key={item.id} repo={item} />
              ))}
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default UserItem;
