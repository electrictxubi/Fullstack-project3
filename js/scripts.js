//sets focus on load to the first input
$('#name').focus();
//hides the other occupation input
$('#other-title').hide();
//this hides the color choices by default
$('#colors-js-puns').hide();
//shows the other occupation when the other selection is picked in the #title menu
$('div #title').on('change', function() {
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
    $('#colors-js-puns').show();
    $firstTerm.hide();
    $secondTerm.show();
    $secondTerm.first().attr('selected','selected');
    $firstTerm.first().attr('selected',false);
};
//this fires when the menu item for shirt designs are chosen
$('#design').on('change', function() {
    const value = $(this).val();
    //selects color for each design
    const $jsPuns = $("#color option:contains('Puns')");
    const $heart = $("#color option:contains('(I')");
    //if design js puns is picked show the available colors with function selectColor
    if(value === 'js puns'){
        selectColor($heart, $jsPuns);
    } else if(value ==='heart js') {
        selectColor($jsPuns, $heart);
    } else if(value === 'Select Theme'){
        $('#colors-js-puns').hide();
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
//this makes the credit card selection the default
$('option[value="credit card"]').attr('selected', true);
$('option[value="credit card"]').attr('class', 'selected');
//this sets the defaults. hide all the payment elements
$('#credit-card').show();
$('div').last().hide();
$('div').last().prev().hide();
//when a payment version is selected, make all relevant elements visible
$('#payment').on('change', function() {
    const value = $(this).val();
    //this clears any errors when changing selections
    $('#cc-num').attr('class','');
    $('#zip').attr('class','');
    $('#cvv').attr('class','');
    $('.bad-text').remove();
    if(value === 'credit card') {
        $('#credit-card').show();
        //added and removed class selected to indicate when selected to apply validation
        $('option[value="credit card"]').addClass('selected');
        $('div').last().hide();
        $('div').last().prev().hide();
        //show appropriate div and unselect credit card option
    } else if(value === 'paypal'){
        $('#credit-card').hide();
        $('option[value="credit card"]').removeClass('selected');
        $('div').last().hide();
        $('div').last().prev().show();
    } else if(value === 'bitcoin'){
        $('#credit-card').hide();
        $('option[value="credit card"]').removeClass('selected');
        $('div').last().prev().hide();
        $('div').last().show();

    }
});
//got this from https://stackoverflow.com/questions/2507030/email-validation-using-jquery I SUCK at regex! Sorry...
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

const $checkBadEmail = $('<span class="bad-text" id="mail-bad-mess">Invalid e-mail</span>');
const $checkBadName = $('<span class="bad-text" id="name-bad-mess">Invalid name</span>')
const $checkBadMess = $('<span class="bad-text" id="check-bad-mess">Please select a checkbox</span>')

//hide the error elements
$('#e-mail-bad-mess').remove();
$('#name-bad-mess').remove();
$('#check-bad-mess').remove();
//this is for the instant checking of email
$('#mail').on('keyup', function(){
    //on keyup check email value and test it
   if(!isEmail($('#mail').val())){
       //if not valid the error and css classes are shown
       $('#mail').attr('class', 'bad-valid');
       $('#mail').prev().append($checkBadEmail);
    } else {
       //if a valid email then css removed and the error message is removed
        $('#mail').attr('class', '');
        $('#mail-bad-mess').remove();
    }
});
//submit button handler
$('button[type="submit"]').on('click', function(e){
    //checks email validation at button pressing time, same logic as above
   if(!isEmail($('#mail').val())){
       $('#mail').attr('class', 'bad-valid');
       $('#mail').prev().append($checkBadEmail);
   } else {
       $('#mail').attr('class', '');
       $('#mail-bad-mess').remove();
   }
   //checks to see if the name input is empty and shows error and sets css
   if($('#name').val() === ''){
       $('#name').attr('class', 'bad-valid');
       $('#name').prev().append($checkBadName);

   } else {
       $('#name').attr('class', false);
       $('#name-bad-mess').remove();
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
        $('.activities').prepend($checkBadMess);
    } else {
        //hides error if at least one item is checked
        $('#check-bad-mess').remove();
    }
    //credit card validations, triggers on class 'selected' on credit card option
    if($('option[value="credit card"]').hasClass('selected')) {
        const $creditNumber = $('#cc-num').val();
        const $zipNumber = $('#zip').val();
        const $cvvNumber = $('#cvv').val();
        //if credit card number is conditionally invalid
        const validate = ($numType, type) => {
            let logic = false;
            let string = "";
            let checker = "";
            if (type === "cc") {
                //credit card number must be between 13 and 16 digits long
                logic = ($numType.toString().length < 13) || ($numType.toString().length > 16);
                //if cc number is 0 display different message
                if ($numType.toString().length === 0) {
                    string = "Please enter a credit card number.";
                } else {
                    string = "Credit card numbers must be between 13 an 16 numbers.";
                }
                checker = "cc-num";
            } else if (type === 'zip') {
                //make sure the zip code is exactly 5 digits long
                logic = ($numType.toString().length !== 5);
                //if input is empty different message is shown
                if ($numType.toString().length === 0) {
                    string = "Please enter a zip code.";
                } else {
                    string = "Zip codes must be exactly 5 digits long."
                }
                checker = type;
            } else if (type === 'cvv') {
                //make sure the zip code is exactly 3 digits long
                logic = ($numType.toString().length !== 3);
                //same as type=zip
                if ($numType.toString().length === 0) {
                    string = "Please enter a credit CVV code.";
                } else {
                    string = "CVV code must be exactly 3 digits long."
                }
                checker = type;
            }
            //if the input is numeric, and folows appropriate logic determined in the if-else block above
            if (!($.isNumeric($numType)) || logic) {
                $(`#${checker}`).attr('class', 'bad-valid');
                if ($(`#${type}-num-error`).length) {
                    $(`#${type}-num-error`).remove();
                }
                $('#credit-card').after($(`<span class="bad-text" id="${type}-num-error">${string}</span>`));
            } else {
                $(`#${checker}`).attr('class', '');
                $(`#${type}-num-error`).remove();
            }
        }
        validate($creditNumber, "cc");
        validate($zipNumber, "zip");
        validate($cvvNumber, "cvv");
    }
    //stops the page from refreshing if something is still invalid
    if(!((document.querySelectorAll('.bad-valid').length === 0)&&(document.querySelectorAll('.bad-text').length === 0))){
        e.preventDefault();
    }
});
