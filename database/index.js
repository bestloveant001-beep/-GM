const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'user-db.json');

function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function getUser(id) {
  return readDB()[id] || null;
}

function setUser(id, data) {
  const db = readDB();
  db[id] = { ...db[id], ...data };
  writeDB(db);
  return db[id];
}

module.exports = { readDB, writeDB, getUser, setUser };
