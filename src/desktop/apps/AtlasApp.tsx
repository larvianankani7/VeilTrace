type Props = {
  onClose: () => void;
};

export default function AtlasApp({ onClose }: Props) {
  return (
    <section className="vt-location-flow vt-second-desktop" aria-label="MongoDB Atlas Dashboard">
      <div className="vt-second-topbar">
        <strong>MONGODB ATLAS // READ-ONLY</strong>
        <button type="button" onClick={onClose}>← Back to desktop</button>
      </div>

      <article className="vt-atlas-dashboard">
        <aside>
          <h3>MongoDB Atlas</h3>
          <p>Overview</p>
          <p>Database</p>
          <p>Clusters</p>
          <p>Schema</p>
          <p>Metrics</p>
          <p>Security</p>
        </aside>

        <div className="vt-atlas-main">
          <div className="vt-atlas-heading">
            <div>
              <small>PROJECT / DEVOPS-LAB</small>
              <h2>Database Deployments</h2>
            </div>
            <span className="vt-atlas-status">● All systems operational</span>
          </div>

          <div className="vt-atlas-stats">
            <div>
              <small>CLUSTERS</small>
              <strong>1</strong>
              <span>Running</span>
            </div>
            <div>
              <small>DATABASES</small>
              <strong>4</strong>
              <span>Sample environment</span>
            </div>
            <div>
              <small>COLLECTIONS</small>
              <strong>12</strong>
              <span>Schema available</span>
            </div>
          </div>

          <div className="vt-atlas-cluster">
            <div>
              <div>
                <small>CLUSTER</small>
                <h3>veiltrace-cluster-01</h3>
                <p>Replica Set · M10 · Simulated</p>
              </div>
              <span className="vt-atlas-status">Available</span>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Database</th>
                  <th>Collections</th>
                  <th>Storage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>identity</td>
                  <td>profiles, sessions, audit_logs</td>
                  <td>128 MB</td>
                  <td>Healthy</td>
                </tr>
                <tr>
                  <td>locations</td>
                  <td>location_events, consent</td>
                  <td>64 MB</td>
                  <td>Healthy</td>
                </tr>
                <tr>
                  <td>security</td>
                  <td>access_events, alerts, tokens</td>
                  <td>96 MB</td>
                  <td>Healthy</td>
                </tr>
                <tr>
                  <td>analytics</td>
                  <td>usage_metrics, reports</td>
                  <td>42 MB</td>
                  <td>Healthy</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="vt-readonly-note">
            READ-ONLY TRAINING SNAPSHOT · No database is connected or modified.
          </p>
        </div>
      </article>
    </section>
  );
}
