// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/artifact-fs-inspector-fs-queries.ts

// ========== ИМПОРТЫ ==========
import { normalizePath } from "./(_path-utils)/normalize-path";
import { resolveAbsolutePath } from "./(_path-utils)/resolve-absolute-path";
import { validatePathInsideApp } from "./(_path-utils)/validate-path-inside-app";
import { findFractalRoot, type FractalInfo } from "./(_fractal-detection)/find-fractal-root";
import { buildRouteFractalTree, type ArtifactFsInspectorFractalTree } from "./(_tree-builders)/build-route-fractal-tree";
import { buildFileNode, type FileNode } from "./(_fractal-readers)/build-file-node";
import { buildFolderNode, type FolderNode } from "./(_fractal-readers)/build-folder-node";

// ========== ЭКСПОРТЫ ТИПОВ ==========
export type { FileNode as ArtifactFsInspectorFileNode };
export type { FolderNode as ArtifactFsInspectorFolderNode };
export type { ArtifactFsInspectorFractalTree };

export type ArtifactFsInspectorTreeNode = FileNode | FolderNode;

// ========== КОНСТАНТЫ ==========
const artifactFsInspectorProjectRoot = process.cwd();

// ========== ЧТЕНИЕ ОДНОГО ФАЙЛА ==========

/**
 * Читает один файл по пути
 */
export async function readArtifactFsInspectorFileByPath(  // 🔥 ДОБАВЛЕН export!
  artifactFsInspectorPathInput: string,
): Promise<{ pathFromApp: string; content: string }> {
  console.log("[FS_INSPECTOR][readFileByPath] 🔧 Input:", artifactFsInspectorPathInput);

  try {
    const normalized = normalizePath(artifactFsInspectorPathInput);
    const absolutePath = resolveAbsolutePath(normalized);
    validatePathInsideApp(absolutePath);

    console.log("[FS_INSPECTOR][readFileByPath] 📄 Reading file:", absolutePath);

    const fileNode = await buildFileNode(absolutePath, artifactFsInspectorProjectRoot);

    if (!fileNode) {
      throw new Error(`Cannot read file: ${absolutePath}`);
    }

    console.log("[FS_INSPECTOR][readFileByPath] ✅ File read successfully");

    return {
      pathFromApp: fileNode.pathFromApp,
      content: fileNode.content,
    };
  } catch (error) {
    console.error("[FS_INSPECTOR][readFileByPath] ❌ Error:", error);
    throw error;
  }
}

// ========== ЧТЕНИЕ ДЕРЕВА ФРАКТАЛА ==========

/**
 * Читает полное дерево фрактала
 */
export async function readArtifactFsInspectorFractalTreeByPath(
  artifactFsInspectorPathInput: string,
): Promise<ArtifactFsInspectorFractalTree> {
  console.log("[FS_INSPECTOR][readFractalTree] 🔧 Input:", artifactFsInspectorPathInput);

  try {
    const normalized = normalizePath(artifactFsInspectorPathInput);
    console.log("[FS_INSPECTOR][readFractalTree] ✅ Normalized:", normalized);

    const absolutePath = resolveAbsolutePath(normalized);
    console.log("[FS_INSPECTOR][readFractalTree] ✅ Absolute path:", absolutePath);

    validatePathInsideApp(absolutePath);
    console.log("[FS_INSPECTOR][readFractalTree] ✅ Path validated");

    const fractalInfo: FractalInfo = findFractalRoot(absolutePath);
    console.log("[FS_INSPECTOR][readFractalTree] ✅ Fractal root found:", fractalInfo.root);
    console.log("[FS_INSPECTOR][readFractalTree]   Type:", fractalInfo.type);

    console.log("[FS_INSPECTOR][readFractalTree] 🏗️ Building Fractal tree...");
    const tree = await buildRouteFractalTree(fractalInfo.root, artifactFsInspectorProjectRoot);

    console.log("[FS_INSPECTOR][readFractalTree] ✅ Tree built successfully");
    console.log("[FS_INSPECTOR][readFractalTree]   Root:", tree.fractalRootPathFromApp);
    console.log("[FS_INSPECTOR][readFractalTree]   Type:", tree.fractalType);
    console.log("[FS_INSPECTOR][readFractalTree]   Subfractals:", tree.subfractals.length);

    return tree;

  } catch (error) {
    console.error("[FS_INSPECTOR][readFractalTree] ❌ Error:", error);
    throw error;
  }
}
