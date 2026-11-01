type Props = {
  onClose: () => void;
};

export default function LedgerApp({ onClose }: Props) {
  const transactions = [
    { id: "TX-1049", date: "2026-10-12", description: "Node-08 Fiber Relay Uplink", category: "Infrastructure", amount: 480.00 },
    { id: "TX-1050", date: "2026-10-15", description: "Encrypted Hardware Token HSM", category: "Security", amount: 250.00 },
    { id: "TX-1051", date: "2026-10-18", description: "Subnet Optical Gateway Maintenance", category: "Infrastructure", amount: 120.50 },
    { id: "TX-1052", date: "2026-10-21", description: "Cryptographic Certificate Renewal", category: "Security", amount: 85.00 },
    { id: "TX-1053", date: "2026-10-24", description: "Terminal Backup Drive Array (SSD)", category: "Hardware", amount: 310.00 },
    { id: "TX-1054", date: "2026-10-26", description: "Secure Enclave Diagnostics License", category: "Software", amount: 175.00 },
    { id: "TX-1055", date: "2026-10-27", description: "Auxiliary Power Capacitor Replacement", category: "Hardware", amount: 95.00 },
  ];

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const categories = transactions.reduce<Record<string, number>>((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  return (
    <section className="vt-location-flow vt-second-desktop vt-ledger-app" aria-label="Financial Expense Ledger">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // LEDGER — EXPENSE LEDGER AUDIT</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-ledger-workspace">
        <header className="vt-ledger-header">
          <div>
            <span className="vt-kicker-badge">FACILITY EXPENDITURES // NODE-08</span>
            <h2>Discretionary Expense Ledger</h2>
            <p className="vt-muted-text">
              Official operating expenditure records and procurement audits for Containment Wing terminals.
            </p>
          </div>

          <div className="vt-ledger-summary-pills">
            <div className="vt-summary-card">
              <span className="vt-summary-label">TOTAL DISBURSED</span>
              <strong className="vt-summary-amount">₹{total.toFixed(2)}</strong>
            </div>
            <div className="vt-summary-card">
              <span className="vt-summary-label">TRANSACTIONS</span>
              <strong className="vt-summary-amount">{transactions.length} Records</strong>
            </div>
          </div>
        </header>

        {/* Category breakdown row */}
        <div className="vt-ledger-category-row">
          {Object.entries(categories).map(([cat, amt]) => (
            <div key={cat} className="vt-cat-pill">
              <span className="vt-cat-name">{cat}</span>
              <strong className="vt-cat-amt">₹{amt.toFixed(2)}</strong>
            </div>
          ))}
        </div>

        {/* Ledger Table */}
        <div className="vt-ledger-table-wrap">
          <table className="vt-ledger-table">
            <thead>
              <tr>
                <th>TRANSACTION ID</th>
                <th>DATE</th>
                <th>DESCRIPTION</th>
                <th>CATEGORY</th>
                <th style={{ textAlign: "right" }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="vt-ledger-row">
                  <td><code>{tx.id}</code></td>
                  <td>{tx.date}</td>
                  <td><strong>{tx.description}</strong></td>
                  <td>
                    <span className="vt-ledger-category-badge">{tx.category}</span>
                  </td>
                  <td style={{ textAlign: "right" }} className="vt-ledger-amt">
                    ₹{tx.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} style={{ textAlign: "right", fontWeight: 700 }}>
                  TOTAL EXPENDITURE:
                </td>
                <td style={{ textAlign: "right", fontWeight: 800, color: "#10b981" }}>
                  ₹{total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
