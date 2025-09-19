/**
 * A generic hook for managing promise-based dialogs
 * @module hooks/usePromiseDialog
 */

import { useState, useRef } from 'react';

/**
 * Hook for managing dialogs that return promises
 * Useful for confirmation dialogs, input dialogs, etc.
 */
export function usePromiseDialog<TInput, TOutput>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<TInput | null>(null);
  const resolveRef = useRef<((value: TOutput) => void) | null>(null);

  /**
   * Shows the dialog and returns a promise that resolves when user responds
   */
  const show = (input: TInput): Promise<TOutput> => {
    return new Promise((resolve) => {
      setData(input);
      setIsOpen(true);
      resolveRef.current = resolve;
    });
  };

  /**
   * Handles the user's response and resolves the promise
   */
  const respond = (output: TOutput) => {
    if (resolveRef.current) {
      resolveRef.current(output);
      resolveRef.current = null;
    }
    setIsOpen(false);
    setData(null);
  };

  /**
   * Cancels the dialog without resolving the promise
   */
  const cancel = () => {
    resolveRef.current = null;
    setIsOpen(false);
    setData(null);
  };

  return {
    isOpen,
    data,
    show,
    respond,
    cancel,
    setIsOpen,
  };
}