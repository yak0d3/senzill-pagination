
# Senzill Pagination ![](https://img.shields.io/badge/Language-Javascript-blue.svg) ![GitHub tag (latest SemVer pre-release)](https://img.shields.io/github/tag-pre/yak0d3/senzill-pagination.svg) ![](https://img.shields.io/npm/v/senzill-pagination.svg)



> Senzill pagination is an easy-to-implement jQuery &amp; Bootstrap 4 Pagination plugin.

Usage
-
**Senzill pagination** plugin makes it easy to generate a jQuery pagination with a few easy steps:

 1. Add `style="visibility:hidden;"` to your elements' wrapper.
 2. Launch **senzill** pagination via jquery:
    ```
    $(document).ready(function(){
       $('#wrapper').senzill();
    });
    ```


Installation
-
 All you have to do is to include `senzill-pagination.js`  to your template's `<head>` tag.

1. **Local:**
   `<script  src="path_to/senzill-pagination.js"></script>`
  2. **CDN:**
		     `<script  src="https://cdn.jsdelivr.net/gh/yak0d3/senzill-pagination@1.0.0-beta/senzill-pagination.js"></script>`



Methods
-
| Method| Action| Parameters
| ------ | ------ | ------ |
| destroy |Destroy the senzill-pagination instance | None

Options
-
| Option| Default|
| ------ | ------ |
| elPerPage | 4

Prerequisites
-
 - jQuery
 - jQuery-ui
 - Bootstrap 4

To-do list
-
It is true that **Senzill** is easy to implement and quick to generate a jQuery pagination.But until now, **Senzill-Pagination** is a very basic tool and it still needs some modifications to become a cooler one than it already is.

I made a to-do list just for this matter, and it goes like this:

 - [ ] Responsive Columns
 - [x] Animations
 - [ ] Tags & Categories
 - [ ] Theme Customization
 - [ ] Custom Translations
 - [ ] BackEnd Requests Handling

If you think i am still missing something in the above to-do list, do not hesitate to submit a new pull request or reach me out @ contact.raedyak@gmail.com

License
-
![](https://i.imgur.com/g425Lau.png)
