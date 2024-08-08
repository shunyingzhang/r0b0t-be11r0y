"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import { Box } from "@chakra-ui/react";

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
            width="50px"
            height="50px"
            border="1.5px solid"
            borderColor="var(--brand-color-rgb)"
            borderRadius="5px"
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
      <Box alignContent={"center"}>
        <Box
          display={"grid"}
          gridTemplateColumns={`repeat(${gridSize}, 50px)`}
          gridTemplateRows={`repeat(${gridSize}, 50px)`}
          gap={2}
          mb={2}
        >
          {createGrid()}
        </Box>
        <Box display={"flex"} gap={2}>
          <button onClick={rotateLeft}>Rotate Left</button>
          <button onClick={rotateRight}>Rotate Right</button>
          <button onClick={moveForward}>Move Forward</button>
        </Box>
      </Box>
    </Box>
  );
}
