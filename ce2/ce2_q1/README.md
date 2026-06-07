# CE2 — Express.js + MongoDB REST API (50.003)

Web app backend exercise building a RESTful API with Node.js, Express, TypeScript, and MongoDB.

## Description

A cohort exercise implementing an MVC-structured Express.js backend with MongoDB as the document store. The API manages `Staff` and `Dept` entities, exposes REST endpoints for insertion and retrieval, and demonstrates the full request lifecycle from route → controller → model → database.

## Getting Started

### Dependencies

* Node.js v18+
* MongoDB running locally on port `27017`
* npm

### Installing

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd ce2_q1
npm install
```

Ensure MongoDB is running before starting the server:

```bash
# Linux
sudo systemctl start mongod

# macOS
brew services start mongodb-community
```

### Executing

**Development** (hot-reload via nodemon + ts-node):

```bash
./setup_and_run.sh
```

**Production** (compile then run):

```bash
./setup_and_run.sh prod
# or manually:
npx tsc && node dist/bin/www.js
```

Server runs at `http://localhost:3000`.

### Available Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/dept/add/:code` | Add a department |
| GET | `/dept/all/` | List all departments |
| GET | `/dept/all/withstaff/` | List departments with their staff |
| POST | `/staff/add/:id/:name/:code` | Add a staff member |
| GET | `/staff/all/` | List all staff |

> **Note:** `/staff/add` is a POST route and cannot be tested in the browser address bar. All endpoints should be tested via curl.

### Testing Workflow (canonical — use curl)

Always clear the DB and re-seed in order (dept before staff):

```bash
# 0. Clear dirty data
mongosh --eval "use ce2q1; db.dept.deleteMany({}); db.staff.deleteMany({})"

# 1. Add a department
curl http://localhost:3000/dept/add/hr
# returns: {"code":"hr"}

# 2. Add a staff member (POST required)
curl -X POST http://localhost:3000/staff/add/1/aaron/hr
# returns: {"id":"1","name":"aaron","code":"hr"}

# 3. List all staff
curl http://localhost:3000/staff/all/
# returns: [{"id":"1","name":"aaron","dept":"hr"}]

# 4. List all departments
curl http://localhost:3000/dept/all/
# returns: [{"code":"hr"}]

# 5. List departments with their staff
curl http://localhost:3000/dept/all/withstaff/
# returns: [{"code":"hr","staffs":[{"id":"1","name":"aaron","dept":"hr"}]}]
```

---

## Known Issues & Bugs Encountered

A log of bugs hit during development — documented for reference.

### 1. Missing `@types` declarations (TS7016)

**Error:**
```
Could not find a declaration file for module 'debug' / 'morgan' / 'cookie-parser'
```
**Cause:** Express generator scaffolds JS packages that don't ship their own TypeScript type definitions.

**Fix:**
```bash
npm i --save-dev @types/debug @types/morgan @types/cookie-parser
```

---

### 2. `tsc` output not found at expected path

**Error:**
```
Error: Cannot find module '.../bin/www.js'
```
**Cause:** `tsc` compiles into `dist/` by default (set in `tsconfig.json`), so the compiled entry is at `dist/bin/www.js`, not `bin/www.js`.

**Fix:**
```bash
node dist/bin/www.js
```

---

### 3. Query param type mismatch (TS2345)

**Error:**
```
Argument of type 'string | string[]' is not assignable to parameter of type 'string'
```
**Cause:** `req.params` returns `string | string[]` because TypeScript accounts for duplicate URL keys. The model constructors only accept `string`.

**Fix:** Explicitly cast params in `staff.ts` and `dept.ts`:
```typescript
const code = req.params.code as string;
const id   = req.params.id   as string;
const name = req.params.name as string;
```

---

### 4. `for...in` used instead of `for...of` on arrays

**Error:** Routes returning index numbers (0, 1, 2...) instead of actual documents.

**Cause:** `for...in` iterates over the **keys** of an object/array, not its values. On an array, keys are numeric indices as strings.

**Fix:** Use `for...of`, or better — send the whole array at once:
```typescript
// Before (wrong)
for (const staff in staffs) { res.send(staff); }

// After (correct)
res.send(staffs);
```

---

### 5. `res.send()` called multiple times in a loop

**Cause:** HTTP responses can only be sent once per request. Calling `res.send()` inside a loop throws a "headers already sent" error after the first iteration.

