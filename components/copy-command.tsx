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
      aria-label="Copy install command"
      className="group gb-command relative pr-12 cursor-pointer"
    >
      <span className="text-fd-muted-foreground select-none">$</span>
      <span className="text-fd-foreground">{command}</span>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 size-7 inline-flex items-center justify-center rounded-md text-fd-muted-foreground group-hover:text-fd-foreground group-hover:bg-fd-accent transition">
        {copied ? <Check className="size-3.5 text-fd-primary" /> : <Copy className="size-3.5" />}
      </span>
    </button>
  );
}
