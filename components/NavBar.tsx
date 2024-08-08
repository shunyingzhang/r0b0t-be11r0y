"use client";
import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Image,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function NavBar() {
  const { isOpen: isOpenMD, onToggle: onToggleMD } = useDisclosure();
  const bgColor = "var(--nav-background-color)";

  return (
    <Box>
      <Flex bg={bgColor} minH={"60px"} p={{ base: 4 }} align={"center"}>
        <Flex
          flex={{ base: 1, md: "auto" }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggleMD}
            icon={
              isOpenMD ? (
                <CloseIcon w={3} h={3} />
              ) : (
                <HamburgerIcon w={5} h={5} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <ChakraLink href="/">
            <Image
              rounded={"md"}
              alt={"Logo"}
              src="/logo.png"
              objectFit="cover"
              h={"60px"}
            />
          </ChakraLink>
        </Flex>

        <Flex
          flex={{ base: 1, md: 6 }}
          justify={{ base: "center", md: "left" }}
          display={{ base: "none", md: "flex" }}
          ml={10}
          mr={5}
        >
          <DesktopNav />
        </Flex>

        <Stack
          flex={{ base: 1 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {/* <CustomButton onClick={} fontSize="sm">
          </CustomButton> */}
        </Stack>
      </Flex>
      <Collapse in={isOpenMD} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkHoverColor = "var(--brand-color-rgb)";
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                p={2}
                width="100vw"
                maxWidth="100vw"
                top={4}
                left={0}
                right={0}
              >
                <Stack paddingLeft={`calc(12.5% + var(--chakra-space-10))`}>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text fontWeight={500}>{label}</Text>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "var(--brand-color-rgb)" }}
            fontSize={"sm"}
          >
            {subLabel}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  const bgColor = "var(--nav-background-color)";
  return (
    <Stack bg={bgColor} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={2} onClick={children && onToggle}>
      <Box
        pt={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600}>{label}</Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={4}
            h={4}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack pl={4} align={"start"}>
          {children &&
            children.map((child) => (
              <Box
                as="a"
                key={child.label}
                href={child.href}
                _hover={{
                  color: "var(--brand-color-rgb)",
                }}
              >
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Featured",
    children: [
      {
        label: "Robot",
        subLabel: "Robot to inspire you",
        href: "/robot",
      },
    ],
  },
  {
    label: "Bags",
    children: [
      {
        label: "Still Robot",
        subLabel: "Find your dream robot",
        href: "/robot",
      },
    ],
  },
  {
    label: "Wallets",
    children: [
      {
        label: "Robot again",
        subLabel: "Find your dream robot",
        href: "/robot",
      },
    ],
  },
  {
    label: "Accessories",
    href: "#",
  },
  {
    label: "Tech",
    href: "#",
  },
  {
    label: "Travel",
    href: "#",
  },
  {
    label: "About Us",
    href: "#",
  },
];
