import pgp from 'pg-promise'

const connectionString = "postgres://postgres:admin@localhost:5433/mtcmdb";
export const db = pgp(connectionString);
  