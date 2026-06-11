import * as React from 'react';

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Optional section index, rendered zero-padded in electric blue. */
  index?: number | string | null;
}

/** Mono eyebrow label above a section title, with an optional 01/02 index. */
export function SectionLabel(props: SectionLabelProps): JSX.Element;
