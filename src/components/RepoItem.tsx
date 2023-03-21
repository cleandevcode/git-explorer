import React, { useCallback } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Repository } from "../util/types";

const RepoItem: React.FC<{ repo: Repository }> = ({ repo }) => {
  const handleOpenUrl = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  return (
    <Box
      padding="3"
      mt={2}
      mb={2}
      backgroundColor="lightgray"
      borderRadius={8}
      onClick={() => handleOpenUrl(repo.html_url)}
      cursor="pointer"
      _hover={{ backgroundColor: "gray" }}
    >
      <HStack justifyContent="space-between">
        <Text fontSize="16px" as="b">
          {repo.name}
        </Text>
        <HStack>
          <Text marginRight="1" as="b">
            {repo.stargazers_count}
          </Text>
          <StarIcon />
        </HStack>
      </HStack>
      <Text fontSize="12px" marginTop="1">
        {repo.description}
      </Text>
    </Box>
  );
};

export default RepoItem;
