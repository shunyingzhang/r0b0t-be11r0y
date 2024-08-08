'use client'
import { useState } from 'react';
import styles from '../styles/Robot.module.css';

const gridSize = 5;

type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

interface RobotState {
  x: number;
  y: number;
  direction: Direction;
}

const directionSymbols: { [key in Direction]: string } = {
  NORTH: '↑',
  EAST: '→',
  SOUTH: '↓',
  WEST: '←',
};

const directions: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

export default function Robot() {
  const [robot, setRobot] = useState<RobotState>({ x: 0, y: 0, direction: 'NORTH' });

  const createGrid = () => {
    const grid = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        grid.push(
          <div
            key={`cell-${row}-${col}`}
            className={`${styles.cell} ${robot.x === row && robot.y === col ? styles.robot : ''}`}
          >
            {robot.x === row && robot.y === col ? directionSymbols[robot.direction] : ''}
          </div>
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
    let newX = x, newY = y;
    switch (direction) {
      case 'NORTH':
        if (x > 0) newX -= 1;
        break;
      case 'EAST':
        if (y < gridSize - 1) newY += 1;
        break;
      case 'SOUTH':
        if (x < gridSize - 1) newX += 1;
        break;
      case 'WEST':
        if (y > 0) newY -= 1;
        break;
    }
    setRobot({ x: newX, y: newY, direction });
  };

  return (
    <div>
      <div className={styles.grid}>{createGrid()}</div>
      <div className={styles.controls}>
        <button onClick={rotateLeft}>Rotate Left</button>
        <button onClick={rotateRight}>Rotate Right</button>
        <button onClick={moveForward}>Move Forward</button>
      </div>
    </div>
  );
}