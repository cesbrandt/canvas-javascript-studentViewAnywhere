# canvas-javascript-studentViewAnywhere
Userscript designed to add a "Student View" button anywhere in a course.

#### Table of Contents
- [Credits](#credits)
- [Changelog](#changelog)
- [Dependencies](#dependencies)
- [How-To Use](#how-to-use)

#### Credits
The original JavaScript was published by [Mark Garcia](https://community.canvaslms.com/people/msgarcia) to the [Canvas community](https://community.canvaslms.com/groups/canvas-developers/blog/2017/04/20/universal-student-view-button-for-teachers). This userscript is a modification of his code, so if you like it please give Mark a like for the original code.

#### Changelog
06/24/2019
- Condensed the original code
- Coverted to userscript format
- Removed redundant code (i.e., the `isCourse` is validated via userscript header)
- Modified anchor to use XHR with a "refresh" upon success to maintain location within course when using

#### Dependencies
- Userscript Manager
  - [Tampermonkey (Chrome)](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
  - [Tampermonkey (Firefox)](https://addons.mozilla.org/en-us/firefox/addon/tampermonkey/)
  - [Greasemonkey (Firefox)](https://addons.mozilla.org/en-us/firefox/addon/greasemonkey/)

#### How-To Use
1. Load the userscript to your Userscript Manager of choice
2. Enable the userscript
3. Find the "Student View" button on every page in a Canvas course
