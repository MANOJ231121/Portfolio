import { useState, useEffect } from 'react';

/**
 * LenisHUD - Real-time smooth scroll telemetry dashboard inspired by lenis.dev.
 * Displays live velocity meters, scroll metrics, inertia physics, and interactive controls.
 */
export default function LenisHUD({ skewEnabled, onToggleSkew }) {
  const [metrics, setMetrics] = useState({
    velocity: 0,
    scroll: 0,
    progress: 0,
    direction: 0,
  });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!window.lenis) return;

    let rafId;
    let lastVelocity = 0;

    const onScroll = (e) => {
      const v = Math.abs(e.velocity || 0);
      lastVelocity = v;

      setMetrics({
        velocity: v,
        scroll: Math.round(e.scroll || 0),
        progress: Math.round((e.progress || 0) * 100),
        direction: e.direction || 0,
      });
    };

    // Smooth decay for velocity when scroll pauses
    const decayLoop = () => {
      if (lastVelocity > 0.05) {
        lastVelocity *= 0.9;
        setMetrics((prev) => ({
          ...prev,
          velocity: lastVelocity,
        }));
      } else if (lastVelocity !== 0) {
        lastVelocity = 0;
        setMetrics((prev) => ({
          ...prev,
          velocity: 0,
        }));
      }
      rafId = requestAnimationFrame(decayLoop);
    };

    window.lenis.on('scroll', onScroll);
    rafId = requestAnimationFrame(decayLoop);

    return () => {
      window.lenis?.off('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleScrollTo = (target) => {
    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: -70, duration: 1.2 });
    }
  };

  // Calculate meter bar segments (0 to 10 bars)
  const barCount = 10;
  const activeBars = Math.min(barCount, Math.round((metrics.velocity / 30) * barCount));

  return (
    <div className={`lenis-hud ${expanded ? 'expanded' : 'collapsed'}`}>
      {/* Collapsed Pill View */}
      <button
        type="button"
        className="lenis-hud-pill"
        onClick={() => setExpanded(!expanded)}
        title="Click to toggle Lenis Telemetry HUD"
        aria-label="Toggle Lenis HUD"
      >
        <span className="hud-indicator-dot" />
        <span className="hud-pill-label">LENIS.DEV</span>
        <span className="hud-pill-stat">{metrics.velocity.toFixed(1)} px/f</span>
        <span className="hud-pill-badge">{metrics.progress}%</span>
        <span className="hud-chevron">{expanded ? '▼' : '▲'}</span>
      </button>

      {/* Expanded Telemetry Panel */}
      {expanded && (
        <div className="lenis-hud-panel">
          <div className="hud-panel-header">
            <div className="hud-title-group">
              <span className="hud-live-tag">● LIVE ENGINE</span>
              <span className="hud-version">LENIS v1.3</span>
            </div>
            <button
              type="button"
              className="hud-close-btn"
              onClick={() => setExpanded(false)}
              aria-label="Close HUD"
            >
              &times;
            </button>
          </div>

          {/* Velocity visualizer meter */}
          <div className="hud-meter-box">
            <div className="hud-meter-label">
              <span>VELOCITY INTENSITY</span>
              <span className="hud-velocity-num">{metrics.velocity.toFixed(1)} px/f</span>
            </div>
            <div className="hud-bars-container">
              {Array.from({ length: barCount }).map((_, i) => (
                <div
                  key={i}
                  className={`hud-meter-bar ${i < activeBars ? 'active' : ''}`}
                  style={{
                    opacity: i < activeBars ? 1 : 0.2,
                    transform: i < activeBars ? 'scaleY(1)' : 'scaleY(0.4)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Data Grid */}
          <div className="hud-data-grid">
            <div className="hud-data-item">
              <span className="hud-item-label">PROGRESS</span>
              <span className="hud-item-val">{metrics.progress}%</span>
            </div>
            <div className="hud-data-item">
              <span className="hud-item-label">SCROLL Y</span>
              <span className="hud-item-val">{metrics.scroll}px</span>
            </div>
            <div className="hud-data-item">
              <span className="hud-item-label">DIRECTION</span>
              <span className="hud-item-val">
                {metrics.direction === 1
                  ? '↓ DOWN'
                  : metrics.direction === -1
                  ? '↑ UP'
                  : '— IDLE'}
              </span>
            </div>
            <div className="hud-data-item">
              <span className="hud-item-label">INERTIA SKEW</span>
              <button
                type="button"
                className={`hud-toggle-btn ${skewEnabled ? 'active' : ''}`}
                onClick={onToggleSkew}
              >
                {skewEnabled ? 'ACTIVE (3°)' : 'DISABLED'}
              </button>
            </div>
          </div>

          {/* Quick Glide Navigators */}
          <div className="hud-actions-box">
            <span className="hud-actions-label">QUICK GLIDE TEST:</span>
            <div className="hud-action-buttons">
              <button type="button" onClick={() => handleScrollTo(0)}>
                TOP
              </button>
              <button type="button" onClick={() => handleScrollTo('#about')}>
                ABOUT
              </button>
              <button type="button" onClick={() => handleScrollTo('#projects')}>
                PROJECTS
              </button>
              <button type="button" onClick={() => handleScrollTo('#contact')}>
                CONTACT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
