/**
 * The role badge: Author, Editor or Contributor, beside a name (batch 2a). One
 * shape everywhere: the page's byline and credits (written by quartz-book's
 * builder as the same markup) and the History panel. Its look is
 * EditOnGitHub.tsx's .tb-role rules.
 */
export type Role = "author" | "editor" | "contributor";
export const ROLE_LABELS: Record<Role, string> = { author: "Author", editor: "Editor", contributor: "Contributor" };

/** <span class="tb-role" data-role="editor">Editor</span>; null for no or an unknown role. */
export const roleBadge = (role: string | undefined | null): HTMLElement | null => {
  if (!role || !(role in ROLE_LABELS)) return null;
  const s = document.createElement("span");
  s.className = "tb-role";
  s.dataset.role = role;
  s.textContent = ROLE_LABELS[role as Role];
  return s;
};
