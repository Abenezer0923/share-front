import React, { useEffect, useRef } from "react";
import {
  ChakraProvider,
  Box,
  extendTheme,
  CSSReset,
  Button,
} from "@chakra-ui/react";
import ordinary from "assets/img/Ordinary-cer.JPG";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
});

const CertificatePage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const drawCert = (da, dates) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.src = ordinary;

      img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = "16px sans-serif";
        ctx.fillStyle = "#000";
       
        ctx.fillText("Abenezer Getachew", 350, 405) 
        ctx.fillText("12345567890", 1070, 240)
        ctx.fillText("12", 1090, 295)
        ctx.fillText("12,000 birr", 270, 430)
        ctx.fillText("አስራ ሁለት ሚሊዮን ብር ብቻ", 440, 430)
        ctx.fillText("0023", 360, 455)
        ctx.fillText("0033", 150, 455)
        ctx.fillText("77", 600, 455)
        ctx.fillText("SHARHOLDER", 410, 485)
        ctx.fillText("11", 1090, 485)
        ctx.fillText("500,00", 590, 513)
        ctx.fillText("አስራ ሁለት ሚሊዮን ብር ብቻ", 750, 513)
        ctx.fillText("dr Aman", 210, 534) 
        ctx.fillText("Abenezer Getachew", 390, 534) 
        ctx.fillText("05", 720, 563) 
        ctx.fillText("08", 810, 563) 
        ctx.fillText("2023", 900, 563)
        ctx.fillText("22", 720, 590)
        ctx.fillText("03", 895, 590)
        ctx.fillText("16", 990, 590)
        
        // Adding watermark
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; 
        ctx.fillText("Your Watermark Here", 10, canvas.height - 10);

      };
    };

    // Replace these with the actual data you want to use
    const sampleData = {
      fullNameAmharic: {
        amharicFirstName: "John",
        amharicMiddleName: "",
        amharicLastName: "Doe",
      },
      certficateNumber: "123456",
      // ... other properties ...
    };

    const sampleDates = {
      day: "01",
      month: "Jan",
      year: "2023",
      // ... other date properties ...
    };

    drawCert(sampleData, sampleDates);
  }, []);

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL(); // Get the data URL of the canvas content
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "certificate.png"; // Set the desired file name and extension
    link.click();
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        h="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Button mt="4" colorScheme="teal" onClick={downloadCanvas} backgroundColor='#d7a022'>
          Download Certificate
        </Button>
        <canvas ref={canvasRef} width={1400} height={850} />
      </Box>
      <CSSReset />
    </ChakraProvider>
  );
};

export default CertificatePage;
