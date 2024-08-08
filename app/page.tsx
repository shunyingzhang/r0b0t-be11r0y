import { Image } from "@chakra-ui/react";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Image
      alt={"product image"}
      src="/backgroundImg.jpg"
      fit="cover"
      align="center"
      w="100%"
      h={{ base: "100%", sm: "400px", lg: "600px" }}
    />
    // </main>
  );
}
