CREATE TABLE admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK(LENGTH(name) <= 128),
  email TEXT NOT NULL UNIQUE CHECK(LENGTH(email) <= 256)
);

CREATE TABLE organisers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK(LENGTH(name) <= 128),
  email TEXT NOT NULL UNIQUE CHECK(LENGTH(email) <= 256)
);

CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK(LENGTH(name) <= 128),
  team_id INTEGER NOT NULL,
  date DATETIME NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER NOT NULL,
  name TEXT NOT NULL CHECK(LENGTH(name) <= 128), 
  lead_name TEXT NOT NULL CHECK(LENGTH(lead_name <= 128)),
  lead_email TEXT CHECK(LENGTH(lead_email) <= 256),
  num_participants INTEGER CHECK(num_participants <= 10),
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE participants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL CHECK(LENGTH(name) <= 128),
  email TEXT NOT NULL CHECK(LENGTH(email) <= 256),
  phone TEXT NOT NULL CHECK(LENGTH(phone) = 10 AND phone GLOB '[0-9]*'),
  college TEXT NOT NULL CHECK(LENGTH(college) <= 256),
  srn TEXT CHECK(LENGTH(srn) <= 32),
  branch TEXT CHECK(LENGTH(branch) <= 2),
  day_scholar BOOLEAN,
  hostel TEXT CHECK(LENGTH(hostel) <= 8),
  qr_string TEXT NOT NULL UNIQUE CHECK(LENGTH(qr_string) <= 256),
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

