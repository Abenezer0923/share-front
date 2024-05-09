import React from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom component
import NFT from "components/card/NFT";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex flexDirection="column">
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                What's NEW
              </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="12px">
              <NFT
                video="https://www.youtube.com/embed?listType=playlist&list=UUcEpdxagm3zSTeJ5ZorR5MA"
                name="Abstract Colors"
                author="By Esthera Jackson"
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                currentbid="0.91 ETH"
                download="#"
              />

              <NFT
                video="https://www.youtube.com/embed?listType=playlist&list=UUcEpdxagm3zSTeJ5ZorR5MA&index=2"
                name="ETH AI Brain"
                author="By Nick Wilson"
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft2}
                currentbid="0.91 ETH"
                download="#"
              />
              <NFT
                video="https://www.youtube.com/embed?listType=playlist&list=UUcEpdxagm3zSTeJ5ZorR5MA&index=3"
                name="Mesh Gradients "
                author="By Will Smith"
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft3}
                currentbid="0.91 ETH"
                download="#"
              />
            </SimpleGrid>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap="20px"
              mb={{ base: "20px", xl: "0px" }}
            >
              <NFT
                video="https://www.youtube.com/embed?listType=playlist&list=UUcEpdxagm3zSTeJ5ZorR5MA&index=4"
                name="Swipe Circles"
                author="By Peter Will"
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft4}
                currentbid="0.91 ETH"
                download="#"
              />
              <NFT
                video="https://www.youtube.com/embed?listType=playlist&list=UUcEpdxagm3zSTeJ5ZorR5MA&index=5"
                name="Colorful Heaven"
                author="By Mark Benjamin"
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft5}
                currentbid="0.91 ETH"
                download="#"
              />
              <NFT
                video="https://www.youtube.com/embed?listType=playlist&list=UUcEpdxagm3zSTeJ5ZorR5MA&index=6"
                name="3D Cubes Art"
                author="By Manny Gates"
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={Nft6}
                currentbid="0.91 ETH"
                download="#"
              />
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
