/*
 * For clicked events, you have to call $().bcValidate() in the initialization of the module
	-- VALIDATION TODOS
	* Email
	* Custom message inline message
	* Block/group message
	* Max and min
	* Password match
	* Specific set of special characters
	* Numbers only
	* Alphanumeric
	* Range
 */

(function($) {
	var bcValidateHelpers = function() {};

	// Beautify jQuery form serialization
	bcValidateHelpers.prototype.serializeForm = function(form) {
		var formData = {},
			temp = {};

			$.each(form.split('&'), function(k, v) {
				if (v.split('=')[0] in formData) {
					formData[v.split('=')[0]] = formData[v.split('=')[0]] + ',' + decodeURIComponent(v.split('=')[1]).replace(/\+/g, ' ');
				} else {
					formData[v.split('=')[0]] = decodeURIComponent(v.split('=')[1]).replace(/\+/g, ' ');
				}
			});

			$.each(formData, function(k, v) {
				if (k.indexOf('%5B%5D') !== -1) {
					temp[k] = v;
					delete formData[k];
				}
			});

			$.each(temp, function(k, v) {
				formData[k.replace('%5B%5D', '')] = v;
			});

			return formData;
	};

	// Error message
	bcValidateHelpers.prototype.errMsg = function(options) {
		if ( options.thisEl.next('.bc-validate-error-list').length === 0 ) {
			options.thisEl.after('<ul class="bc-validate-error-list">\
				<li>'+ options.msg +'</li>\
			</ul>');
		}
	}

	bcValidateHelpers.prototype.errDesign = function(options) {
		options.thisEl.css({
			// 'color': '#B94A48',
			'background-color': '#F2DEDE',
			'margin-bottom': 0
		});
	}

	bcValidateHelpers.prototype.resetErrDesign = function(options) {
		options.thisEl.css({
			'color': '#555',
			'background-color': '#FFF',
			'border-color': '#E6E7E8',
			'margin-bottom': options.thisElMarginBottom
		});
		options.thisEl.next('.bc-validate-error-list').fadeOut(function() {
			$(this).remove();
		});
	}

	$.fn.bcValidate = function(options) {
		var form = $('form[data-validate="bc-validate"]'),
			rootThis = this;

		$('body').on('keyup', 'input, textarea', function(e) {
			var thisEl = $(this),
				thisElMarginBottom = thisEl.css('margin-bottom'),
				thisElVal = $.trim(thisEl.val()),
				errorOptions = {},
				thisElState = false;
				errorOptions.thisEl = thisEl;

			if ( thisEl.data('bcvalidate') !== undefined ) {
				// Email
				if ( thisEl.data('bcvalidate').indexOf('email') !== -1 ) {
					regExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
					
					// Error
					if ( regExp.test(thisElVal) === false) {
						thisElState = true;
						if ( thisEl.next('.bc-validate-error-list').length === 0 ) {
							errorOptions.msg = 'Email is invalid';
							// Error view
							new bcValidateHelpers().errDesign(errorOptions);
							// Error message
							new bcValidateHelpers().errMsg(errorOptions);
						}
					} else {
						thisElState = false;
					}
				}

				// Required
				if ( thisEl.data('bcvalidate').indexOf('required') !== -1 ) {					
					errorOptions.msg = 'This field is required';
					errorOptions.thisElMarginBottom = thisElMarginBottom;

					// Error
					if ( thisElVal.length === 0 && e.keyCode !== 9 ) {
						thisElState = true;
						// Error view
						new bcValidateHelpers().errDesign(errorOptions);
						// Error message
						new bcValidateHelpers().errMsg(errorOptions);						
					} else {
						// Remove errors
						// Only if this el does not have an error from above validations
						if ( thisElState === false ) {
							new bcValidateHelpers().resetErrDesign(errorOptions);
						}
					}
				}

				// Password match
				if ( thisEl.data('bcvalidate').indexOf('password2') !== -1 ) {
					console.log($('input[data-bcvalidate="required|password1"]').val())

					if ( $('input[type="password"]').data('bcvalidate').indexOf('password1') !== -1 ) {
						console.log($(this).val());
					}
				}
			}
		});

		// When form is submit
		// $('yourForm').bcValidate({errors: response.errors});
		if ( options ) {
			$.each(options.errors, function(fieldName,object) {
				var errorFields = '';

				if ( fieldName === 'dateOfBirth' ) {
					errorFields = $(rootThis).find('input[name="dobDay"], input[name="dobYear"]');
					$('select[name="dobMon"]').css({'margin-bottom': 0});
				} else {
					errorFields = $(rootThis).find('input[name="'+ fieldName +'"]');
				}

				var errorOptions = {
						thisEl: ( errorFields.length > 1) ? $(errorFields[1]) : errorFields,
						msg: object[0][1]
					};

				// Error view
				new bcValidateHelpers().errDesign(errorOptions);
				// Error message
				new bcValidateHelpers().errMsg(errorOptions);
			});
		}
	}

	// Initialize 
	// $.fn.bcValidate();
})(jQuery)