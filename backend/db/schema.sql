CREATE TABLE dbAuthorisedUsers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK(LENGTH(name) <= 128),
  email TEXT NOT NULL UNIQUE CHECK(LENGTH(email) <= 256),
  role TEXT NOT NULL CHECK(role IN ('admin', 'organiser', 'volunteer'))
);

CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK(LENGTH(name) <= 128),
  date DATETIME NOT NULL
);

CREATE TABLE teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER NOT NULL,
  name TEXT NOT NULL CHECK(LENGTH(name) <= 128), 
  lead_name TEXT NOT NULL CHECK(LENGTH(lead_name) <= 128),
  lead_email TEXT NOT NULL CHECK(LENGTH(lead_email) <= 256),
  num_participants INTEGER NOT NULL CHECK(num_participants <= 10),
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE participants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL CHECK(LENGTH(name) <= 128),
  email TEXT NOT NULL CHECK(LENGTH(email) <= 256),
  phone TEXT NOT NULL CHECK(LENGTH(phone) = 10 AND phone GLOB '[0-9]*'),
  college TEXT NOT NULL CHECK(LENGTH(college) <= 256),
  srn TEXT NOT NULL CHECK(LENGTH(srn) <= 32),
  branch TEXT NOT NULL CHECK(LENGTH(branch) <= 4),
  day_scholar INTEGER NOT NULL CHECK(day_scholar IN (0, 1)), --- bool value
  hostel TEXT CHECK(LENGTH(hostel) <= 8),
  shortlisted INTEGER NOT NULL CHECK(shortlisted IN (0, 1)), -- bool value
  qr_string TEXT NOT NULL UNIQUE,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE participant_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  participant_id INTEGER NOT NULL,
  event_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('checkin', 'lunch', 'dinner', 'checkout')),
  label TEXT CHECK(LENGTH(label) <= 64),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

