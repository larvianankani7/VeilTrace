import { PROFILE_DATA } from "../../data/profileData";

type Props = {
  onClose: () => void;
};

export default function ExcelsApp({ onClose }: Props) {
  const rows = [
    { row: 1, field: "Document ID", value: PROFILE_DATA.documentId, type: "ID_STRING", status: "VERIFIED" },
    { row: 2, field: "Restriction Level", value: PROFILE_DATA.restriction, type: "SECURITY_TAG", status: "LOCKED" },
    { row: 3, field: "Classification", value: PROFILE_DATA.classification, type: "METADATA", status: "OFFICIAL" },
    { row: 4, field: "Full Name", value: PROFILE_DATA.fullName, type: "STRING", status: "RECORDED" },
    { row: 5, field: "Nickname", value: PROFILE_DATA.nickname, type: "STRING", status: "RECORDED" },
    { row: 6, field: "Age", value: String(PROFILE_DATA.age), type: "INTEGER", status: "RECORDED" },
    { row: 7, field: "Sex", value: PROFILE_DATA.sex, type: "STRING", status: "RECORDED" },
    { row: 8, field: "Nationality", value: PROFILE_DATA.nationality, type: "STRING", status: "RECORDED" },
    { row: 9, field: "Occupation", value: PROFILE_DATA.occupation, type: "ROLE_TITLE", status: "ACTIVE" },
    { row: 10, field: "Email", value: PROFILE_DATA.email, type: "EMAIL_ADDR", status: "VALID" },
    { row: 11, field: "Phone Number", value: PROFILE_DATA.phoneNumber, type: "TEL_NUM", status: "VALID" },
    { row: 12, field: "Father's Name", value: PROFILE_DATA.fathersName, type: "STRING", status: "ARCHIVE" },
    { row: 13, field: "Mother's Name", value: PROFILE_DATA.mothersName, type: "STRING", status: "ARCHIVE" },
    { row: 14, field: "Assigned Node", value: PROFILE_DATA.assignedNode, type: "NODE_LOC", status: "STATIONED" },
    { row: 15, field: "Status", value: PROFILE_DATA.status, type: "STATUS_FLAG", status: "DETAINED" },
    { row: 16, field: "Incident Code", value: PROFILE_DATA.incidentCode, type: "CODE_REF", status: "BREACH" },
    { row: 17, field: "Investigation Notes", value: PROFILE_DATA.investigationNotes, type: "TEXT_MEMO", status: "LOGGED" },
  ];

  return (
    <section className="vt-location-flow vt-second-desktop vt-excels-app" aria-label="Spreadsheet Viewer">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // EXCELS — PERSONNEL_INDEX_0882.XLSX</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-excel-workspace">
        {/* Formula Bar */}
        <div className="vt-excel-formula-bar">
          <span className="vt-cell-indicator">A1:D17</span>
          <span className="vt-fx-symbol">fx</span>
          <div className="vt-formula-input">
            <code>=VT.DOSSIER.LOOKUP("VT-DOS-0882", "READ_ONLY")</code>
          </div>
        </div>

        {/* Spreadsheet Grid */}
        <div className="vt-excel-table-container" tabIndex={0} role="region" aria-label="Personnel Data Sheet">
          <table className="vt-excel-table">
            <thead>
              <tr>
                <th className="vt-th-corner" aria-label="Row number">#</th>
                <th className="vt-th-col">A [ RECORD FIELD ]</th>
                <th className="vt-th-col">B [ STORED VALUE ]</th>
                <th className="vt-th-col">C [ DATA TYPE ]</th>
                <th className="vt-th-col">D [ AUDIT STATUS ]</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.row} className="vt-excel-tr">
                  <td className="vt-td-row-idx">{r.row}</td>
                  <td className="vt-td-field"><strong>{r.field}</strong></td>
                  <td className="vt-td-value">{r.value}</td>
                  <td className="vt-td-type"><code>{r.type}</code></td>
                  <td className="vt-td-status">
                    <span className={`vt-excel-status-pill vt-status--${r.status.toLowerCase()}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Excel Status Bar & Sheet Tabs */}
        <footer className="vt-excel-footer">
          <div className="vt-excel-tabs">
            <span className="vt-sheet-tab is-active">📄 Sheet1 - PersonnelDossier</span>
            <span className="vt-sheet-tab is-disabled">+</span>
          </div>
          <div className="vt-excel-status-info">
            <span>READY [READ-ONLY PROTECTION ACTIVE]</span>
            <span>COUNT: 17 ROWS</span>
            <span>100% ZOOM</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
