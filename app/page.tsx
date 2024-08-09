'use client';
import { Box, Image } from "@chakra-ui/react";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(`/robot`);
  };

  return (
    <Box
      position="relative"
      w="100%"
      h={{ base: "100%", sm: "400px", lg: "600px" }}
    >
      <Image
        alt="product image"
        src="/backgroundImg.jpg"
        objectFit="cover"
        w="100%"
        h="100%"
      />
      <CustomButton
        position="absolute"
        bottom="5%"
        left="50%"
        transform="translate(-50%, -50%)"
        size="lg"
        fontSize="2xl"
        onClick={handleButtonClick}
      >
        Get Started the Robot
      </CustomButton>
    </Box>
  );
}
