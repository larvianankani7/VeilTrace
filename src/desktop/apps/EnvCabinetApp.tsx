type Props = {
  onClose: () => void;
};

type EnvVar = {
  key: string;
  value: string;
  scope: "SYSTEM" | "SECURITY" | "RUNTIME" | "NETWORK";
  masked?: boolean;
};

const SYSTEM_ENV_VARS: EnvVar[] = [
  { key: "VEILTRACE_CONTAINMENT_MODE", value: "STRICT_PROTOCOL_LOCK", scope: "SECURITY" },
  { key: "VT_NODE_IDENTIFIER", value: "VT-NODE-08-CONTAINEE", scope: "SYSTEM" },
  { key: "VT_SECURITY_INCIDENT_CODE", value: "SEC-BREACH-0x4B", scope: "SECURITY" },
  { key: "VT_PRIMARY_OPERATOR", value: "Merdin Morov (M)", scope: "SYSTEM" },
  { key: "VT_OPERATOR_EMAIL", value: "merdinmorov1@gmail.com", scope: "SYSTEM" },
  { key: "PATH", value: "/usr/local/veiltrace/bin:/usr/bin:/bin:/opt/sentinel/tools", scope: "SYSTEM" },
  { key: "NODE_ENV", value: "production", scope: "RUNTIME" },
  { key: "VT_LOG_LEVEL", value: "DEBUG_AUDIT", scope: "RUNTIME" },
  { key: "VT_TELEMETRY_EGRESS_GATEWAY", value: "https://origin-gate.veiltrace.internal", scope: "NETWORK" },
  { key: "VT_SNOWFLAKE_WAREHOUSE", value: "WH_SECURITY_ANALYTICS_XS", scope: "RUNTIME" },
  { key: "VT_ENCRYPTION_CIPHER", value: "AES-256-GCM-NO-FALLBACK", scope: "SECURITY" },
  { key: "VT_BLAST_RADIUS_LIMIT", value: "CONTAINMENT_ZONE_08", scope: "SECURITY" },
];

export default function EnvCabinetApp({ onClose }: Props) {
  return (
    <div className="vt-env-window" aria-label="Environment Variables Cabinet">
      {/* Top Header */}
      <div className="vt-second-topbar">
        <div className="vt-env-title-wrap">
          <span className="vt-env-icon" aria-hidden="true">🗄️</span>
          <strong>VEILTRACE // ENVIRONMENT CABINET — SYSTEM RUNTIME VARIABLES [READ-ONLY]</strong>
        </div>
        <button type="button" onClick={onClose} className="vt-btn-return" aria-label="Return to desktop">
          Return ✕
        </button>
      </div>

      <div className="vt-env-body">
        {/* Info Banner */}
        <div className="vt-env-info-banner">
          <div className="vt-env-info-left">
            <span className="vt-env-banner-icon">⚙️</span>
            <div>
              <h3>Kernel & Application Environment Configuration</h3>
              <p>Variables loaded into the active user session memory. Modifications restricted by sandbox policy.</p>
            </div>
          </div>
          <span className="vt-env-pill">ACTIVE PROCESS PID: 8082</span>
        </div>

        {/* Env Variables List */}
        <div className="vt-env-list-card">
          <div className="vt-env-table-header">
            <span className="col-key">VARIABLE NAME</span>
            <span className="col-val">RESOLVED RUNTIME VALUE</span>
            <span className="col-scope">SCOPE</span>
          </div>

          <div className="vt-env-rows">
            {SYSTEM_ENV_VARS.map((env) => (
              <div key={env.key} className="vt-env-row">
                <span className="col-key">
                  <code>{env.key}</code>
                </span>
                <span className="col-val">
                  <span className="vt-env-val-bubble">{env.value}</span>
                </span>
                <span className="col-scope">
                  <span className={`vt-scope-badge scope-${env.scope.toLowerCase()}`}>{env.scope}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <footer className="vt-env-footer">
          <span>🔒 Read-only snapshot of runtime environment. Secrets secured by internal HSM token.</span>
        </footer>
      </div>
    </div>
  );
}
