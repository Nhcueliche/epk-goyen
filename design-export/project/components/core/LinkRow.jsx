import React from 'react';

/**
 * GOYEN · LinkRow
 * External link as readable text with a trailing arrow — sets, socials, press.
 * Platform shown as text label, never an icon alone.
 */
export function LinkRow({ platform, label, href = '#', style = {}, ...rest }) {
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-4) 0',
        borderTop: '1px solid var(--border-hairline)',
        textDecoration: 'none',
        color: 'var(--text-primary)',
        transition: 'color var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
      {...rest}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--type-micro)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        minWidth: 120,
      }}>
        {platform}
      </span>
      <span style={{ flex: 1, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--type-body)' }}>
        {label}
      </span>
      <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--type-body)' }}>↗</span>
    </a>
  );
}
