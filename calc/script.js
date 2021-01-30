// only start once the DOM has loaded
document.addEventListener("DOMContentLoaded", function () {

  // Defining the types of functions the calculator can do
  const funcs = {
    NEW: "new",
    ADD: "add",
    SUB: "sub",
    MUL: "mul",
    DIV: "div",
  }

  // Defining the ways numbers can beused in the calculator
  const num_states = {
    CURRENT: "current",
    NEW: "new",
  }

  // set defaults: no current function/new, starting a new number, 
  // no previous number
  let calc_function = funcs.NEW;
  let num_state = num_states.NEW;
  let old_num = 0;

  // anonymous function for what to do when number buttons are clicked
  let build_num = function (num) {
    // only add a decimal if there isn't already one
    if (num == ".") {
      if (document.getElementById("total").innerHTML.indexOf(".") == -1) {
        document.getElementById("total").innerHTML += ".";
        num_state = num_states.CURRENT;
      }
    }
    // if you're making a new number, store the old one and change the 
    // number state to continue this one
    else if (num_state == num_states.NEW) {
      old_num = document.getElementById("total").innerHTML;
      document.getElementById("total").innerHTML = num;
      num_state = num_states.CURRENT;
    }
    else {
      // if the current number is zero with no decimal, replace it 
      if (total == 0 && document.getElementById("total").innerHTML.indexOf(".") != -1) {
        document.getElementById("total").innerHTML = num;
      } else {
        document.getElementById("total").innerHTML += num;
      }
    }
  }

  // anonymous function for what to do when a functional button is clicked
  let perform_func = function (func) {
    // values for the number to be created and the currently displayed number
    let calculated_num = 0;
    let current = parseFloat(document.getElementById("total").innerHTML);

    // calculate with the old/held function
    if (func != "clear" && num_state != num_states.NEW) {
      switch (calc_function) {
        // if a user selects a function (add,sub,mul,div) while
        // the screen displays either the initial 0 or a zero from
        // clearing the calculator, we treat the 0 as a part of 
        // their calculation e.g. 0 * #
        case funcs.NEW:
          calculated_num = current;
          break;
        case funcs.ADD:
          calculated_num = old_num + current;
          break;
        case funcs.SUB:
          calculated_num = old_num - current;
          break;
        case funcs.MUL:
          calculated_num = old_num * current;
          break;
        case funcs.DIV:
          calculated_num = old_num / current;
          break;
      }

      // display the calculated number
      document.getElementById("total").innerHTML = calculated_num;
    }


    // set the new function type
    switch (func) {
      case "clear":
        document.getElementById("total").innerHTML = 0;
        old_num = 0;
        calc_function = funcs.NEW;
        break;
      case "add":
        calc_function = funcs.ADD;
        break;
      case "sub":
        calc_function = funcs.SUB;
        break;
      case "mul":
        calc_function = funcs.MUL;
        break;
      case "div":
        calc_function = funcs.DIV;
        break;
    }

    // we want to be creating a new number next
    num_state = num_states.NEW;
  }

  // number button event listeners
  document.getElementById("zero").addEventListener("click", function () { build_num(0) }, false);
  document.getElementById("one").addEventListener("click", function () { build_num(1) }, false);
  document.getElementById("two").addEventListener("click", function () { build_num(2) }, false);
  document.getElementById("three").addEventListener("click", function () { build_num(3) }, false);
  document.getElementById("four").addEventListener("click", function () { build_num(4) }, false);
  document.getElementById("five").addEventListener("click", function () { build_num(5) }, false);
  document.getElementById("six").addEventListener("click", function () { build_num(6) }, false);
  document.getElementById("seven").addEventListener("click", function () { build_num(7) }, false);
  document.getElementById("eight").addEventListener("click", function () { build_num(8) }, false);
  document.getElementById("nine").addEventListener("click", function () { build_num(9) }, false);
  document.getElementById("dec").addEventListener("click", function () { build_num(".") }, false);

  // function button event listeners
  document.getElementById("clear").addEventListener("click", function () { perform_func("clear") }, false);
  document.getElementById("add").addEventListener("click", function () { perform_func("add") }, false);
  document.getElementById("sub").addEventListener("click", function () { perform_func("sub") }, false);
  document.getElementById("div").addEventListener("click", function () { perform_func("div") }, false);
  document.getElementById("mul").addEventListener("click", function () { perform_func("mul") }, false);

}, false);