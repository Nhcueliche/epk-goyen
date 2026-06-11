import React from 'react';

/**
 * GOYEN · PhotoFrame
 * Photo with the brand treatment: hairline frame, blue scrim, scanlines,
 * optional corner caption band.
 */
export function PhotoFrame({
  src,
  alt = '',
  ratio = '3 / 4',
  scrim = true,
  scanlines = true,
  frame = true,
  caption = null,
  children,
  style = {},
  ...rest
}) {
  return (
    <figure
      className={frame ? 'gy-frame' : ''}
      style={{
        position: 'relative',
        margin: 0,
        aspectRatio: ratio,
        overflow: 'hidden',
        borderRadius: 'var(--radius-xs)',
        background: 'var(--ink-900)',
        ...style,
      }}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {scrim && <div className="gy-photo-scrim" style={{ zIndex: 2 }} />}
      {scanlines && <div className="gy-scanlines" style={{ zIndex: 3 }} />}
      {(caption || children) && (
        <figcaption style={{
          position: 'relative',
          zIndex: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'var(--space-5)',
        }}>
          {children}
          {caption && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-micro)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--blue-haze)',
            }}>
              {caption}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
