import React, { ReactNode } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
interface CustomButtonProps extends ButtonProps {
  mr?: number;
  ml?: number;
  mb?: number;
  mt?: number;
  w?: string;
  bg?: string;
  size?: string;
  colorScheme?: string;
  fontSize?: string;
  fontWeight?: number;
  disabled?: boolean;
  // display?: string;
  children: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  children,
  mr = 0,
  ml = 0,
  mb = 0,
  mt = 0,
  w = "",
  size="md",
  fontSize = "md",
  fontWeight = 600,
  disabled = false,
  bg = "var(--brand-color-rgb)",
  ...rest
}) => {
  return (
    <Button
      size={size}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={"white"}
      bg={bg}
      _hover={!disabled ? { bg: "var(--brand-hover-color-rgb)" } : undefined}
      onClick={!disabled ? onClick : undefined}
      mr={mr}
      ml={ml}
      mb={mb}
      mt={mt}
      w={w}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