**Fix:** Accumulate results into an array and send once (see fix above).

---

### 6. `/all/withstaff/` endpoint never responded

**Cause:** The route built the `result` array correctly but had no `res.send()` call — the response was left hanging.

**Fix:**
```typescript
res.send(result); // added after the for...of loop
```

---

### 7. POST route returns `NotFoundError` when tested in browser

**Error:**
```
NotFoundError: Not Found
```
**Cause:** Browser address bar always sends a GET request. `/staff/add` is registered as `router.post(...)`, so Express correctly returns 404 when hit via GET.

**Fix:** Use curl to test POST routes:
```bash
curl -X POST http://localhost:3000/staff/add/1/aaron/hr
# returns: {"id":"1","name":"aaron","code":"hr"}
```

---

### 8. `/dept/all/withstaff/` returns empty `staffs` arrays + duplicate dept entries

**Observed:**
```json
[{"code":"hr","staffs":[]},{"code":"hr","staffs":[]},{"code":"hr","staffs":[]}]
```
**Expected:**
```json
[{"code":"hr","staffs":[{"id":"1","name":"aaron","dept":"hr"}]}]
```

**Cause — duplicates:** `/dept/add/:code` has no duplicate guard. Hitting it multiple times inserts multiple identical documents.

**Cause — empty staffs:** Seeding order matters. Staff must be added after the dept exists, and the query field name must match what the `Staff` model actually stores (`dept`, not `dept_code`).

**Fix — clear dirty data first:**
```bash
mongosh
use ce2q1
db.dept.deleteMany({})
db.staff.deleteMany({})
```

**Fix — correct the field name in the withstaff query (routes/dept.ts):**
```typescript
// Before (wrong)
const staffs = await staffmodel.find({ dept_code: dept.code });

// After (matches Staff model which stores field as 'dept')
const staffs = await staffmodel.find({ dept: dept.code });
```

**Re-seed cleanly after fixing (dept first, then staff):**
```bash
curl http://localhost:3000/dept/add/hr
curl -X POST http://localhost:3000/staff/add/1/aaron/hr
curl http://localhost:3000/dept/all/withstaff/
# returns: [{"code":"hr","staffs":[{"id":"1","name":"aaron","dept":"hr"}]}]
```

---

### 9. Accidentally committing work directly to `main`

**Cause:** Cloned the instructor's repo directly instead of forking, then worked on `main` locally.

**Fix:** Move commits to a new branch without losing any work:
```bash
git branch answers/your-name   # snapshot current work
git reset --hard upstream/main  # reset main to instructor's state
git checkout answers/your-name  # switch to your branch
git push origin answers/your-name
```

---

### 10. Attempted `client.connect()` fix introduced a race condition in `db.ts`

**Cause:** Adding `async function connect()` and exporting `db` before the promise resolved meant `db` was still `null` on the first request — making things worse than the original.

**What was tried:**
```typescript
// WRONG — db is exported as null before connect() resolves
async function connect(): Promise<void> {
    await client.connect();
    db = client.db(dbName);
}
connect().catch(console.error);
export { db, cleanup }; // db is still null here at export time
```

**Resolution:** Revert to the instructor's original boilerplate. The MongoDB Node driver handles lazy connection internally — `client.db(dbName)` is sufficient and `client.connect()` is not required explicitly:
```typescript
// CORRECT — instructor's original, leave as-is
try {
    db = client.db(dbName);
} catch (error) {
    console.error("database connection failed. " + error);
}
export { db, cleanup };
```

---

## Authors

Roshan M — [50.003 Elements of Software Construction, SUTD]

## Version History

* 0.3
    + Finalized curl-based testing workflow
    + Corrected field name in withstaff query (`dept_code` → `dept`)
    + Corrected db name in bug 8 (`echo` → `ce2q1`)
    + Added bug 10: `db.ts` race condition from attempted `connect()` fix and revert
* 0.2
    + Documented bugs 7–9: POST via browser, duplicate inserts, withstaff field mismatch
* 0.1 — Initial CE2 implementation: Staff + Dept routes with MongoDB integration

## Acknowledgments

* [DomPizzie README Template](https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc)
* [Express.js Docs](https://expressjs.com/)
* [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/)
* [Mongoose ODM](https://mongoosejs.com/) — alternative to raw MongoDB driver


## Note/Disclaimers
- AI was used for generation of the README as well as testing, learning and understanding the the tech stack 