$('.field__input').on('input', function() {
    var $field = $(this).closest('.field');
    if (this.value) {
      $field.addClass('field--not-empty');
    } else {
      $field.removeClass('field--not-empty');
    }
});