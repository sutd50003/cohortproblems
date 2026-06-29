# Cohort Exercise - Frontend Development

## Learning Outcomes

## Total 10 Marks

You may submit your codes in a zip file containing ce3_q1 and ce3_q2 folders.

## Question 1 (5 Marks)

### Setup

1. Extract the given project `ce3_q1`, in a folder. Run `npm i` to download all the dependencies.
1. Install mysql (version >=8)
1. In mysql shell
   1. Create a database named `ce3q1`
   1. Create a non root user with a secure password
1. Modify `models/db.ts` according to your newly created user.
1. Examine `models/dept.ts`, `models/staff.ts` and `models/work.ts`. You don't need to modify any of these files.
1. Examine `routes/dept.ts` and `routes/staff.ts`, You might need to modify these files depending on the port number you use for the frontend.
1. Examine `app.ts`. You don't need to modify it.
1. Examine `views/dept.ejs` and `views/staff.ejs`. You don't need to modify any of these files.

### Task 1 (2 Marks)

Complete the TODOs in the client side JavaScript `public/javascripts/deptajaxclient.js` so that
the user can use the form in `https://localhost:3000/dept/` to add new department and view the list of existing departments.

### Task 2 (3 Marks)

Complete the TODOS in the client side JavaScript `public/javascripts/staffajaxclient.js` so that
the user can use the form in `https://localhost:3000/staff/` to add new staff and view the list of existing staffs.

## Question 2 (5 Marks)

#### Setup

1. Reuse the express web app from question1, keep it running at port 3000.
1. Set the react app to run at port 5000.
1. Add the necessary code in the backend to allow access from `localhost:5000`.
1. Extract the given project `ce3_q2`, in a folder. Run `npm i` to download all the dependencies.
1. Start the app with `npm run dev`

### Task 1 (2 Marks)

Complete the TODOs in the React component `Dept.jsx` so that the department table is rendered (see below) when `Department` tab bar is clicked.

![](../images/ce8_q2_1.png)

### Task 2 (3 Marks)

Complete the TODOs in the React component `Staff.jsx` so that the department code dropdown can be rendered on start.

![](../images/ce8_q2_2.png)


## (Optional) Question 3: Agentic Software Development

This exercise is optional, you don't need to submit. 

In this exercise, we assume you have completed question 1, and copied the updated modules from `ce3_q1` to `ce3_agentic`. 

1. Install opencode, (https://opencode.ai/), you may choose to install either desktop version or cli version.

1. Start a new project from the project root folder. 
   1. If you are using opencode desktop, click (+) icon
   1. If you are using opencode cli, run `opencode` when you are in the `ce3_agentic` folder.

1. Choose a model.
   1. If you are using opencode desktop, click the drop down next to `Build/Plan` at the buttom. 
   1. If you are using opencode cli, press ctrl-p. 

1. Use a separate editor/IDE, open and read `ce3_agentic/AGENTS.md`.

1. Use a separate editor/IDE, open and read `ce3_agentic/specs_sequence/*.md`.
   * `create_dept.md` and `create_staff.md` should have been implemented by now.
   * `update_staff.md` will be implemented using Agentic AI.

1. Write a prompt to answer opencode to implement the `update_staff.md` feature. 

1. After the code generated, you should **review** the codes to tell us whether it is correct.

