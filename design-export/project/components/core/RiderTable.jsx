import React from 'react';
import { DataRow } from './DataRow.jsx';

/**
 * GOYEN · RiderTable
 * A framed dark panel of mono DataRows. The technical rider.
 */
export function RiderTable({ title = 'Rider técnico', rows = [], note = null, style = {}, ...rest }) {
  return (
    <div
      className="gy-frame"
      style={{
        background: 'var(--surface-raised)',
        borderRadius: 'var(--radius-xs)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-card)',
        ...style,
      }}
      {...rest}
    >
      {title && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--type-micro)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: 'var(--space-4)',
        }}>
          {title}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4em' }}>
        {rows.map((r, i) => (
          <DataRow key={i} label={r.label} value={r.value} />
        ))}
      </div>
      {note && (
        <div style={{
          marginTop: 'var(--space-4)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--type-micro)',
          color: 'var(--text-faint)',
          lineHeight: 1.5,
        }}>
          {note}
        </div>
      )}
    </div>
  );
}
