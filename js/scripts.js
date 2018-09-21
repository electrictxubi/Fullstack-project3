$('#name').focus();
$('#other-title').hide();
$('#title').on('change', function() {
    const value = $(this).val();
    if(value === 'other'){
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});
const selectColor = ($firstTerm, $secondTerm) => {
    $firstTerm.hide();
    $secondTerm.show();
    $secondTerm.first().attr('selected','selected');
    $firstTerm.first().attr('selected',false);
}
$('#design').on('change', function() {
    const value = $(this).val();
    console.log(value);
    const $jsPuns = $("#color option:contains('Puns')");
    const $heart = $("#color option:contains('(I')");
    if(value === 'js puns'){
        selectColor($heart, $jsPuns);

    } else if(value ==='heart js'){
        selectColor($jsPuns, $heart);
    }
});
let total = 0;
const disableProc = (item) => {
    const $element = $(`input[name=${item}]`);
    $element.attr('disabled', true);
    $element.parent().css('text-decoration', 'line-through');
}
const enableProc = (item) => {
    const $element = $(`input[name=${item}]`);
    $element.attr('disabled', false);
    $element.parent().css('text-decoration', 'none');
}
$('input:checkbox').on('change', function(e){
    const cost = (parseInt($(this).parent().text().slice(-3)));
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
        console.log(total);
    }
    const $totalPrint = $('<h3 class="total">Total: $'+ total +'</h3>');
    if($('.total').length) {
        $('.total').remove();
    }
    $('.activities').append($totalPrint);
});