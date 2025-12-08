// prescreenService.js
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { nanoid } = require('nanoid');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'db.json');
const adapter = new JSONFile(file);

// Pass default data as the second argument to Low to avoid "missing default data"
const db = new Low(adapter, { applications: [] });

async function initDB() {
  await db.read();
  // ensure db.data exists in case file was empty
  db.data = db.data || { applications: [] };
}

function classifySME(turnover, investment) {
  const t = Number(turnover) || 0;
  const i = Number(investment) || 0;
  if (t <= 10000000 && i <= 2500000) return 'Micro';
  if (t <= 100000000 && i <= 25000000) return 'Small';
  return 'Medium';
}

function decideStatus(docs = {}) {
  if (!docs.kyc) return { status: 'Rejected', reason: 'KYC missing' };
  if (docs.kyc && docs.income && docs.businessProof) return { status: 'Ready for Appraisal' };
  if (docs.kyc && docs.income && !docs.businessProof) return { status: 'Conditional Approval', reason: 'Business proof missing' };
  if (docs.kyc && docs.businessProof && !docs.income) return { status: 'On Hold', reason: 'Income proof missing' };
  return { status: 'Pending', reason: 'Incomplete documents' };
}

async function createApplication(payload) {
  await initDB();
  const id = nanoid();
  const { businessName = '', turnover = 0, investment = 0, docs = {} } = payload;
  const classification = classifySME(Number(turnover), Number(investment));
  const decision = decideStatus(docs);
  const record = {
    id,
    businessName,
    turnover: Number(turnover),
    investment: Number(investment),
    classification,
    docs,
    decision,
    createdAt: new Date().toISOString()
  };
  db.data.applications.push(record);
  await db.write();
  return record;
}

async function listApplications() {
  await initDB();
  return db.data.applications;
}

async function getApplication(id) {
  await initDB();
  return db.data.applications.find(a => a.id === id);
}

module.exports = {
  createApplication,
  listApplications,
  getApplication
};
