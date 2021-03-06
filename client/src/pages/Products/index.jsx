import { Grid, Box, Flex, Button } from "@chakra-ui/react";
import Card from "../../components/Card";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api";
import React from "react";
import { useContext } from "react";
import FilterContext from "../../context/FilteredContext";
function Products(props) {
  const { result, filtered } = useContext(FilterContext);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 8;
      if (!morePagesExist) {
        return;
      }
      return allGroups.length + 1;
    },
  });

  if (status === "loading") return "Loading...";
  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <div>
      <Grid templateColumns="repeat(4, 1fr)" gap={1}>
        {result === "" &&
          data.pages.map((group, index) => (
            <React.Fragment key={index}>
              {group.map((product, index) => (
                <Box w="100%" key={index}>
                  <Card product={product} />
                </Box>
              ))}
            </React.Fragment>
          ))}
        {/* filtre varsa çalışacak */}
        {result !== "" &&
          data.length !== 0 &&
          filtered &&
          filtered.map((product, index) => (
            <Box w="100%" key={index}>
              <Card product={product} />
            </Box>
          ))}
      </Grid>
      <Flex mt="10" justifyContent="center" p={10}>
        <Button
          isLoading={isFetchingNextPage}
          colorScheme="teal"
          variant="ghost"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
}

export default Products;
