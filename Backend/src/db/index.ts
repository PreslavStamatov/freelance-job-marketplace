import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { getAllUsers } from '../repositories/user';

const openDb = async () => {
  const dbPath = path.join(process.cwd(), 'database.sqlite');

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // await db.exec(`DROP TABLE users`)
  // await db.exec(`DROP TABLE job_posts`)
  // await db.exec(`DROP TABLE assigned_jobs`)
  // await db.exec(`DROP TABLE refresh_tokens`)
  // await db.exec(`DROP TABLE milestones`)
  // await db.exec(`DROP TABLE job_applications`)
  // await db.exec(`DROP TABLE milestone_updates`)

  await db.exec(`PRAGMA foreign_keys = ON`);


  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      googleId TEXT UNIQUE,
      firstName TEXT,
      lastName TEXT,
      title TEXT,
      image TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT CHECK (role IN ('freelancer', 'employer'))
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS job_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      heading TEXT NOT NULL,
      description TEXT NOT NULL,
      deadline DATETIME NOT NULL,
      payment REAL NOT NULL,
      status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS assigned_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employerId INTEGER NOT NULL,
      freelancerId INTEGER NOT NULL,
      heading TEXT NOT NULL,
      description TEXT NOT NULL,
      deadline DATETIME NOT NULL,
      payment REAL NOT NULL,
      status TEXT DEFAULT 'active' CHECK (status IN ('active', 'finished')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (employerId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (freelancerId) REFERENCES users(id) ON DELETE CASCADE
  );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      tokenHash TEXT NOT NULL,
      expiresAt DATETIME NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );
`);



await db.exec(`
  CREATE TABLE IF NOT EXISTS milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobPostId INTEGER NOT NULL,
    assignedJobId INTEGER,
    description TEXT NOT NULL,
    deadline DATETIME NOT NULL,
    payment REAL NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'inProgress' CHECK (status IN ('inProgress', 'completed', 'inReview')),

    FOREIGN KEY (jobPostId) REFERENCES job_posts(id) ON DELETE CASCADE
  );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS milestone_updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    milestoneId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    description TEXT NOT NULL,
    action TEXT NOT NULL DEFAULT 'inProgress' CHECK (action IN ('inProgress', 'completed', 'inReview')),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (milestoneId) REFERENCES milestones(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );`
);

await db.exec(`
  CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobPostId INTEGER NOT NULL,
    freelancerId INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (jobPostId) REFERENCES job_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (freelancerId) REFERENCES users(id) ON DELETE CASCADE,

    UNIQUE (jobPostId, freelancerId)
  );
`);

console.table(await db.all(`SELECT * FROM job_applications`))
  return db;
};

export { openDb };