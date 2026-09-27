/**
 * A fact CONTENT.md marks as unknown. Never fill it with a plausible-sounding
 * value — render it visibly instead. See CLAUDE.md → Hard rules.
 */
export type Todo = { readonly todo: true; readonly note: string };

export const todo = (note: string): Todo => ({ todo: true, note });

export const isTodo = (value: unknown): value is Todo =>
  typeof value === "object" &&
  value !== null &&
  (value as { todo?: unknown }).todo === true;
