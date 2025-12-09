// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_actions)/artifact-fs-inspector-actions.ts

"use server";

import {
  readArtifactFsInspectorFileByPath,
  readArtifactFsInspectorFractalTreeByPath,
  type ArtifactFsInspectorFractalTree,
} from "../(_fsqueries)/artifact-fs-inspector-fs-queries";

export type ArtifactFsInspectorReadFileResult =
  | {
      ok: true;
      pathFromApp: string;
      content: string;
    }
  | {
      ok: false;
      error: string;
    };

export type ArtifactFsInspectorReadFractalTreeResult =
  | {
      ok: true;
      tree: ArtifactFsInspectorFractalTree;
    }
  | {
      ok: false;
      error: string;
    };

export async function artifactFsInspectorReadFileAction(
  artifactFsInspectorPathInput: string,
): Promise<ArtifactFsInspectorReadFileResult> {
  console.log(
    "[FS_INSPECTOR][action] readFile called with:",
    artifactFsInspectorPathInput,
  );

  try {
    const { pathFromApp, content } =
      await readArtifactFsInspectorFileByPath(
        artifactFsInspectorPathInput,
      );

    return { ok: true, pathFromApp, content };
  } catch (error) {
    console.error("[FS_INSPECTOR][action] readFile error:", error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error while reading file",
    };
  }
}

export async function artifactFsInspectorReadFractalTreeAction(
  artifactFsInspectorPathInput: string,
): Promise<ArtifactFsInspectorReadFractalTreeResult> {
  console.log(
    "[FS_INSPECTOR][action] readFractalTree called with:",
    artifactFsInspectorPathInput,
  );

  try {
    const tree = await readArtifactFsInspectorFractalTreeByPath(
      artifactFsInspectorPathInput,
    );

    return { ok: true, tree };
  } catch (error) {
    console.error(
      "[FS_INSPECTOR][action] readFractalTree error:",
      error,
    );
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error while reading fractal tree",
    };
  }
}
