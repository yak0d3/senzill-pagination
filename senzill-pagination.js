/************************************************************/
/* senzill-pagination v2.1.0                               */
/* Author: yak0d3 <contact.raedyak@gmail.com>             */
/* Github: https://github.com/yak0d3/senzill-pagination  */
/* Licence: MIT                                         */
/******************************************************/
(function ($) {
    $.fn.extend({

        senzill: function (settings) {

            var defaults = {
                elPerPage: 4, //The number of elements to show per page
                nav: null,
                panel: null,
                nums: true,
                showOptions: [5, 10, 15, 20, 30]
            }

            var settings = $.extend({}, defaults, settings);

            if ($(settings.nav) == undefined) {
                throw new Error('navBar proprety is missing: a navbar container id has not been specified.');
            } else if ($(settings.panel) === undefined) {
                throw new Error('panel proprety is missing: a panel container id has not been specified.');
            }

            var self = this;
            var $element = $(self);
            var elPerPage = settings.elPerPage;
            var $nav = $(settings.nav);
            var elems = $element.children();
            var elemsCount = elems.length;
            var currentPage = 0;
            var totalPages = Math.ceil(elemsCount / elPerPage);
            var numbered = settings.nums;
            var _panel = (settings.panel != null) ? settings.panel : false;
            var showOptions = settings.showOptions;
            var items = elems;

            var navbar = function (current, showPerPage, total) {
                $nav.empty();

                var $bar = $nav.append('<ul/>', {
                    class: 'list-inline',
                    id: 'sen-bar'
                });

                $bar.css({

                });
                var $liPrev = $('<li/>', {
                    class: 'list-inline-item text-center',
                }).appendTo($bar);
                var $liCurrent = $('<li/>', {
                    class: 'list-inline-item text-center',
                }).appendTo($bar);
                var $liNext = $('<li/>', {
                    class: 'list-inline-item text-center',
                }).appendTo($bar);

                $("<button/>", {
                    'class': 'btn btn-primary btn-sm senbtn',
                    text: 'Next >',
                    id: 'sen-next',
                }).appendTo($liNext);
                $("<span/>", {
                    'class': 'btn btn-sm senbtn ',
                    text: current + 1,
                    id: 'sen-current',
                    disabled: true
                }).appendTo($liCurrent);
                $("<button/>", {
                    'class': 'btn btn-primary btn-sm senbtn',
                    text: '< Prev.',
                    id: 'sen-prev',
                }).appendTo($liPrev);

                var $info = $('<div/>', {
                    class: 'text-center text-primary',
                    id: 'sen-info'
                });
                $info.prependTo($nav);
                var to = ((current * showPerPage) + showPerPage) > total ? total : (current * showPerPage) + showPerPage;
                var text = total == 0 ? 'No results were found.' : 'Showing ' + ((current * elPerPage) + 1) + ' to ' + to +
                    ' of ' + total + ' entries';
                var $infoText = $('<span/>', {
                    text: text
                });
                $infoText.appendTo($info);
                $nav.wrapAll('<center/>');
            };
            var numberedNav = function (current, pages) {

                if (current > 0) {
                    $senFirst = $("<span/>", {
                        'class': 'btn btn-sm senbtn btn-info  numBtn',
                        'text': '<<',
                        'data-senpage': 0,
                        'id': 'sen-first',
                        'disabled': true
                    }).appendTo('<li/>', {
                        'class': 'list-inline-item text-center'
                    }).insertBefore('#sen-prev');
                }
                if (current < pages - 1) {
                    $("<span/>", {
                        'class': 'btn btn-sm senbtn btn-info  numBtn',
                        'text': '>>',
                        'data-senpage': pages - 1,
                        'id': 'sen-last',
                        'disabled': true
                    }).appendTo('<li/>', {
                        'class': 'list-inline-item text-center'
                    }).insertAfter('#sen-next').css({

                    });
                }
                if (current > 1) {
                    for (var i = current; i > current - 2; i--) {
                        if (i == 1) {
                            continue;
                        }
                        $("<span/>", {
                            'class': 'btn btn-sm senbtn numBtn',
                            'text': i,
                            'data-senpage': i - 1,
                        }).appendTo('<li/>', {
                            'class': 'list-inline-item text-center'
                        }).insertAfter('#sen-prev');
                    }
                }
                if (current < pages - 2) {
                    for (var i = current; i < current + 2; i++) {
                        if (i == pages - 1) {
                            continue;
                        }
                        $("<span/>", {
                            'class': 'btn btn-sm senbtn numBtn',
                            'text': i + 2,
                            'data-senpage': i + 1,
                        }).appendTo('<li/>', {
                            'class': 'list-inline-item text-center'
                        }).insertBefore('#sen-next');
                    }
                }
            };

            var paginate = function (current, showPerPage, elements) {
                var total = elements.length;
                var pages = Math.ceil(total / showPerPage);
                elems.hide();
                for (var i = current * showPerPage; i < (current * showPerPage) + showPerPage; i++) {
                    $(elements[i]).fadeIn();
                }
                navbar(current, showPerPage, total); //Show the bottom navbar
                if (numbered) {
                    numberedNav(current, pages); //Show the numbered navbar
                }
                if (current == pages - 1 || pages == 0) {
                    $('#sen-next').attr('disabled', true);
                } else {
                    $('#sen-next').attr('disabled', false);
                }
                if (current - 1 < 0 || pages == 0) {
                    $('#sen-prev').attr('disabled', true);
                } else {
                    $('#sen-prev').attr('disabled', false);
                }
                $('#sen-next, #sen-prev, #sen-select, #sen-searchBox, .numBtn').off();
                $('#sen-next').on('click', function () {
                    currentPage = next(currentPage);
                    paginate(currentPage, elPerPage, items);
                });
                $('#sen-prev').on('click', function () {
                    currentPage = prev(currentPage);
                    paginate(currentPage, elPerPage, items);
                });
                $('#sen-select').on('change', function () {
                    var selected = $(this).find(":selected").data('elem-count');
                    self.elemLimit(selected);
                    currentPage = 0;
                    paginate(currentPage, elPerPage, items);
                });
                var doneTypingInterval = 1000;
                var typingTimer;
                $('#sen-searchBox').on('keyup').on('input', function () {
                    clearTimeout(typingTimer);
                    var value = $(this).val();
                    if (value.length > 0) {

                        var filter = elems.filter(function () {
                            return $(this).text().indexOf(value) > -1;
                        });
                        typingTimer = setTimeout(function () {
                            currentPage = 0;
                            items = filter;
                            paginate(currentPage, elPerPage, items);
                        }, doneTypingInterval);

                        $(this).val(value);
                    } else {
                        currentPage = 0;
                        items = elems;
                        paginate(currentPage, elPerPage, items);
                    }
                });
                $('.numBtn').on('click', function () {
                    currentPage = setPage($(this).data('senpage'));
                    paginate(currentPage, elPerPage, items);
                });
                loadStyles(); //Load the styles
            };
            var next = function (current) {
                current++;
                $('#sen-current').text((current + 1).toString());
                return current;
            };
            var prev = function (current) {
                current--;
                $('#sen-current').text((current + 1).toString());
                return current;
            };
            var setPage = function (pageNum) {
                $('#sen-current').text(pageNum);
                return pageNum;
            };
            var panel = function (panel) {
                $panel = $(panel);
                $panel.empty();
                var $entries = $('<form/>', {
                    class: 'float-left',
                    id: 'sen-select-fg'
                });
                var $text_show = $('<span/>', {
                    text: 'Show',
                });
                var $text_entries = $('<span/>', {
                    text: 'entries',
                });
                var $select = $('<select/>', {
                    class: 'ml-1 mr-1',
                    id: 'sen-select'
                });

                $entries.appendTo($panel);
                $select.appendTo($entries);
                $text_show.prependTo($entries);
                $text_entries.appendTo($entries);
                $.each(showOptions, function (key, val) {
                    $('<option/>', {
                        'class': 'sen-select-option',
                        'data-elem-count': val,
                        'selected': (elPerPage == val) ? true : false
                    }).appendTo($select).text(val);
                });


                var $searchBox = $('<input/>', {
                    type: 'text',
                    'id': 'sen-searchBox'
                })
                var $searchLabel = $('<label/>', {
                    for: '#sen-searchBox',
                    class: 'mr-1',
                    text: 'Search'
                })
                var $searchBoxDiv = $('<div/>', {
                    class: 'float-right',
                    id: 'sen-search'
                });

                $searchBoxDiv.append([$searchLabel, $searchBox]);

                $searchBoxDiv.appendTo($panel);


            };

            var loadStyles = function () {
                $('#sen-current').css({
                    'background-color': '#8d8c8c',
                    'font-weight': '800',
                    'font-size': '.75rem'
                });
            };

            this.destroy = function () {
                $('#sen-next, #sen-prev, #sen-select, #sen-searchBox, .numBtn').off();
                $(settings.nav).empty();
                $(settings.panel).empty();

                return;
            }

            this.reload = function () {
                this.destroy();
                start();
            };

            this.update = function () {
                start();
            };

            this.setPage = function (pageNumber) {
                if (pageNumber - 1 > totalPages) {
                    throw new Error('Page number cannot be bigger than the total number of pages');
                }

                currentPage = pageNumber - 1;
                $('#sen-current').text(currentPage);
                paginate(currentPage, elPerPage, items);
            };

            this.getPage = function () {
                return currentPage + 1;
            };


            this.elemLimit = function (num) {
                elPerPage = num;
                totalPages = Math.ceil(items.length / elPerPage);
            };

            var start = function () {

                if ($.inArray(elPerPage, showOptions) == -1) {
                    showOptions.push(elPerPage);
                }
                showOptions.sort(function (x, y) {
                    return x - y;
                });

                if (_panel != false) {
                    panel(_panel);
                }

                currentPage = 0;
                paginate(currentPage, elPerPage, items);
            };

            return this.each(start);

        }
    });
})(jQuery);
