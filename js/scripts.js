$('#name').focus();
$('#other-title').hide();
$('#title').on('change', function() {
    const value = $(this).val();
    console.log(value);
    if(value === 'other'){
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});