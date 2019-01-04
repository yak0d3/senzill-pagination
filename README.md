## Senzill-Pagination

![](https://img.shields.io/badge/Language-Javascript-blue.svg) ![GitHub tag (latest SemVer pre-release)](https://img.shields.io/github/tag-pre/yak0d3/senzill-pagination.svg) ![](https://img.shields.io/npm/v/senzill-pagination.svg) [![](https://data.jsdelivr.com/v1/package/gh/yak0d3/senzill-pagination/badge)](https://www.jsdelivr.com/package/gh/yak0d3/senzill-pagination)



> An easy to integrate jQuery paginator.

### Installation

You can install *senzill-pagination* using one of the following methods:

* **Local**: Including the senzill-pagination file to your page's `<head/>` tag like so:

```html
<head>
	...
    <script src="jquery.js"></script>
	<script src="senzill-pagination.js"></script>
</head>
```

* **NPM**:

```bash
npm install --save senzill-pagination
```

* **jsDelivr CDN:**

```html
<head>
	...
    <script src="jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/yak0d3/senzill-pagination@2.0.0/senzill-pagination.js"></script>
</head>
```



### Usage

To start using *senzill-pagination* you have to follow simple steps to get your frontend pagination ready.

1. Add the panel's `<div/>` on top of your content's wrapper `<div id="sen-panel"></div>`

2. Add the navigation-bar's `</div>` under your content's wrapper `<div id="sen-nav"></div>`

3. Start the pagination with jQuery: 

   ```javascript
   $(function(){
       $('#wrapper_id').senzill({
          nav: '#sen-nav', //The navbar id
          panel: '#sen-panel', //The panel id
       });
   });
   ```

### Parameters

The table displayed below explains all of the available parameters.

| Parameter     | Required | Default             | Description                                                  |
| ------------- | -------- | ------------------- | ------------------------------------------------------------ |
| `elPerPage`   | No       | `4`                 | `[Integer]` The number of elements to display per page.      |
| `nav`         | Yes      | `null`              | `[String]` The navigation bar id.<br />***Note:*** *You have to create a div for the navbar and pass it as the* `nav` *parameter.* |
| `panel`       | No      | `null`              | `[String]` The panel id.<br />***Note:*** *You have to create a div for the panel and pass it as the* `panel` *parameter.* |
| `nums`        | No       | `true`              | `[Boolean]` Specifies whether to show a numbered navigation or not. |
| `showOptions` | No       | `[5, 10, 15, 20, 30]` | `[Array]` The options to display inside the panel's `<select/>` <br />***Note:*** *If the* `elPerPage` *value is not in this array, it will be added automatically.* |

### Methods

The following table describes the list of available methods.

| Method                  | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `elemLimit(int number)` | Sets the number of elements to display per page |
| `destroy()`             | Destroys the *senzill-pagination* instance.     |

### License

The MIT License. Copyright (c) 2018 [Raed Yak](https://github.com/yak0d3)
