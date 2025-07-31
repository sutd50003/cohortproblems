# Cohort Exercise - Blackbox Unit Testing


## Learning Outcomes

1. Develop specification-based unit testing using boundary value testing
1. Develop specification-based unit testing using equivalence class testing

## Total 10 Marks

You may submit your codes in a zip file with folders and subfolders, and a report to explain your codes. 

## Question 1 (5 Marks)

Consider the code `findmax.js` given in the template project, write a testsuite using Jest which contains 3 test cases.
1. a test that results in failure (do not compute maximum) it should fail
1. a test that results in error, it should throw an error such that the test won't catch this error
1. a test that results in pass


## Question 2 (5 marks)

Consider the code `findmax.js` from the previous question, define a list of test cases using equivalence class testing. 

Hints: You may consider the following partitions

1. empty array
1. array with null values
1. array with NaN values
1. arrays with a single ordinal value
1. arrays with more than one ordinal value and the max value is at index 0.
1. arrays with more than one ordinal value and the max value is at index N-1, where N is the length.
1. arrays with more than one ordinal values and the max value is not at index 0 nor index N-1.
1. null value
