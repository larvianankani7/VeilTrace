import { useState } from "react";

type Props = {
  onClose: () => void;
};

type CalendarEvent = {
  day: number;
  month: number; // 0-indexed (9 = Oct, 10 = Nov)
  year: number;
  title: string;
  category: "drill" | "audit" | "maintenance" | "review";
  time: string;
};

const DEMO_EVENTS: CalendarEvent[] = [
  { day: 6, month: 9, year: 2026, title: "Subnet Handshake Diagnostics", category: "audit", time: "10:00" },
  { day: 12, month: 9, year: 2026, title: "Containment Wing Security Drill", category: "drill", time: "14:30" },
  { day: 19, month: 9, year: 2026, title: "Optical Fiber Loop Maintenance", category: "maintenance", time: "09:00" },
  { day: 26, month: 9, year: 2026, title: "Telemetry Encryption Key Rotation", category: "audit", time: "16:00" },
  { day: 28, month: 9, year: 2026, title: "SEC-BREACH Containment Lockdown", category: "drill", time: "22:00" },
  { day: 3, month: 10, year: 2026, title: "Infrastructure Board Review", category: "review", time: "11:00" },
  { day: 14, month: 10, year: 2026, title: "Automated Gateway Firmware Update", category: "maintenance", time: "03:00" },
  { day: 22, month: 10, year: 2026, title: "Quarterly Access Token Audit", category: "audit", time: "13:00" },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarApp({ onClose }: Props) {
  // Start at October 2026
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed 9)
  const [selectedDay, setSelectedDay] = useState<number | null>(28);

  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDay(null);
  }

  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDay(null);
  }

  // Days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // First day of month (0 = Sun, 1 = Mon ... 6 = Sat)
  const firstDayRaw = new Date(currentYear, currentMonth, 1).getDay();
  // Shift so Mon = 0, Sun = 6
  const startDayOffset = (firstDayRaw + 6) % 7;

  const currentEvents = DEMO_EVENTS.filter(
    (ev) => ev.month === currentMonth && ev.year === currentYear
  );

  return (
    <section className="vt-location-flow vt-second-desktop vt-calendar-app" aria-label="Calendar">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // CALENDAR — OPERATIONS SCHEDULE</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-calendar-workspace">
        <header className="vt-calendar-header">
          <div className="vt-calendar-title-group">
            <span className="vt-kicker-badge">CONTAINMENT OPERATIONS // DISPATCH SCHEDULE</span>
            <h2>{MONTH_NAMES[currentMonth]} {currentYear}</h2>
          </div>

          <div className="vt-calendar-nav-buttons">
            <button type="button" onClick={handlePrevMonth} className="vt-cal-btn" aria-label="Previous month">
              ◀ Previous
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentYear(2026);
                setCurrentMonth(9);
                setSelectedDay(28);
              }}
              className="vt-cal-btn is-today"
            >
              Current Month
            </button>
            <button type="button" onClick={handleNextMonth} className="vt-cal-btn" aria-label="Next month">
              Next ▶
            </button>
          </div>
        </header>

        <div className="vt-calendar-main-grid">
          {/* Weekday headers */}
          <div className="vt-calendar-weekdays">
            {WEEKDAYS.map((day) => (
              <div key={day} className="vt-weekday-header">{day}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="vt-calendar-days-grid" role="grid" aria-label={`${MONTH_NAMES[currentMonth]} ${currentYear} calendar`}>
            {/* Blank leading slots */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`blank-${i}`} className="vt-cal-cell is-empty" aria-hidden="true" />
            ))}

            {/* Actual day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = currentEvents.filter((ev) => ev.day === day);
              const isSelected = selectedDay === day;
              const isToday = currentYear === 2026 && currentMonth === 9 && day === 28;

              return (
                <div
                  key={day}
                  role="gridcell"
                  tabIndex={0}
                  className={`vt-cal-cell ${isToday ? "is-today-cell" : ""} ${isSelected ? "is-selected-cell" : ""}`}
                  onClick={() => setSelectedDay(day)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedDay(day);
                  }}
                >
                  <div className="vt-cal-day-header">
                    <span className={`vt-day-number ${isToday ? "is-today-badge" : ""}`}>{day}</span>
                    {dayEvents.length > 0 && (
                      <span className="vt-day-event-count">{dayEvents.length} event{dayEvents.length > 1 ? "s" : ""}</span>
                    )}
                  </div>

                  <div className="vt-cal-day-events">
                    {dayEvents.map((ev, idx) => (
                      <div key={idx} className={`vt-event-pill vt-ev--${ev.category}`} title={`${ev.time} - ${ev.title}`}>
                        <span className="vt-ev-time">{ev.time}</span>
                        <span className="vt-ev-title">{ev.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected day summary pane */}
        <aside className="vt-calendar-details-panel">
          <h3>
            Schedule for {selectedDay ? `${MONTH_NAMES[currentMonth]} ${selectedDay}, ${currentYear}` : "Selected Day"}
          </h3>
          {selectedDay && currentEvents.filter((ev) => ev.day === selectedDay).length > 0 ? (
            <ul className="vt-selected-day-list">
              {currentEvents
                .filter((ev) => ev.day === selectedDay)
                .map((ev, idx) => (
                  <li key={idx} className={`vt-selected-event-item vt-ev-border--${ev.category}`}>
                    <div className="vt-selected-meta">
                      <span className="vt-selected-time">{ev.time}</span>
                      <span className="vt-selected-badge">{ev.category.toUpperCase()}</span>
                    </div>
                    <strong>{ev.title}</strong>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="vt-muted-text">No scheduled incidents or drills logged for this date.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
