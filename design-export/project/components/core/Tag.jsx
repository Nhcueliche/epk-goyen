import React from 'react';

/**
 * GOYEN · Tag
 * Small mono chip for genres / descriptors. Square by default; the only
 * place a pill radius is allowed.
 */
export function Tag({ children, variant = 'outline', shape = 'square', style = {}, ...rest }) {
  const variants = {
    outline: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-frame)' },
    solid: { background: 'var(--surface-raised)', color: 'var(--text-primary)', border: '1px solid var(--border-hairline)' },
    accent: { background: 'var(--accent)', color: 'var(--text-on-accent)', border: '1px solid var(--accent)' },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 10px',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--type-micro)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-xs)',
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
