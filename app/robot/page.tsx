"use client";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import CustomButton from "@/components/CustomButton";

const gridSize = 5;

type Direction = "NORTH" | "EAST" | "SOUTH" | "WEST";

interface RobotState {
  x: number;
  y: number;
  direction: Direction;
}

const directionSymbols: { [key in Direction]: string } = {
  NORTH: "↑",
  EAST: "→",
  SOUTH: "↓",
  WEST: "←",
};

const directions: Direction[] = ["NORTH", "EAST", "SOUTH", "WEST"];

export default function Robot() {
  const [robot, setRobot] = useState<RobotState>({
    x: 0,
    y: 0,
    direction: "NORTH",
  });

  const createGrid = () => {
    const grid = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        grid.push(
          <Box
            key={`cell-${row}-${col}`}
            width={{ sm: "50px", md: "80px", lg: "100px" }}
            height={{ sm: "50px", md: "80px", lg: "100px" }}
            border="1.5px solid"
            borderColor="var(--brand-color-rgb)"
            borderRadius={{ sm: "5px", md: "8px", lg: "10px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={
              robot.x === row && robot.y === col
                ? "var(--brand-color-rgb)"
                : "transparent"
            }
            color={robot.x === row && robot.y === col ? "white" : "inherit"}
          >
            {robot.x === row && robot.y === col
              ? directionSymbols[robot.direction]
              : ""}
          </Box>
        );
      }
    }
    return grid;
  };

  const rotateLeft = () => {
    const currentIndex = directions.indexOf(robot.direction);
    const newDirection = directions[(currentIndex + 3) % 4];
    setRobot({ ...robot, direction: newDirection });
  };

  const rotateRight = () => {
    const currentIndex = directions.indexOf(robot.direction);
    const newDirection = directions[(currentIndex + 1) % 4];
    setRobot({ ...robot, direction: newDirection });
  };

  const moveForward = () => {
    const { x, y, direction } = robot;
    let newX = x,
      newY = y;
    switch (direction) {
      case "NORTH":
        if (x > 0) newX -= 1;
        break;
      case "EAST":
        if (y < gridSize - 1) newY += 1;
        break;
      case "SOUTH":
        if (x < gridSize - 1) newX += 1;
        break;
      case "WEST":
        if (y > 0) newY -= 1;
        break;
    }
    setRobot({ x: newX, y: newY, direction });
  };

  return (
    <Box height={"60vh"} display={"flex"} justifyContent={"center"}>
      <Box alignContent={"center"} mt={10}>
        <Box
          display={"grid"}
          justifyContent={"center"}
          gridTemplateColumns={{
            sm: `repeat(${gridSize}, 50px)`,
            md: `repeat(${gridSize}, 80px)`,
            lg: `repeat(${gridSize}, 100px)`,
          }}
          gridTemplateRows={{
            sm: `repeat(${gridSize}, 50px)`,
            md: `repeat(${gridSize}, 80px)`,
            lg: `repeat(${gridSize}, 100px)`,
          }}
          gap={2}
          mb={6}
        >
          {createGrid()}
        </Box>
        <Box
          display={"flex"}
          flexDirection={{ sm: "column", md: "column", lg: "row" }}
          justifyContent={"center"}
          gap={2}
        >
          <CustomButton size="lg" onClick={rotateLeft}>
            Rotate Left
          </CustomButton>
          <CustomButton size="lg" onClick={rotateRight}>
            Rotate Right
          </CustomButton>
          <CustomButton size="lg" onClick={moveForward}>
            Move Forward
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
}
