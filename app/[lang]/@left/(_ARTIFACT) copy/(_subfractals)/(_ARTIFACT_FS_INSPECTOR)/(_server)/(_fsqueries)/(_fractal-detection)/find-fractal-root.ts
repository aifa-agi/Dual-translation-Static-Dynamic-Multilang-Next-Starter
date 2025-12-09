// (_fractal-detection)/find-fractal-root.ts

import * as fs from "fs";
import * as path from "path";
import { isFractalRoot } from "./is-fractal-root";

export type FractalInfo = {
  root: string;
  type: "fractal-root";
};

/**
 * Находит корень фрактала, начиная с указанного пути
 * 
 * Логика: идём ВВЕРХ по дереву, пока не найдём директорию с:
 * - SPEC.md
 * - Хотя бы одним слоем: (_client), (_server), (_shared)
 */
export function findFractalRoot(startPath: string): FractalInfo {
  console.log("[findFractalRoot] 🔍 Starting search from:", startPath);

  let current = startPath;

  while (true) {
    console.log("[findFractalRoot]   Checking:", current);

    // Проверяем текущую директорию
    if (isFractalRoot(current)) {
      console.log("[findFractalRoot] ✅ Found Fractal Root at:", current);
      return { root: current, type: "fractal-root" };
    }

    // Идём вверх
    const parent = path.dirname(current);

    // Проверяем что не вышли за пределы app/
    const normalizedParent = parent.replace(/\\/g, "/");
    if (parent === current || (!normalizedParent.includes("/app/") && !normalizedParent.endsWith("/app"))) {
      const error = 
        `[findFractalRoot] ❌ Fractal root not found\n` +
        `Started from: ${startPath}\n` +
        `Expected: Directory with SPEC.md + at least one layer ((_client), (_server), or (_shared))`;
      
      console.error(error);
      throw new Error(error);
    }

    current = parent;
  }
}
