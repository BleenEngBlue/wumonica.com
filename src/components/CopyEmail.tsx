"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "./ui";

/**
 * Copy-to-clipboard with a live status region (WCAG 4.1.3 — announces without
 * moving focus). Renders nothing if the Clipboard API is unavailable.
 */
export function CopyEmail({ email }: { email: string }) {
  const [supported, setSupported] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setSupported(typeof navigator !== "undefined" && !!navigator.clipboard?.writeText);
    return () => window.clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setStatus("Email address copied to clipboard");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setCopied(false);
        setStatus("");
      }, 2000);
    } catch {
      setStatus("Copy failed — please select the address manually");
    }
  }

  return (
    <>
      {supported && (
        <button
          type="button"
          onClick={copy}
          className={cx(
            "self-start inline-flex items-center gap-[0.5ch] min-h-9 px-[0.8rem] py-[0.4rem] font-mono text-xs",
            "border rounded-sm bg-transparent transition-colors hover:text-accent hover:border-accent",
            copied ? "text-accent border-accent" : "text-ink-2 border-line-2",
          )}
        >
          {copied ? "Copied ✓" : "Copy email"}
        </button>
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {status}
      </span>
    </>
  );
}
