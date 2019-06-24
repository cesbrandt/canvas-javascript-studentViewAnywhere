// ==UserScript==
// @name          Canvas Student View Anywhere
// @description   Adds the "Student View" button to all course pages
// @include       /^https?:\/\/[^\.]*\.([^\.]*\.)?instructure\.com\/courses\/.*$/
// @exclude       /^https?:\/\/[^\.]*\.quiz-lti-iad-prod.instructure\.com\/.*$/
// @version       1.0
// @updateURL     https://raw.githubusercontent.com/cesbrandt/canvas-javascript-studentViewAnywhere/master/studentViewAnywhere.user.js
// ==/UserScript==

(function () {
	// Validate rendering the universal button based on the variables
	if((ENV['current_user_roles'].includes('teacher') && $('.ic-app-course-menu.list-view nav #section-tabs li.section a[title="Settings"]').is(":visible")) && !$('.ic-alert-masquerade-student-view').is(':visible')) {
		$('.ic-app-nav-toggle-and-crumbs.no-print').append($('<a />').addClass('btn button-sidebar-wide quick-access').css({cursor: 'pointer'}).html('<i class="icon-student-view" role="presentation"></i> Launch Student View').click(function(e) {
			e.preventDefault();
			$.ajax({
				url: '/courses/' + window.location.href.split('courses/')[1].split('/')[0] + '/student_view',
				type: 'POST',
				success: function() {
					window.location = window.location.href;
				}
			});
		}));
	} else {
		$('.ic-app-nav-toggle-and-crumbs.no-print').remove('.btn.button-sidebar-wide.quick-access');
	}
})();
