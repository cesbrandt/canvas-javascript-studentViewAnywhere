// ==UserScript==
// @name          Canvas "Student View" Anywhere
// @description   Adds a "Student View" button to all activity pages in a course (except the "Files" page)
// @include       /^https?:\/\/[^\.]*\.([^\.]*\.)?instructure\.com\/courses\/\d+.*$/
// @exclude       /^https?:\/\/[^\.]*\.([^\.]*\.)?instructure\.com\/((courses|users)\/\d+\/)?files.*$/
// @version       1.1
// @updateURL     https://raw.githubusercontent.com/cesbrandt/canvas-javascript-studentViewAnywhere/master/studentViewAnywhere.user.js
// ==/UserScript==

/**
 * Don't run in frames
 */
if(window.top !== window.self) {
	return;
}

/**
 * @name          Build Variable Object
 * @description   Creates an object of GET variables and their values from a supplied URL
 * @return obj    Object of GET variables and their values
 */
String.prototype.buildVarObj = function() {
	var varObj = {};
	var vars = this.split('?');
	if(vars.length > 1) {
		vars = vars[1].split('&');
		for(var i in vars) {
			vars[i] = vars[i].split('=');
			varObj[vars[i][0]] = vars[i][1];
		}
	}
	return varObj;
};

/**
 * Variable setup
 */
var url = window.location.href;

var leveledURL = url.split('/');
var view = url.match(/\.com\/?$/) ? 'dashboard' : leveledURL[3];
view = view.match(/^\?/) ? 'dashboard' : view;
var viewID = (view !== 'dashboard' && typeof leveledURL[4] !== 'undefined') ? leveledURL[4] : null;
var subview = (viewID !== null && typeof leveledURL[5] !== 'undefined') ? leveledURL[5].split('#')[0] : null;
var GETS = url.buildVarObj();

window.onload = function() {
	// Validate rendering the universal button based on the variables
	var settingsButton = document.querySelector('.ic-app-course-menu nav #section-tabs li.section a[title="Settings"]');
	var studentViewBar = document.querySelector('.ic-alert-masquerade-student-view');
	if(ENV['current_user_roles'].includes('teacher') && (settingsButton !== null && settingsButton !== undefined && settingsButton.offsetHeight > 0) && !(studentViewBar !== null && studentViewBar !== undefined && studentViewBar.offsetHeight > 0)) {
		var studentViewButton = document.createElement('a');
		studentViewButton.className = 'btn button-sidebar-wide quick-access';
		studentViewButton.style.cursor = 'pointer';
		studentViewButton.innerHTML = '<i class="icon-student-view" role="presentation"></i> Launch Student View';
		studentViewButton.addEventListener('click', function(e) {
			e.preventDefault();
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/' + view + '/' + viewID + '/student_view');
			xhr.setRequestHeader('X-CSRF-Token', decodeURIComponent(document.cookie.match('(^|;) *_csrf_token=([^;]*)')[2]));
			xhr.onload = function() {
				if(xhr.status != 200) {
				} else {
					window.location = window.location.href;
				}
			};
			xhr.send();
		});
		document.querySelector('.ic-app-nav-toggle-and-crumbs.no-print').appendChild(studentViewButton);
	} else if(subview == 'student_view' && GETS.redirectURL !== undefined) {
		window.location = GETS.redirectURL;
	}
};
