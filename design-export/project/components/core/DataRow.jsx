import React from 'react';

/**
 * GOYEN · DataRow
 * Mono key/value line — the rider, specs, fast facts. Dotted leader optional.
 */
export function DataRow({ label, value, leader = true, style = {}, ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.75em',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--type-mono-small)',
        lineHeight: 'var(--leading-mono)',
        ...style,
      }}
      {...rest}
    >
      <span style={{
        color: 'var(--text-muted)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        flex: 'none',
      }}>
        {label}
      </span>
      {leader && (
        <span style={{
          flex: 1,
          borderBottom: '1px dotted var(--border-hairline)',
          transform: 'translateY(-3px)',
        }} />
      )}
      <span style={{ color: 'var(--text-primary)', flex: leader ? 'none' : 1, textAlign: 'right' }}>
        {value}
      </span>
    </div>
  );
}
