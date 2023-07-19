var btnid = 0;
var textbox = document.getElementById("panel");
var str = textbox.value;
var evalstr = textbox.value;
var ansbox = document.getElementById("ans");
var start;
var end;
var constants = {
    "PI": 3.1415,
    "e": 2.7182
};
function append(val) {
    if (textbox != null) {
        textbox.focus();
        start = textbox.selectionStart;
        end = textbox.selectionEnd;
        textbox.setSelectionRange(start, end);
        var curvalue = textbox.value;
        textbox.value += val;
        var inserted = curvalue.substring(0, Number(start)) + val + curvalue.substring(Number(end));
        textbox.value = inserted;
        // Move the cursor to the end of the inserted value
        textbox.selectionStart = start + val.length;
        textbox.selectionEnd = start + val.length;
        end = textbox.selectionStart;
        str = inserted;
    }
}
;
function equal() {
    str = textbox.value;
    evalstr = str;
    evalstr = replaceAllOccurrences(evalstr, 'sin', 'Math.sin');
    evalstr = replaceAllOccurrences(evalstr, 'cos', 'Math.cos');
    evalstr = replaceAllOccurrences(evalstr, 'tan', 'Math.tan');
    evalstr = replaceAllOccurrences(evalstr, 'sqrt', 'Math.sqrt');
    evalstr = replaceAllOccurrences(evalstr, 'e', '2.7182');
    evalstr = replaceAllOccurrences(evalstr, 'PI', '3.1415');
    for (var a in constants) {
        var tostr = String(constants[a]);
        evalstr = replaceAllOccurrences(evalstr, a, tostr);
    }
    console.log(evalstr, str);
    try {
        var answer = eval(evalstr);
        answer = Number(answer).toFixed(4);
        ansbox.value = answer;
    }
    catch (e) {
        ansbox.value = "Invalid EXPRESSION";
    }
}
function clearscreen() {
    console.log("in clear");
    textbox.value = '';
    str = '';
    evalstr = '';
    ansbox.value = '';
}
function delindex() {
    var temp = str.slice(0, -1);
    str = temp;
    textbox.value = str;
}
function calsin() {
    evalstr = evalstr + "Math.sin(";
    append("sin(");
}
function calcos() {
    evalstr = evalstr + "Math.cos(";
    append("cos(");
}
function caltan() {
    evalstr = evalstr + "Math.tan(";
    append("tan(");
}
function calsqrt() {
    evalstr = evalstr + "Math.sqrt(";
    append("sqrt(");
}
function expo() {
    evalstr = evalstr + "**";
    append("^");
}
function replaceAllOccurrences(inputString, wordToReplace, newWord) {
    var regex = new RegExp('\\b' + wordToReplace + '\\b', 'gi');
    return inputString.replace(regex, newWord);
}
function cale() {
    evalstr = evalstr + "2.7182";
    append("e");
}
function calpi() {
    evalstr = evalstr + "3.1415";
    append("PI");
}
function addconst() {
    var name = prompt("enter variable name");
    addNewButton(name);
}
function addNewButton(btnname) {
    if (btnname === "") {
        alert("Invalid entry !! You did not enter the name");
    }
    else {
        if (exists(btnname)) {
            // if var exists
            alert("Variable name already exists");
        }
        else {
            var val = prompt("enter value of ".concat(btnname, " varibale"));
            var value = parseInt(val !== null && val !== void 0 ? val : '0');
            if (isNaN(value)) {
                alert("Error cannot assign value to the variable");
            }
            else {
                constants["".concat(btnname)] = value;
                var newButton_1 = document.createElement("button");
                // Set the button's attributes and properties
                newButton_1.textContent = btnname;
                newButton_1.id = btnname;
                newButton_1.className = "btn btn-primary";
                newButton_1.style.margin = "7px";
                // Append the button to the buttonContainer div
                var buttonContainer = document.getElementById("con");
                if (buttonContainer != null) {
                    newButton_1.onclick = function () {
                        append(newButton_1.id);
                        var conval;
                        for (var i in constants) {
                            if (i == newButton_1.id) {
                                conval = constants[i];
                            }
                        }
                        evalstr = evalstr + String(conval);
                        textbox.value = str;
                    };
                    buttonContainer.appendChild(newButton_1);
                }
            }
        }
        // Create a new button element
    }
}
function buttonClickHandler(event) {
    var clickedButton = event.target;
    var buttonId = clickedButton.id;
    return buttonId;
}
function exists(key) {
    var ret = false;
    for (var a in constants) {
        if (a === key) {
            ret = true;
            break;
        }
    }
    return ret;
}
