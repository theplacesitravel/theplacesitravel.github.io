CREATE TABLE IF NOT EXISTS travel_list (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  device_id     TEXT    NOT NULL,
  country_code  TEXT    NOT NULL,
  status        TEXT    NOT NULL CHECK(status IN ('visited', 'planned', 'wishlist')),
  notes         TEXT    DEFAULT '',
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(device_id, country_code)
);

CREATE INDEX IF NOT EXISTS idx_travel_list_device ON travel_list(device_id);
CREATE INDEX IF NOT EXISTS idx_travel_list_status ON travel_list(device_id, status);
