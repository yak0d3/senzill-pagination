/************************************************************/
/* senzill-pagination v1.0.0 Beta                          */
/* Coded by: yak0d3                                       */
/* Email: contact.raedyak@gmail.com                      */
/* Github: https://github.com/yak0d3/senzill-pagination */
/* Licence: MIT                                        */
/******************************************************/

(function($){
    $.fn.extend({
        
        senzill: function(options) {

            var defaults = {
                elPerPage: 4, //The number of elements to show per page
            }

            var options =  $.extend(defaults, options);

            this.destroy = function() //The destroy method
            {
                /* remove the navigation bar & unbind click events */
                $(this).removeClass('row');
                $('#senbar').remove();
                $('#senzill-styles').remove();
                $('#sen-next').unbind();
                $('#sen-previous').unbind();
                
              return;
            }
            return this.each(function() { /* Main Method */
                var me = $(this);
                var senbar_id_prefix = 0; //This is used to increment the id of the senbar in case of the usage of more than one senzill-pagination
                options.elPerPage = parseInt(options.elPerPage); //Get integer from string (i.e if elPerPage is " 2e" it will become 2), Read More about `parseInt` in here: https://bit.ly/2DJkDNb
                console.log('senzill-pagination plugin has been successfully loaded!\n');
                if(!$(this).hasClass('row')) { $(this).addClass('row'); } //Add the class `row` to the senzill-pagination container
                if(!$(this).hasClass('senzill-container')) { $(this).addClass('senzill-container'); }
                $('.senzill-container').css('display','block');
                
                var total_elems = $(this).children().length; //The total number of elements
                var current_page = 1; //The current page
                var start = 0; //From which page should senzill-pagination start, default 0 which is the first page
                var number_of_pages = (total_elems / options.elPerPage)  % 1 == 0 ?  (total_elems / options.elPerPage) :  (Math.ceil(total_elems / options.elPerPage)); //Calculation of the total number of pages
                var styles = '.sen-btn{ width:auto; } .sen-current{font-weight:700;font-size:1.3vw;}'; //Basic styling for the senzill-pagination buttons
                
                $('head').append('<style id="senzill-styles">'+styles+'</style>'); //Adding the styles to the <head> tag
                
                $(this).css('visibility','visible'); //Making the senzill-pagination container visible
                var senzsCount = function()
                {
                    if($('.sen-bar').length > 1){
                        senbar_id_prefix == $('.sen-bar').length;
                        console.log($('.sen-bar').length);
                    }
                    else{
                        return 0;
                    }
                };
                senzsCount();

                var paginate = function(start,end,elem = $(this)){ //The main paginate function that will let users navigate between pages
                    for(j = 0; j < elem.children().length ;j++){
                        elem.children().eq(j).slideUp().hide(500);
                    }
                    for(i = start; i < end ;i++){
                        elem.children().eq(i - 1).slideDown(500);;
                    }
                };
                var next = function(elem){ //This function will let the users go to the next page
                    start = start+options.elPerPage;
                    current_page++;
                    paginate(start,start + options.elPerPage,elem);
                    senbar_basic(number_of_pages,current_page,elem);
                };
                var prev = function(elem){ //This function will let the users go back to the previous page
                    start = (start-options.elPerPage);
                    current_page--;
                    paginate(start,(start+options.elPerPage),elem);
                    senbar_basic(number_of_pages,current_page,elem);
                };
                var senbar_basic = function(pages,current,elem = $(this)){ //Display the sen navigation bar, currently it only contains previous and next buttons.
                    if($('#'+senbar_id_prefix+'_sen-bar').length){$('#'+senbar_id_prefix+'_sen-bar').remove();} //This line needs to be updated into a better implementation
                                                                        //What it does is, removing the senbar each time a navigation button is clicked.
                    $('#'+senbar_id_prefix+'_sen-bar').css('position','relative');
                    var next_button = '<li class="list-inline-item"><button class="text-xs-center btn btn-primary sen-btn"  id="'+senbar_id_prefix+'_sen-next" href="#">Next</button></li>'; //Draw the next button
                    var prev_button = '<li class="list-inline-item"><button class="text-xs-center btn btn-primary sen-btn" id="'+senbar_id_prefix+'_sen-prev" href="#">Previous</button></li>'; //Draw the previous button
                    var pagination_bar = '<div class="row" class="sen-bar" id="'+senbar_id_prefix+'_sen-bar">' //Draw the senbar
                                            +'<div class="col-md-4 mx-auto">'
                                                +'<ul class="list-inline center">'
                                                    + prev_button
                                                    +'<li class="list-inline-item sen-current">'+ current +'</li>'
                                                    + next_button
                                                    +'</ul>'
                                            +'</div>'
                                        +'</div>';
                    $(pagination_bar).insertAfter(elem);
                    (current+1 > pages) ? $('#'+senbar_id_prefix+'_sen-next').addClass('disabled') : $('#'+senbar_id_prefix+'_sen-next').hasClass('disabled') ? $('#'+senbar_id_prefix+'_sen-next').removeClass('disabled') : '';
                    (current == 1) ? $('#'+senbar_id_prefix+'_sen-prev').addClass('disabled') : $('#'+senbar_id_prefix+'_sen-prev').hasClass('disabled') ? $('#'+senbar_id_prefix+'_sen-prev').removeClass('disabled') : '';
                    $('#'+senbar_id_prefix+'_sen-next').on('click',function(){
                        if(current + 1 <= pages)
                            next(me); //Go to the next page
                    });
                    $('#'+senbar_id_prefix+'_sen-prev').on('click',function(){
                        if(current > 1 )
                            prev(me); //Go to the previous page
                    });
                };
                var numbered_senbar = function(){ //Senbar with numbers

                };
                var epp_Options = function(){ //Elements per page options

                }
                var image_tags = function(){ //Display image tags buttons to filter by

                };
                var image_preview = function(){ //Preview images by clicking on it

                };
                var sortData = function(){ //Sort data by setting an HTML5 data attribute, i.e. data-uploaded='11/18/2018' or data-name='New York Hassle Article'
                                            //In either cases senzill-pagination will figure out which way is better to sort the data (either; date, number or string)

                };
                var gridView = function(){

                };
                var listView = function(){

                };
                paginate(start,start + options.elPerPage,$(this)); //Start the senzill-pagination
                senbar_basic(number_of_pages,current_page,$(this)); //Draw the senbar

            });
         
        }
    });
})(jQuery);
