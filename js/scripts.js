//sets focus on load to the first input
$('#name').focus();
//hides the other occupation input
$('#other-title').hide();
//shows the other occupation when the other selection is picked in the #title menu
$('#title').on('change', function() {
    const value = $(this).val();
    if(value === 'other'){
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});
//selectColor is used below to show and set selected on the $secondTerm
//hides the colors in $firstTerm
const selectColor = ($firstTerm, $secondTerm) => {
    $firstTerm.hide();
    $secondTerm.show();
    $secondTerm.first().attr('selected','selected');
    $firstTerm.first().attr('selected',false);
};
//this fires when the men
$('#design').on('change', function() {
    const value = $(this).val();
    //selects color for each design
    const $jsPuns = $("#color option:contains('Puns')");
    const $heart = $("#color option:contains('(I')");
    //if design js puns is picked show the available colors with function selectColor
    if(value === 'js puns'){
        selectColor($heart, $jsPuns);

    } else if(value ==='heart js'){
        selectColor($jsPuns, $heart);
    }
});
//total for sumation of cost of checkbox items
let total = 0;
//disableProc disables an item and crosses out its text content
const disableProc = (item) => {
    const $element = $(`input[name=${item}]`);
    $element.attr('disabled', true);
    $element.parent().css('text-decoration', 'line-through');
}
//enableProc takes disable away from element and takes the text-decoration off of the text content
const enableProc = (item) => {
    const $element = $(`input[name=${item}]`);
    $element.attr('disabled', false);
    $element.parent().css('text-decoration', 'none');
}
//this part fires when a checkbox is clicked and then crosses out conflicting entries
//total is updated here as well.
$('input:checkbox').on('change', function(e){
    const cost = (parseInt($(this).parent().text().slice(-3)));
    //this fires when clicked
    if(this.checked){
        total += cost;
        switch(this.name){
            case "js-frameworks":
                disableProc("express");
                break;
            case "js-libs":
                disableProc("node");
                break;
            case "express":
                disableProc("js-frameworks");
                break;
            case "node":
                disableProc("js-libs");
                break;
        }
        //this fires when unclicked
    } else {
        total -= cost;
        switch (this.name) {
            case "js-frameworks":
                enableProc("express");
                break;
            case "js-libs":
                enableProc("node");
                break;
            case "express":
                enableProc("js-frameworks");
                break;
            case "node":
                enableProc("js-libs");
                break;

        }
    }
    const $totalPrint = $('<h3 class="total">Total: $'+ total +'</h3>');
    //if a privious total element exists, remove it so it can be updated
    if($('.total').length) {
        $('.total').remove();
    }
    //append the total
    $('.activities').append($totalPrint);
});
//this disables the select option in the payment field
$('option[value="select_method"]').attr('disabled',true);
//this sets the defaults. hide all the payment elements
$('#credit-card').hide();
$('div').last().hide();
$('div').last().prev().hide();
//when a payment version is selected, make all relevant elements visible
$('#payment').on('change', function() {
    const value = $(this).val();
    if(value === 'credit card'){
        $('#credit-card').show();
        $('div').last().hide();
        $('div').last().prev().hide();
    } else if(value === 'paypal'){
        $('#credit-card').hide();
        $('div').last().hide();
        $('div').last().prev().show();
    } else if(value == 'bitcoin'){
        $('#credit-card').hide();
        $('div').last().show();
        $('div').last().prev().hide();
    }
});
//got this from https://stackoverflow.com/questions/2507030/email-validation-using-jquery I SUCK at regex! Sorry...
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
//this makes an error message to use later
const messageBad = (type) => {
    return $(`<span class="bad-text" id="${type}-bad-mess">Invalid ${type}</span>`);
};
// here the error messages are appended
$('#mail').prev().append(messageBad("e-mail"));
$('#name').prev().append(messageBad("name"));
//this error message didn't wasn't made with the function above because it is different from the rest
const $checkBadMess = $('<span class="bad-text" id="check-bad-mess">Please select a checkbox</span>')
$('.activities').prepend($checkBadMess);
//hide the error elements
$('#e-mail-bad-mess').hide();
$('#name-bad-mess').hide();
$('#check-bad-mess').hide();
//this is for the instant checking of email
$('#mail').on('keyup', function(){
    //on keyup check email value and test it
   if(!isEmail($('#mail').val())){
       //if not valid the error and css classes are shown
       $('#mail').attr('class', 'bad-valid');
       $('#e-mail-bad-mess').show();
    } else {
       //if a valid email then css removed and the error message is removed
        $('#mail').attr('class', false);
        $('#e-mail-bad-mess').hide();
    }
});
//submit button handler
$('button[type="submit"]').on('click', function(e){
    //stops the page from refreshing when submitted
    e.preventDefault();
    //checks email validation at button pressing time, same logic as above
   if(!isEmail($('#mail').val())){
       $('#mail').attr('class', 'bad-valid');
       $('#e-mail-bad-mess').show();
   } else {
       $('#mail').attr('class', false);
       $('#e-mail-bad-mess').hide();
   }
   //checks to see if the name input is empty and shows error and sets css
   if($('#name').val() == ''){
       $('#name').attr('class', 'bad-valid');
       $('#name-bad-mess').show()

   } else {
       $('#name').attr('class', false);
       $('#name-bad-mess').hide();
   }
   //flag showing if any of the checkboxes tested below are checked
    let checkFlag = false;
   //testing all checkboxes to ckecked status
    $('input:checkbox').each(function(){
        if(this.checked){
            checkFlag = true;
        }
    });
    if(!checkFlag){
        //show error if no checkboxes are checked
        $('#check-bad-mess').show();
    } else {
        //hides error if at least one item is checked
        $('#check-bad-mess').hide();
    }
});