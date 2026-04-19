/**
 * SectionWrapper — layout primitive that provides consistent vertical rhythm
 * and optional anchor id for every section on the page.
 *
 * This is a Server Component — it adds zero JS to the client bundle.
 *
 * Responsibilities:
 *   • Applies consistent max-width, horizontal padding, and vertical spacing.
 *   • Accepts an optional `id` prop for in-page anchor navigation.
 *   • Accepts an optional `as` prop to override the rendered HTML element.
 */

import type { ElementType, ReactNode } from "react";

export interface SectionWrapperProps {
  children: ReactNode;
  /** HTML id for anchor linking (e.g. "#features"). */
  id?: string;
  /** Semantic element to render. Defaults to "section". */
  as?: ElementType;
  /** Additional class names applied to the outer element. */
  className?: string;
}

export default function SectionWrapper({
  children,
  id,
  as: Tag = "section",
  className,
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={className}>
      <div>{children}</div>
    </Tag>
  );
}
