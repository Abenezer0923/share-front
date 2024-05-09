import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text
} from "@chakra-ui/react";
import { FaYoutube } from "react-icons/fa";

export default function NFT(props) {
  const { video, width, height } = props; // Define width and height props
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIconRotated, setIsIconRotated] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleRotation = () => {
    setIsIconRotated(!isIconRotated);
  };

  return (
    <>
      <Box
        style={{ cursor: "pointer" }}
        borderRadius="20px"
        overflow="hidden"
        boxShadow="xl"
        transition="all 0.3s ease-in-out"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "xl",
        }}
        p="20px"
        height="300px"
        textAlign="center"
        fontSize="24px"
        fontWeight="bold"
        color="#ffff"
        position="relative" // Add position relative to allow absolute positioning of the icon
      >
        <div
          onClick={openModal}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <iframe
            width={width || "100%"}
            height={height || "100%"}
            src={video}
            style={{
              pointerEvents: "none", // Disable pointer events for iframe
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <FaYoutube
            size="3em"
            color="#d7a022"
            mb="1em"
            onClick={toggleRotation}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "1",
            }}
            transition="transform 0.3s ease-in-out"
            _hover={{ cursor: "pointer" }}
          />
        </div>
      </Box>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Latest video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              width="100%"
              height="400"
              src={video}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
