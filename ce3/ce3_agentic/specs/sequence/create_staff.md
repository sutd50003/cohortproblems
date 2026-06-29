# Sequence Diagram: Create a Staff Record

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant staffajaxclient.js
    participant Express
    participant StaffRouter
    participant DeptRouter
    participant StaffModel
    participant WorkModel
    participant DB

    User->>Browser: Navigate to /staff/
    Browser->>Express: GET /staff/
    Express->>StaffRouter: route to GET /
    StaffRouter-->>Browser: render staff.ejs (HTML + script tag)

    Browser->>staffajaxclient.js: DOMContentLoaded → run()

    Note over staffajaxclient.js: populate_code_dropdown()
    staffajaxclient.js->>Express: GET /dept/all/
    Express->>DeptRouter: route to GET /all/
    DeptRouter->>DB: SELECT code FROM dept
    DB-->>DeptRouter: rows
    DeptRouter-->>staffajaxclient.js: JSON array of depts
    staffajaxclient.js->>Browser: update_code_dddl(json) — populate dept dropdown

    staffajaxclient.js->>Express: GET /staff/all/
    Express->>StaffRouter: route to GET /all/
    StaffRouter->>StaffModel: all()
    StaffModel->>DB: SELECT staff.id, staff.name, work.code FROM staff LEFT JOIN work ON staff.id = work.id
    DB-->>StaffModel: rows
    StaffModel-->>StaffRouter: Staff[]
    StaffRouter-->>staffajaxclient.js: JSON array of staff
    staffajaxclient.js->>Browser: update_staffsregion(json) — render list

    User->>Browser: Enter name, select dept code, click Submit
    Browser->>staffajaxclient.js: click event → handleSendButtonClick()
    staffajaxclient.js->>Express: POST /staff/submit/ (name=<value>&code=<value>, x-www-form-urlencoded)

    Note over Express: express.urlencoded() middleware<br/>parses body → req.body.name, req.body.code

    Express->>StaffRouter: route to POST /submit/
    Note over StaffRouter: Staff.newStaff(name, code) — id is undefined (not yet persisted)
    StaffRouter->>StaffModel: insertOne(staff)

    StaffModel->>DB: SELECT staff.id, staff.name, work.code FROM staff LEFT JOIN work ON staff.id = work.id WHERE staff.name = ?
    DB-->>StaffModel: rows (empty if name does not exist)

    alt name does not exist
        StaffModel->>DB: INSERT INTO staff (name) VALUES (?)
        DB-->>StaffModel: ok

        StaffModel->>DB: SELECT staff.id, staff.name, work.code ... WHERE staff.name = ? (re-fetch to get generated id)
        DB-->>StaffModel: [{id, name, code}]

        alt code is not null
            StaffModel->>WorkModel: insertOne(new Work(id, code))
            WorkModel->>DB: SELECT id, code FROM work WHERE id = ? AND code = ?
            DB-->>WorkModel: rows (empty if work record does not exist)

            alt work record does not exist
                WorkModel->>DB: INSERT INTO work (id, code) VALUES (?, ?)
                DB-->>WorkModel: ok
            else work record already exists
                Note over WorkModel: skip insert (duplicate guard)
            end

            WorkModel-->>StaffModel: void
        end
    else name already exists
        Note over StaffModel: skip insert (duplicate guard)
    end

    StaffModel-->>StaffRouter: void
    StaffRouter->>StaffModel: all()
    StaffModel->>DB: SELECT staff.id, staff.name, work.code FROM staff LEFT JOIN work ON staff.id = work.id
    DB-->>StaffModel: rows
    StaffModel-->>StaffRouter: Staff[]
    StaffRouter-->>staffajaxclient.js: JSON array of staff
    staffajaxclient.js->>Browser: update_staffsregion(json) — re-render list
    Browser-->>User: Updated staff list displayed
```

## Participants

| Participant | File |
|---|---|
| `staffajaxclient.js` | `public/javascripts/staffajaxclient.js` |
| `Express` | `app.ts` (middleware: `express.urlencoded`, morgan, cookie-parser) |
| `StaffRouter` | `routes/staff.ts` |
| `DeptRouter` | `routes/dept.ts` |
| `StaffModel` | `models/staff.ts` |
| `WorkModel` | `models/work.ts` |
| `DB` | `models/db.ts` (mysql2 connection pool) |

## Notes

- On page load, the client fetches the dept list (`GET /dept/all/`) to populate the dropdown, and the staff list (`GET /staff/all/`) to pre-render the existing records.
- `Staff.newStaff(name, code)` (`models/staff.ts:17`) is a static factory that creates a `Staff` with `id = undefined`, indicating the record has not yet been persisted.
- `StaffModel.insertOne()` (`models/staff.ts:133`) performs a duplicate guard using `findOneByName()` before inserting. If the name already exists, the insert is silently skipped.
- After inserting the staff row, the model re-fetches the row by name to retrieve the database-generated `id` (`AUTO_INCREMENT`), which is required to create the `Work` junction record.
- The `Work` record (`models/work.ts:81`) links the staff `id` to the dept `code` and is only created if a dept code was selected. It also has its own duplicate guard.
- After every successful `POST /staff/submit/`, the server returns the full updated staff list, which the client uses to re-render the page without a full reload.
