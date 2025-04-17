# Cohort Exercise - Express.js, MongoDB, MySQL and Database design

Submit a zip file containing 2 folders for each question.

Task 1 folder contains a project folder. You can use ce5_q1 we provide.

Task 2 folder contains 1 PDF file containing you step-by-step explanation max 2 page

## Task 1 (5 marks)

Given the ER diagram below (refer to lecture note),

![](../images/er2.png)

implement a simple API web-app with the following end-points using MongoDB database:

1. add dept into database
   ```url
   http://localhost:3000/dept/add/hr
   ```
   yields (displayed in browser)
   ```json
   { "code": "hr"}
   ```
1. add staff into database
   ```url
   http://localhost:3000/staff/add/1/aaron/hr
   ```
   yields
   ```json
   {
     "id": "1",
     "name": "aaron",
     "dept": "hr"
   }
   ```
1. find all departments
   ```url
   http://localhost:3000/dept/all/
   ```
   yields
   ```json
   [{ "code": "hr" }]
   ```
1. find all staffs
   ```url
   http://localhost:3000/staff/all/
   ```
   yields
   ```json
   [{ "id": "1", "name": "aaron", "dept": "hr" }]
   ```
1. find all depts with staffs
   ```url
   http://localhost:3000/dept/all/withstaff/
   ```
   yields
   ```json
   [{ "code": "hr", "staffs": [{ "id": "1", "name": "aaron", "dept": "hr" }] }]
   ```

Make sure the database name is `echo` by having the following definition `const dbName = "echo";` in `db.js`.

## Task 2 (5 marks)

Given the ER diagram below,

![](../images/er2.png)

give the step-by-step explanation on how we can implement the following API in your Express.js webapp which returns the count of staff from each department by using MySQL database:

`localhost:3000/dept/count`

yields

`[{"count":2,"dept":"HR"}]`.
