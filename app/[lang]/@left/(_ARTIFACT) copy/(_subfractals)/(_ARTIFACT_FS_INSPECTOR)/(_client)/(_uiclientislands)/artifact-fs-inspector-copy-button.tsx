// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-copy-button.tsx

"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "../../(_shared)/(_utils)/copy-to-clipboard";

type ArtifactFsInspectorCopyButtonProps = {
  content: string;
  label: string;
  className?: string;
};

export function ArtifactFsInspectorCopyButton(
  props: ArtifactFsInspectorCopyButtonProps
) {
  const { content, label, className = "" } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);

    if (success) {
      setCopied(true);
      toast.success(`Copied: ${label}`, {
        duration: 2000,
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } else {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={handleCopy}
      className={`h-6 w-6 ${className}`}
      title={`Copy ${label}`}
    >
      {copied ? (
        <Check className="h-3 w-3 text-green-600" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </Button>
  );
}
