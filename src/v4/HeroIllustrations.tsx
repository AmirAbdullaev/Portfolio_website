// Hero art: two small bento clusters of abstract UI tiles in the site's own language — the same rounded
// tiles, surfaces and orange accent as the rest of the page. They sit at the bottom corners of the hero and
// run off its bottom edge (cut content). Purely decorative; sizes are in em so a cluster scales as one piece
// from the --art-fs set in CSS.

const check = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Left: a dashboard tile with bars, an orange tile with a toggle, a dark tile with a line chart. */
export function ArtDashboard() {
  return (
    <div className="art is-left" aria-hidden="true">
      <div className="art-tile is-paper art-dash">
        <div className="art-row">
          <span className="art-dot" />
          <span className="art-line is-w40" />
          <span className="art-pill" />
        </div>
        <div className="art-kpis">
          <span className="art-kpi"><span className="art-line is-w60" /><span className="art-line is-w30 is-bold" /></span>
          <span className="art-kpi"><span className="art-line is-w50" /><span className="art-line is-w40 is-bold" /></span>
        </div>
        <div className="art-bars">
          {[46, 72, 38, 88, 60, 74].map((h, i) => (
            <span key={i} className={`art-bar${i === 3 ? ' is-accent' : ''}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="art-tile is-accent art-toggle">
        <span className="art-switch"><span /></span>
        <span className="art-line is-w70 is-ink" />
        <span className="art-line is-w45 is-ink" />
      </div>
      <div className="art-tile is-dark art-chart">
        <span className="art-line is-w40 is-light" />
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true">
          <polyline points="0,42 18,30 34,36 52,16 70,24 86,8 100,14" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  )
}

/** Right: a dark scan tile (warehouse terminal), module chips, and a kanban board tile. */
export function ArtBoard() {
  return (
    <div className="art is-right" aria-hidden="true">
      <div className="art-tile is-dark art-scan">
        <span className="art-barcode" />
        <span className="art-done">{check}</span>
      </div>
      <div className="art-chips">
        <span className="art-chip">WMS</span>
        <span className="art-chip">MES</span>
        <span className="art-chip is-accent">QMS</span>
      </div>
      <div className="art-tile is-paper art-kanban">
        {[[1, 0, 1], [0, 1], [1, 1, 0]].map((col, c) => (
          <div key={c} className="art-col">
            <span className="art-line is-w60" />
            {col.map((accent, i) => (
              <span key={i} className={`art-card${accent && c === 1 ? ' is-accent' : ''}`}>
                <span className="art-line is-w70" />
                <span className="art-line is-w40" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
