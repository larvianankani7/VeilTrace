import { PROFILE_RAW_TEXT } from "../../data/profileData";

export default function ProfileApp() {
  const profileContent = PROFILE_RAW_TEXT;

  return (
    <div className="profile-notepad">
      <div className="profile-notepad__menu" aria-hidden="true">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
      </div>

      <div className="profile-notepad__body">
        <pre className="profile-notepad__text">{profileContent}</pre>
      </div>

      <footer className="profile-notepad__statusbar">
        <span>Ln 32, Col 1</span>
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
      </footer>
    </div>
  );
}
