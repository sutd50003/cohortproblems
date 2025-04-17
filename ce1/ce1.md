# Cohort Exercise - Web Programming Basics, JavaScript and Node.js

## Learning Outcomes

By the end of this exercise, you should be able to

1. Use JavaScript to capture user inputs from HTML documents.
1. Use JavaScript to render output to the HTML documents.
1. Apply JavaScript operators to compute results
1. Define named and anonymous functions in JavaScript
1. Describe the semantics of Common JavaScript
1. Compare the difference between event callbacks and promises.
1. Analyse the run-time behavior of an asynchronous node.js program

## Total 10 Marks

Submit a zip file containing 2 folders for each question.

## Submission Format

**Task 1** folder contains:

1. HTML file
2. Javascript file
3. PDF file about your code. Assume you are explaining your code to a novice programmer who just started learning HTML and JS. Maximum 1 page and feel free to include figures.

**Task 2** folder contains:

1. PDF file containing the table and its explanation. Suggestions: you can use MS Word or Excel to create tables and type your explanation. Feel free to handwrite as well but make sure it is clear and readable on PDF.

## Task 1 (5 Marks)

Complete the following HTML and JavaScript codes, so that when the button `Submit` is clicked, the min and the max of the sequence of numbers (which is separated by ",") entered in the input text box will be displayed in the `span` elements.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="minmax.js"></script>
    <meta charset="utf-8" />
    <title>50.003 sample code: Min and Max</title>
  </head>
  <body>
    <div>Your input: <input id="textbox1" type="text" /></div>
    <div>Min: <span id="min"></span></div>
    <div>Max: <span id="max"></span></div>
    <div><button id="button1">Submit</button></div>
  </body>
</html>
```

```js
function numbers(l) {
  var o = [];
  for (let i in l) {
    var n = parseInt(l[i], 10);
    if (!isNaN(n)) {
      o.push(n);
    }
  }
  return o;
}
// input: an array of numbers
// output: an object containing 'min', with the minimum of the array
//          and 'max' the maximum of the array.
function min_max(a) {
  var min = null;
  var max = null;
  // TODO: fixme
  return { min: min, max: max };
}

function handleButton1Click() {
  var textbox1 = document.getElementById("textbox1");
  var min = document.getElementById("min");
  var max = document.getElementById("max");
  var items = textbox1.value.split(",");
  var obj = min_max(numbers(items));
  min.innerHTML = obj["min"];
  max.innerHTML = obj["max"];
}

function run() {
  var button1 = document.getElementById("button1");
  // TODO: fixme
}

document.addEventListener("DOMContentLoaded", run);
```

## Task 2 (5 Marks)

Using the callstack-microtask-macrotask table

1. illustrate the execution of the following JavaScript program,
1. explain what will be printed on the console output
1. if the program leads to a non-termination, just show one cycle of execution.

```js
1:  import EventEmitter from 'events';
2:  const ev1 = new EventEmitter();
3:  const ev2 = new EventEmitter();
4:  let count = 0;
5:  let promise1 = new Promise( (resolve, reject) => {
6:      resolve(count);
7:  })
8:  let promise2 = new Promise( (resolve, reject) => {
9:      resolve(count);
10: })
11: function foo(x) {
12:     return new Promise((resolve, reject) => {
13:         if (x > 10) {
14:             resolve();
15:         } else if (x % 2 == 0) {
16:             ev1.emit('run', ++x);
17:         } else {
18:             ev2.emit('run', ++x);
19:         }
20:     })
21: }
22: ev1.on('run', (data) => { setImmediate(() => {
23:     console.log(`data ${data} received by ev1`);
24:     promise2.then((x) => foo(data)); });
25: });
26: ev2.on('run', (data) => { setImmediate(() => {
27:     console.log(`data ${data} received by ev2`);
28:     promise1.then((x) => foo(data)); });
29: });
30:ev2.emit('run', count);
```

The first few steps of the execution is given as follows to help you get started. Hint: `setImmediate()` enqueue task to _macro queue_.

| program counter (line num) | call stack | micro queue | promises               | macro queue      | event reg                                    | console output |
| -------------------------- | ---------- | ----------- | ---------------------- | ---------------- | -------------------------------------------- | -------------- |
| 5                          | [main()]   | []          | {promise@5}            | []               | {}                                           |                |
| 8                          | [main()]   | []          | {promise@5, promise@8} | []               | {}                                           |                |
| 22                         | [main()]   | []          | {promise@5, promise@8} | []               | { ev1.run:function@22 }                      |                |
| 26                         | [main()]   | []          | {promise@5, promise@8} | []               | { ev1.run:function@22, ev2.run:function@26 } |                |
| 30                         | [main()]   | []          | {promise@5, promise@8} | [function@26(0)] | { ev1.run:function@22, ev2.run:function@26 } |                |
| eof                        | []         | []          | {promise@5, promise@8} | [function@26(0)] | { ev1.run:function@22, ev2.run:function@26 } |                |
|                            |            |             |                        |                  |                                              |                |
