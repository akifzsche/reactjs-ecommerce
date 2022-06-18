import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import { Box, Button, Text } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
function ProductDetail() {
  const { product_id } = useParams();

  const { isLoading, error, data } = useQuery(["product", { product_id }], () =>
    fetchProduct(product_id)
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const images = data.photos.map((photo) => ({
    original: photo,
    thumbnail: photo,
  }));
  return (
    <div>
      <Button colorScheme="teal">add to basket</Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>

      <p>{data.description}</p>
      <Box margin="10">
        <ImageGallery items={images} />
      </Box>
    </div>
  );
}

export default ProductDetail;
