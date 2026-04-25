'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group inline-flex items-center gap-3 rounded-lg border border-fd-border bg-fd-card px-5 py-3 font-mono text-sm hover:border-fd-primary/60 transition"
      aria-label="Copy install command"
    >
      <span className="text-fd-muted-foreground select-none">$</span>
      <span>{command}</span>
      {copied ? (
        <Check className="size-4 text-brand-500" />
      ) : (
        <Copy className="size-4 text-fd-muted-foreground group-hover:text-fd-foreground transition" />
      )}
    </button>
  );
}
