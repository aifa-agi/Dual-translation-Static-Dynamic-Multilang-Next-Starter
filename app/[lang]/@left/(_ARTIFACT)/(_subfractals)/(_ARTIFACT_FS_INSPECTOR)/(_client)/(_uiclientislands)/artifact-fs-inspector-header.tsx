// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-header.tsx

"use client";

export function ArtifactFsInspectorHeader() {
  const title = "Artifact FS Inspector";
  
  const descriptionStart = "Enter any path that contains ";
  const codeExample = "app/";
  const descriptionEnd = " and inspect either a single file or the entire fractal that owns this path.";
  
  return (
    <header className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>
      <p className="text-xs text-muted-foreground">
        {descriptionStart}
       <code> de className="px-1 py-0.5 rounded bg-muted"
          {codeExample}
        </code>
        {descriptionEnd}
      </p>
    </header>
  );
}
