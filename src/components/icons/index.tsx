import type { SVGProps } from "react";

/* Schematic line-work, taken from the drawing language the three diagrams
   already establish (LifecycleDiagram, SecurityFlowDiagram, USCoverageMap):
   hairline stroke on a coarse grid, square ends, mitred joins, no fills, no
   second colour. Everything inherits currentColor so a mark takes the tone of
   whatever it sits next to — including on .surface-dark.

   Scope, deliberately: DESIGN.md §7 bans the three-column grid of generic
   glyphs, and that ban still holds. These are marks that say what a list item
   *is*, set inline at text size beside the words they qualify. They are not
   headers for cards, and the set stays this small on purpose — a speculative
   library of unused glyphs is how the banned pattern gets back in. */
function LineIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Marks an item as included or satisfied. Decorative: the surrounding list
    text carries the meaning, so it stays aria-hidden. */
export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <LineIcon {...props}>
      <path d="M4 12.5 9.5 18 20 6.5" />
    </LineIcon>
  );
}
