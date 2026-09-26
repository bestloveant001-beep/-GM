cat > database/index.js << 'EOF'
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
  const db = readDB();
  return db[id] || null;
}

function setUser(id, data) {
  const db = readDB();
  db[id] = data;
  writeDB(db);
  return data;
}

module.exports = { getUser, setUser };
EOF
