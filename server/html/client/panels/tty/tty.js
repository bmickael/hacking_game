'use strict';

var TTY = function(keyboard) {
	var tty = document.getElementById("js_tty");
	tty.innerHTML = "";

	var divTest = document.createElement("div");
	tty.appendChild(divTest);
	var innerTest = document.createElement("X");
	innerTest.innerHTML = "b";
	divTest.appendChild(innerTest);
	var CHAR_HEIGHT = divTest.offsetHeight;
	var CHAR_WIDTH = innerTest.offsetWidth;
	console.log("height: " + CHAR_HEIGHT + " width: " + CHAR_WIDTH);
	tty.removeChild(tty.firstChild);

	/*
	 * Active mouse scroll on PC
	 */
	tty.addEventListener(mousewheelevt, function (e) {
		var e = window.event || e; // old IE support
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		tty.scrollTop -= delta * 20;
		putCursor(visibleCursorPosition);
	}, false);

	/*
	 * Passive scroll on mobile
	 */
	if (IS_MOBILE == true) {
		tty.addEventListener('scroll', function(e) {
			putCursor(visibleCursorPosition);
		}, false);
	}

	var block_key = false;
	this.key_cb = function(val)
	{
		block_key = (val == true) ? false : true;
		console.log("key cb");
	}

	const space_expr = "&nbsp;";
	const space_regex = /&nbsp;/g;

	var inputHistory = new Array();
	var historyIdx;

	var inputString;
	var inputDiv;
	var cursorPosition;
	var systemInputMsg;

	var isChrome = !!window.chrome && !!window.chrome.webstore;

	var LETTERSIZE = CHAR_WIDTH;
	var NBLETTERPERLINE = 0;

	var setLetterField = function()
	{
		/*
		 * Simulation of caracter insersion until a new line is required
		 */
		let divTest = document.createElement("div");
		tty.appendChild(divTest);
		divTest.innerHTML = "x";
		NBLETTERPERLINE = 0;
		let originalHeight = divTest.offsetHeight;
		if (originalHeight == 0 || originalHeight === undefined) {
			console.warn("Cannot measure offsetHeight");
			tty.removeChild(tty.lastChild);
			return;
		}
		while (divTest.offsetHeight == originalHeight) {
			divTest.innerHTML += "x";
			NBLETTERPERLINE += 1;
		}
		tty.removeChild(tty.lastChild);

		console.log("nb letter per line: ", NBLETTERPERLINE);
	}
	setLetterField();

	/*
	 * visible len and cursor position, avoid exeption of &nbsp;
	 */
	var visibleCursorPosition;
	var visibleStringLen;

	/*
	 * current directory, utilized by prompt
	 */
	var directory;

	var putCursor = function (position) {
		var div_origin_y = inputDiv.getBoundingClientRect().top;
		var div_origin_x = inputDiv.offsetLeft;
		var div_width = inputDiv.offsetWidth;

		/*
		 * Mitigation with innerHeight
		 */
		div_origin_y += tty.scrollHeight - tty.clientHeight - tty.scrollTop;

		var x_pixel = position % NBLETTERPERLINE * LETTERSIZE;
		var y_pixel = Math.trunc(position / NBLETTERPERLINE) * CHAR_HEIGHT;

		cursor.style.left = div_origin_x + x_pixel + "px";
		cursor.style.top = div_origin_y + y_pixel + "px";

		console.log("new visible cur position: " + position);
	}

	var createNewInputString = function (prompt, optionalStr) {
		systemInputMsg = prompt;
		inputString = systemInputMsg;
		if (optionalStr)
			inputString += optionalStr;
		cursorPosition = inputString.length;
		inputDiv = document.createElement('div');

		visibleCursorPosition = inputString.replace(space_regex, " ").length;
		visibleStringLen = visibleCursorPosition;

		if ((visibleStringLen % NBLETTERPERLINE == 0) &&
			(visibleCursorPosition % NBLETTERPERLINE == 0) &&
			visibleStringLen == visibleCursorPosition)
			inputDiv.innerHTML = inputString + space_expr;
		else
			inputDiv.innerHTML = inputString;

		tty.appendChild(inputDiv);

		tty.scrollTop += 10000;
		putCursor(visibleCursorPosition);
	}

	this.write = function(str)
	{
		createNewInputString(str);
	}

	var createDiv = function (content) {
		var outputDiv = document.createElement('div');
		outputDiv.innerHTML = content;

		tty.appendChild(outputDiv);
		tty.scrollTop += 10000;
	}

	var refreshInput = function (inputDiv, optionalStr) {
		tty.removeChild(inputDiv);
		if (optionalStr)
			inputDiv.innerHTML = inputString + optionalStr;
		else
			inputDiv.innerHTML = inputString;

		tty.appendChild(inputDiv);

		tty.scrollTop += 10000;
	}

	function removeCharacters(str, char_pos, len) {
		var part1 = str.substring(0, char_pos);
		var part2 = str.substring(char_pos + len, str.length);
		return part1 + part2;
	}

	function updateCharString(key) {
		if (key.length == 1) {
			var part1 = inputString.substring(0, cursorPosition);
			console.log("part_1: '" + part1 + "'");

			var part2 = inputString.substring(cursorPosition, inputString.length);
			console.log("part_2: '" + part2 + "'");

			if (key == " ") {
				key = space_expr;
				cursorPosition += space_expr.length;
			} else {
				cursorPosition += 1;
			}
			visibleCursorPosition += 1;
			visibleStringLen += 1;

			inputString = part1 + key + part2;

			if ((visibleStringLen % NBLETTERPERLINE == 0) &&
				(visibleCursorPosition % NBLETTERPERLINE == 0) &&
				visibleStringLen == visibleCursorPosition)
				refreshInput(inputDiv, space_expr);
			else
				refreshInput(inputDiv);
			putCursor(visibleCursorPosition);

			historyIdx = inputHistory.length;
		}

		switch (key) {
			case "Backspace":
				if (cursorPosition != systemInputMsg.length) {
					var idx = inputString.substring(0, cursorPosition).lastIndexOf(space_expr);
					var len;
					if (cursorPosition - idx == space_expr.length)
						len = space_expr.length;
					else
						len = 1;
					cursorPosition -= len;

					visibleCursorPosition -= 1;
					visibleStringLen -= 1;

					inputString = removeCharacters(inputString, cursorPosition, len);

					if ((visibleStringLen % NBLETTERPERLINE == 0) &&
						(visibleCursorPosition % NBLETTERPERLINE == 0) &&
						visibleStringLen == visibleCursorPosition)
						refreshInput(inputDiv, space_expr);
					else
						refreshInput(inputDiv);
					putCursor(visibleCursorPosition);

					historyIdx = inputHistory.length;
				} else {
					refreshInput(inputDiv);
				}
				break;
			case "Enter":
				process(inputString.slice(systemInputMsg.length));
				break;
			case "ArrowRight":
				if (cursorPosition < inputString.length) {
					var idx = inputString.substring(cursorPosition, inputString.length).indexOf(space_expr);
					if (idx == 0)
						cursorPosition += space_expr.length;
					else
						cursorPosition += 1;

					visibleCursorPosition += 1;
					putCursor(visibleCursorPosition);

					historyIdx = inputHistory.length;
				}
				break;
			case "ArrowLeft":
				if (cursorPosition != systemInputMsg.length) {
					var idx = inputString.substring(0, cursorPosition).lastIndexOf(space_expr);
					if (cursorPosition - idx == space_expr.length)
						cursorPosition -= space_expr.length;
					else
						cursorPosition -= 1;

					visibleCursorPosition -= 1;
					putCursor(visibleCursorPosition);

					historyIdx = inputHistory.length;
				}
				break;
			case "ArrowUp":
				if (sequence != sequence_enum.running)
					break;
				if (historyIdx != 0) {
					tty.removeChild(inputDiv);
					historyIdx -= 1;
					createNewInputString(login + "@" + server_name + ":" + directory + "#" + space_expr, inputHistory[historyIdx]);

					console.log("new history index: ", historyIdx);
				}

				break;
			case "ArrowDown":
				if (sequence != sequence_enum.running)
					break;
				if (historyIdx != inputHistory.length) {
					tty.removeChild(inputDiv);
					historyIdx += 1;
					createNewInputString(login + "@" + server_name + ":" + directory + "#" + space_expr, inputHistory[historyIdx]);

					console.log("new history index: ", historyIdx);
				}
				break;
			default:
				break;
		}

		console.log("key: " + key + " position: " + cursorPosition + " realLen: " + visibleStringLen);
	};

	const sequence_enum = {
		"auth_login": 0,
		"auth_password": 1,
		"running": 2,
		"auth_login_ssh": 3,
		"auth_password_ssh": 4
	}
	var sequence = sequence_enum.auth_login;

	this.onmessage = function(data) {
		if (data.directory)
			directory = data.directory;
		if (data.login)
			login = data.login;
		if (data.server)
			server_name = data.server;
		switch (sequence) {
			case sequence_enum.auth_password:
				if (data.auth == 1) {
					sequence = sequence_enum.running;
					createDiv("<br>");
					createDiv("Welcome to " + server_name + " Mr " + login);
					createDiv("<br>");
					createNewInputString(login + "@" + server_name + ":" + directory + "#" + space_expr);
				} else {
					sequence = sequence_enum.auth_login;
					createDiv("<br>");
					createNewInputString("Login:" + space_expr);
				}
				break;
			case sequence_enum.running:
				if (data.auth_ssh == 1) {
					sequence = sequence_enum.auth_login_ssh;
					createNewInputString("SSH login:" + space_expr);
					break;
				}
				if (data.string)
					createDiv(data.string);

				historyIdx = inputHistory.length;
				createNewInputString(login + "@" + server_name + ":" + directory + "#" + space_expr);
				break;
			default:
				console.warn("Unknown sequence");
				break;
		}
		}

	var login;
	var server_name = "";
	var ssh_login;

	var process = function (outStr) {
		var outStrPostProcessed = outStr.replace(space_regex, " ");

		switch (sequence) {
			case sequence_enum.auth_login:
				login = outStrPostProcessed;
				sequence = sequence_enum.auth_password;
				createNewInputString("Password:" + space_expr);
				break;
			case sequence_enum.auth_password:
				socket.send(JSON.stringify({"login": login, "password": outStrPostProcessed}));
				break;
			case sequence_enum.running:
				if (outStrPostProcessed.trim().length == 0) {
					historyIdx = inputHistory.length;
					createNewInputString(systemInputMsg);
					return;
				}

				if (inputHistory.length == 0 ||
					inputHistory[inputHistory.length - 1] != outStr)
					inputHistory.push(outStr);

				socket.send(JSON.stringify({"command": outStrPostProcessed}));
				break;
			case sequence_enum.auth_login_ssh:
				ssh_login = outStrPostProcessed;
				sequence = sequence_enum.auth_password_ssh;
				createNewInputString("Password:" + space_expr);
				break;
			case sequence_enum.auth_password_ssh:
				socket.send(JSON.stringify({"login":ssh_login, "password":outStrPostProcessed}));
				sequence = sequence_enum.running;
				break;
			default:
				console.warn("Unknown sequence");
				break;
		}
	}

	/*
	 * Calculate from font-size 20px.
	 * DIV width must be multiple of 12
	 */
	var cursor = document.createElement('canvas');
	cursor.id = "cursor";
	cursor.style.height = CHAR_HEIGHT + "px";
	cursor.style.width = CHAR_WIDTH + "px";

	this.displayCursor = function(actif) {
			if (actif == true) {
				putCursor(visibleCursorPosition);
				cursor.style.display = "block";
			} else {
				cursor.style.display = "none";
			}
	}

	historyIdx = 0;
	createNewInputString("login:" + space_expr);
	cursor.getContext('2d');
	document.body.appendChild(cursor);

	if(IS_MOBILE == true) {
		console.log("Mobile TTY");

		var isKeyboardActive = false;

		tty.addEventListener("mousedown", function(e){
			if (isKeyboardActive == true) {
				tty.style.height =  "calc(var(--vh, 1vh) * " + 90 + ")";
				tty.scrollTop += 10000;
				keyboard.close();
				isKeyboardActive = false;
				return;
			}
			tty.style.height =  "calc(var(--vh, 1vh) * " + 50 + ")";
			tty.scrollTop += 10000;
			keyboard.open(updateCharString);
			isKeyboardActive = true;
		}, false);

		window.addEventListener("resize", function() {
			console.log("resize");
			tty.scrollTop += 10000;
			setLetterField();
			putCursor(visibleCursorPosition);
		});
	} else {
		console.log("Browser TTY");

		document.addEventListener("keydown", function(event) {
			let key = event.key;

			if (block_key == true)
				return;

			/*
			 * Prevent the quick search feature on Firefox triggered by /
			 */
			if (key == "/") {
				event.stopPropagation();
				event.preventDefault();
			}

			if (key == "Backspace") {
				event.stopPropagation();
				event.preventDefault();
			}

			updateCharString(key);
		});

		window.addEventListener("resize", function() {
			tty.scrollTop += 10000;
			setLetterField();
			putCursor(visibleCursorPosition);
		});
	}
}