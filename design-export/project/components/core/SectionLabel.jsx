import React from 'react';

/**
 * GOYEN · SectionLabel
 * Mono eyebrow / kicker above a title. Optional index number.
 */
export function SectionLabel({ children, index = null, style = {}, ...rest }) {
  return (
    <div
      className="gy-eyebrow"
      style={{ display: 'flex', alignItems: 'center', gap: '0.7em', ...style }}
      {...rest}
    >
      {index != null && (
        <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
          {String(index).padStart(2, '0')}
        </span>
      )}
      <span style={{
        width: 18, height: 1, background: 'var(--border-line)', display: 'inline-block',
      }} />
      <span>{children}</span>
    </div>
  );
}
