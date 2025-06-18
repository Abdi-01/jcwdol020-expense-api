import { Pool } from "pg";

const poolDB = new Pool({
    user: "postgres.hntpxqmwxwirgvvaqbnu",
    host: "aws-0-us-west-1.pooler.supabase.com",
    database: "postgres",
    password: "2NjHhQL4IriQIiig",
    port: 6543
});

export default poolDB;