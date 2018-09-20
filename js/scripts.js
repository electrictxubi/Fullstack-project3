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
$('#design').on('change', function() {
    const value = $(this).val();
    console.log(value);
    if(value === 'js puns'){
        $("#color option:contains('(I')").hide();
        $("#color option:contains('Puns')").show();
        $("#color option:contains('Puns')").first().attr('selected','selected');
        $("#color option:contains('(I')").first().attr('selected',false);

    } else if(value ==='heart js'){
        $("#color option:contains('Puns')").hide();
        $("#color option:contains('(I')").show();
        $("#color option:contains('(I')").first().attr('selected','selected');
        $("#color option:contains('Puns')").first().attr('selected',false);
    }
});