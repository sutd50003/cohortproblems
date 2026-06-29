# Sequence Diagram: Create a Department Record

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant deptajaxclient.js
    participant Express
    participant DeptRouter
    participant DeptModel
    participant DB

    User->>Browser: Navigate to /dept/
    Browser->>Express: GET /dept/
    Express->>DeptRouter: route to GET /
    DeptRouter-->>Browser: render dept.ejs (HTML + script tag)

    Browser->>deptajaxclient.js: DOMContentLoaded → run()
    deptajaxclient.js->>Express: GET /dept/all/
    Express->>DeptRouter: route to GET /all/
    DeptRouter->>DeptModel: all()
    DeptModel->>DB: SELECT code FROM dept
    DB-->>DeptModel: rows
    DeptModel-->>DeptRouter: Dept[]
    DeptRouter-->>deptajaxclient.js: JSON array of depts
    deptajaxclient.js->>Browser: update_deptsregion(json) — render list

    User->>Browser: Enter dept code and click Submit
    Browser->>deptajaxclient.js: click event → handleSendButtonClick()
    deptajaxclient.js->>Express: POST /dept/submit/ (code=<value>, x-www-form-urlencoded)

    Note over Express: express.urlencoded() middleware<br/>parses body → req.body.code

    Express->>DeptRouter: route to POST /submit/
    DeptRouter->>DeptModel: insertOne(new Dept(code))
    DeptModel->>DB: SELECT code FROM dept WHERE code = ?
    DB-->>DeptModel: rows (empty if code does not exist)

    alt code does not exist
        DeptModel->>DB: INSERT INTO dept (code) VALUES (?)
        DB-->>DeptModel: ok
    else code already exists
        Note over DeptModel: skip insert (duplicate guard)
    end

    DeptModel-->>DeptRouter: void
    DeptRouter->>DeptModel: all()
    DeptModel->>DB: SELECT code FROM dept
    DB-->>DeptModel: rows
    DeptModel-->>DeptRouter: Dept[]
    DeptRouter-->>deptajaxclient.js: JSON array of depts
    deptajaxclient.js->>Browser: update_deptsregion(json) — re-render list
    Browser-->>User: Updated department list displayed
```

## Participants

| Participant | File |
|---|---|
| `deptajaxclient.js` | `public/javascripts/deptajaxclient.js` |
| `Express` | `app.ts` (middleware: `express.urlencoded`, morgan, cookie-parser) |
| `DeptRouter` | `routes/dept.ts` |
| `DeptModel` | `models/dept.ts` |
| `DB` | `models/db.ts` (mysql2 connection pool) |

## Notes

- The duplicate guard in `DeptModel.insertOne()` (`routes/dept.ts:79`) performs a `SELECT` before the `INSERT`. If a record with the same `code` already exists, the insert is silently skipped.
- After every successful call to `POST /dept/submit/`, the server returns the full updated dept list, which the client uses to re-render the page without a full reload.
