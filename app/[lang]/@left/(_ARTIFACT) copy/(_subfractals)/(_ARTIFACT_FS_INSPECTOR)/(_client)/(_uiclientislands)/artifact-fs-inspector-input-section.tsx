// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-input-section.tsx

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ArtifactFsInspectorInputSectionProps = {
  pathInput: string;
  onPathChange: (value: string) => void;
  onReadFractal: () => void;
  isPending: boolean;
};

export function ArtifactFsInspectorInputSection(
  props: ArtifactFsInspectorInputSectionProps
) {
  const { pathInput, onPathChange, onReadFractal, isPending } = props;

  const labelText = "Path or fractal root";
  const readFractalText = isPending ? "Reading fractal..." : "Read fractal";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium">
        {labelText}
      </label>
      <Input
        className="w-full font-mono text-sm"
        value={pathInput}
        onChange={(event) => onPathChange(event.target.value)}
      />
      <Button
        type="button"
        onClick={onReadFractal}
        disabled={isPending}
        variant="default"
        size="sm"
        className="self-start"
      >
        {readFractalText}
      </Button>
    </div>
  );
}
