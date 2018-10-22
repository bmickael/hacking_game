'use strict';

var RIGHT_PANEL = function() {
	var originalHeight = window.innerHeight;
	var right_panel = document.getElementById("right_panel");
	var tty = document.getElementById("js_tty");
	var mail = document.getElementById("mail");
	var browser = document.getElementById("browser");
	var social = document.getElementById("phone");
	var diary = document.getElementById("diary");
	var tabUl = document.getElementById("tabUl");
	var isLogged = false;

	function changeScreen(button, target) {
		var i, tabcontent, tablinks;

		if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i))
		{
			right_panel.style.height = "100vh";
		}

		/*
		 * Get all elements with class="tabcontent" and hide them
		 */
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		/*
		 * Get all elements with class="tablinks" and remove the class "active"
		 */
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].classList.remove("active");
		}

		/*
		 * Show the current tab, and add an "active" class to the button that opened the tab
		 */
		document.getElementById(target).style.display = "block";
		button.classList.add("active");
		console.log(button);

		button.classList.remove("notif");
	}

	mail_btn.addEventListener("mousedown", function (){
		changeScreen(this, "mail");
	});

	browser_btn.addEventListener("mousedown", function () {
		changeScreen(this, "browser");
	});

	social_btn.addEventListener("mousedown", function (){
		changeScreen(this, "social");
	});

	diary_btn.addEventListener("mousedown", function () {
		changeScreen(this, "diary");
	});

	this.notif_button_cb = function(str, state, force) {
		switch (str) {
		case "diary":
			if (diary_btn.classList.contains("active") == false || force == true) {
				if (state == true)
					diary_btn.classList.add("notif");
				else
					diary_btn.classList.remove("notif");
			}
			break;
		case "social":
			if (social_btn.classList.contains("active") == false || force == true) {
				if (state == true)
					social_btn.classList.add("notif");
				else
					social_btn.classList.remove("notif");
			}
			break;
		case "mail":
			if (mail_btn.classList.contains("active") == false || force == true) {
				if (state == true)
					mail_btn.classList.add("notif");
				else
					mail_btn.classList.remove("notif");
			}
			break;
		default:
			console.warn("unexpected default case");
			break;
		}
	}
	changeScreen(diary_btn, "diary");

	this.resizeCircles = function()
	{
		if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i))
		{
			if (window.innerHeight < originalHeight)
			{
				tty.style.height =  "calc(var(--vh, 1vh) * 100)";
				tty.scrollTop += 40000;

			}
			else
			{
				tty.style.height = "100vh";
				document.getElementById("tty_input").blur();
			}

		}
		for (var i = 0; i < tabUl.children.length; i++) {
			tabUl.children[i].style.height = tabUl.children[i].offsetWidth + "px";
		}
	};

	if( navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i))
	{
		tabUl.addEventListener("mousedown", function(event){
			if (tabUl !== event.target)
				return;
			right_panel.style.height = "10vh";
			var tabcontent = document.getElementsByClassName("tabcontent");
			for (var i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = "none";
			}

		});
	}
}
