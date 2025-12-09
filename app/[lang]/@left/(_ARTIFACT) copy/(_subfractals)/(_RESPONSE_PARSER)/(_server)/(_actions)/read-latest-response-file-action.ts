// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_server)/(_actions)/read-latest-response-file-action.ts

"use server";

import { readdir, readFile, stat } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

type ReadLatestFileResult = {
  success: boolean;
  content?: string;
  fileName?: string;
  fileSize?: number;
  modifiedAt?: string;
  error?: string;
};

const ALLOWED_EXTENSIONS = [".md", ".txt"];
const RESPONSE_FOLDER = "public/response-for-parsing";

/**
 * Server Action: Read the latest file from public/response-for-parsing/
 * 
 * Steps:
 * 1. Check if folder exists
 * 2. Read all files from folder
 * 3. Filter by allowed extensions (.md, .txt)
 * 4. Sort by modification date (newest first)
 * 5. Return content of the latest file
 */
export async function readLatestResponseFileAction(): Promise<ReadLatestFileResult> {
  console.log("\n📂 ===== READ LATEST FILE ACTION START =====");

  try {
    const projectRoot = process.cwd();
    const folderPath = join(projectRoot, RESPONSE_FOLDER);

    console.log(`📁 Folder path: ${folderPath}`);

    // Check if folder exists
    if (!existsSync(folderPath)) {
      const error = `Folder not found: ${RESPONSE_FOLDER}`;
      console.log(`❌ ${error}`);
      return {
        success: false,
        error,
      };
    }

    // Read all files in folder
    const allFiles = await readdir(folderPath);
    console.log(`📊 Total files in folder: ${allFiles.length}`);

    if (allFiles.length === 0) {
      const error = "No files found in response-for-parsing folder";
      console.log(`❌ ${error}`);
      return {
        success: false,
        error,
      };
    }

    // Filter by allowed extensions and get file stats
    const filesWithStats = [];

    for (const fileName of allFiles) {
      // Skip hidden files and system files
      if (fileName.startsWith(".")) {
        console.log(`⏭️ Skipping hidden file: ${fileName}`);
        continue;
      }

      // Check extension
      const hasAllowedExtension = ALLOWED_EXTENSIONS.some((ext) =>
        fileName.toLowerCase().endsWith(ext)
      );

      if (!hasAllowedExtension) {
        console.log(`⏭️ Skipping file with disallowed extension: ${fileName}`);
        continue;
      }

      const filePath = join(folderPath, fileName);
      const fileStat = await stat(filePath);

      filesWithStats.push({
        name: fileName,
        path: filePath,
        size: fileStat.size,
        modifiedAt: fileStat.mtime,
      });
    }

    console.log(`✅ Valid files found: ${filesWithStats.length}`);

    if (filesWithStats.length === 0) {
      const error = `No valid files (.md, .txt) found in ${RESPONSE_FOLDER}`;
      console.log(`❌ ${error}`);
      return {
        success: false,
        error,
      };
    }

    // Sort by modification date (newest first)
    filesWithStats.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());

    const latestFile = filesWithStats[0];
    console.log(`\n🎯 Latest file selected:`);
    console.log(`   Name: ${latestFile.name}`);
    console.log(`   Size: ${latestFile.size} bytes`);
    console.log(`   Modified: ${latestFile.modifiedAt.toISOString()}`);

    // Read file content
    const content = await readFile(latestFile.path, "utf-8");
    console.log(`📄 Content length: ${content.length} characters`);

    console.log("📂 ===== READ LATEST FILE ACTION END =====\n");

    return {
      success: true,
      content,
      fileName: latestFile.name,
      fileSize: latestFile.size,
      modifiedAt: latestFile.modifiedAt.toISOString(),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error reading file";

    console.log(`❌ Error: ${errorMessage}`);
    console.log("📂 ===== READ LATEST FILE ACTION END =====\n");

    return {
      success: false,
      error: errorMessage,
    };
  }
}
