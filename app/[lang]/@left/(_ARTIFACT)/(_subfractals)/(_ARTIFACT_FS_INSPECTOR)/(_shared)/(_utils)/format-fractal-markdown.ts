// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_shared)/(_utils)/format-fractal-markdown.ts

import { ArtifactFsInspectorFileNode, ArtifactFsInspectorFolderNode, ArtifactFsInspectorFractalTree, ArtifactFsInspectorTreeNode } from "../../(_server)/(_fsqueries)/artifact-fs-inspector-fs-queries";


/**
 * Форматирует дерево фрактала в markdown с code blocks
 * 
 * @param tree - Дерево фрактала для форматирования
 * @returns Строка markdown со всеми файлами
 * 
 * @example
 * const markdown = formatFractalTreeAsMarkdown(tree);
 * // Результат:
 * // ## Fractal: app/[lang]/@left/(_ARTIFACT)
 * // 
 * // ### ROOT
 * // ```
 * // // @/app/.../SPEC.md
 * // ...content...
 * // ```
 */
export function formatFractalTreeAsMarkdown(
  tree: ArtifactFsInspectorFractalTree
): string {
  const lines: string[] = [];

  // Заголовок фрактала
  lines.push(`## Fractal: ${tree.fractalRootPathFromApp}`);
  lines.push("");

  // ROOT файлы
  if (tree.filesAtRoot.length > 0) {
    lines.push("### ROOT");
    lines.push("");
    tree.filesAtRoot.forEach((file) => {
      lines.push(formatFileAsMarkdown(file));
      lines.push("");
    });
  }

  // Route Segment
  if (tree.routeSegment) {
    lines.push(`### Route Segment: ${tree.routeSegment.name}`);
    lines.push("");
    const { page, layout, error, notFound, default: defaultFile, loading } = tree.routeSegment;
    
    if (page) lines.push(formatFileAsMarkdown(page) + "\n");
    if (layout) lines.push(formatFileAsMarkdown(layout) + "\n");
    if (error) lines.push(formatFileAsMarkdown(error) + "\n");
    if (notFound) lines.push(formatFileAsMarkdown(notFound) + "\n");
    if (defaultFile) lines.push(formatFileAsMarkdown(defaultFile) + "\n");
    if (loading) lines.push(formatFileAsMarkdown(loading) + "\n");
  }

  // Client Layer
  if (tree.clientLayer) {
    lines.push(`### ${tree.clientLayer.name}`);
    lines.push("");
    tree.clientLayer.children.forEach((node) => {
      lines.push(formatNodeRecursive(node, 0));
    });
  }

  // Server Layer
  if (tree.serverLayer) {
    lines.push(`### ${tree.serverLayer.name}`);
    lines.push("");
    tree.serverLayer.children.forEach((node) => {
      lines.push(formatNodeRecursive(node, 0));
    });
  }

  // Shared Layer
  if (tree.sharedLayer) {
    lines.push(`### ${tree.sharedLayer.name}`);
    lines.push("");
    tree.sharedLayer.children.forEach((node) => {
      lines.push(formatNodeRecursive(node, 0));
    });
  }

  // Subfractals
  if (tree.subfractals.length > 0) {
    lines.push("### (_subfractals)");
    lines.push("");
    tree.subfractals.forEach((name) => {
      lines.push(`- ${name}`);
    });
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Форматирует один файл как markdown code block
 */
function formatFileAsMarkdown(file: ArtifactFsInspectorFileNode): string {
  // 1. Получаем расширение файла без точки
  const extension = file.extension.replace(".", "");
  
  // 2. Формируем открывающий тег code block (три обратных апострофа)
  const backticks = "```";
  const openingFence = backticks + extension;
  
  // 3. Формируем путь к файлу
  const filePath = `// @/${file.pathFromApp}`;
  
  // 4. Пустая строка между путём и содержимым
  const emptyLine = "";
  
  // 5. Содержимое файла
  const content = file.content;
  
  // 6. Закрывающий тег code block
  const closingFence = backticks;
  
  // 7. Собираем всё вместе
  const lines = [
    openingFence,
    filePath,
    emptyLine,
    content,
    closingFence
  ];
  
  // 8. Объединяем через перенос строки
  return lines.join("\n");
}

/**
 * Рекурсивно форматирует узел дерева (файл или папку)
 */
function formatNodeRecursive(
  node: ArtifactFsInspectorTreeNode,
  depth: number
): string {
  if (node.kind === "file") {
    return formatFileAsMarkdown(node as ArtifactFsInspectorFileNode) + "\n";
  }

  const folder = node as ArtifactFsInspectorFolderNode;
  const lines: string[] = [];

  // Если это граница (_subfractals) - только название
  if (folder.isBoundary) {
    lines.push(`${"  ".repeat(depth)}- **${folder.name}** (boundary)`);
    return lines.join("\n");
  }

  // Обычная папка - рекурсивно обрабатываем детей
  folder.children.forEach((child) => {
    lines.push(formatNodeRecursive(child, depth + 1));
  });

  return lines.join("\n");
}
