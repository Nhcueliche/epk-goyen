import * as React from 'react';

export interface RiderRow {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface RiderTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  rows: RiderRow[];
  /** Small footnote under the rows (e.g. fallback gear). */
  note?: React.ReactNode;
}

/**
 * Framed dark panel of mono rider rows.
 * @startingPoint section="Core" subtitle="Technical rider panel" viewport="700x320"
 */
export function RiderTable(props: RiderTableProps): JSX.Element;
