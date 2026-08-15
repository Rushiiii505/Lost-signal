import level1Data from './levels/level1.json';
import level2Data from './levels/level2.json';
import level3Data from './levels/level3.json';
import { LevelData } from '../types/game';

const levelsMap: Record<number, LevelData> = {
  1: level1Data as unknown as LevelData,
  2: level2Data as unknown as LevelData,
  3: level3Data as unknown as LevelData,
};

export function getLevelData(levelNumber: number): LevelData {
  return levelsMap[levelNumber] || (level1Data as unknown as LevelData);
}

export function getAllLevels(): LevelData[] {
  return Object.values(levelsMap);
}

export function getTotalLevels(): number {
  return Object.keys(levelsMap).length;
}
