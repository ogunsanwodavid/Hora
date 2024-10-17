import { useEffect, useState } from "react";

export default function useCopyToClipboard(initialText = "", resetDuration) {
  const [text, setText] = useState(initialText);
  const [copied, setCopied] = useState(false);

  async function copy(newText) {
    setText(newText);

    try {
      await navigator.clipboard.writeText(newText);
      setCopied(true);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, resetDuration); //Resets "copied" state after reset duration

    return () => clearTimeout(timer);
  }, [copied, setCopied, resetDuration]);

  return { text, copied, copy };
}
