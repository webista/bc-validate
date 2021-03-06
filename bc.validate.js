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


// Error design
bcValidateHelpers.prototype.errDesign = function(options) {
	options.thisEl.css({
		'background-color': '#F2DEDE',
		'margin-bottom': 0
	});
}

// Error message
bcValidateHelpers.prototype.errMsg = function(options) {
	var thisEl = options.newEl !== undefined ? options.newEl : options.thisEl;

	if ( thisEl.next('.bc-validate-error-list').length !== 0 ) {
		thisEl.next('.bc-validate-error-list').remove()
	}

	thisEl.after('<ul class="bc-validate-error-list">\
		<li>'+ options.msg +'</li>\
	</ul>');
}

bcValidateHelpers.prototype.resetErrDesign = function(options) {
	options.thisEl.css({
		'color': '#555',
		'background-color': '#FFF',
		'border-color': '#E6E7E8',
		'margin-bottom': options.thisElMarginBottom
	});

	var thisEl = options.newEl !== undefined ? options.newEl : options.thisEl;

	thisEl.next('.bc-validate-error-list').fadeOut(function() {
		$(this).remove();
	});
}

$.fn.bcValidate = function(options) {
	var form = $('form[data-validate="bc-validate"]'),
		rootThis = this;

	$('body').on('keyup', 'input, textarea', function(e) {
		var thisEl = $(this),
			origEl = thisEl,
			newEl = '',
			thisElMarginBottom = thisEl.css('margin-bottom'),
			thisElVal = $.trim(thisEl.val()),
			errorOptions = {},
			thisElErrorState = false;

			errorOptions.thisEl = thisEl,
			newStyleClass = '';

		// Check if custom style is defined
		if ( thisEl.data('customstyle') !== undefined ) {
			// Get the style's class before modifying the current selected element
			if ( thisEl.data('customstyle').indexOf('class{') !== -1 ) {
				newStyleClass = thisEl.data('customstyle').match(/class{(.*?)}/i)[1];
			}

			// If newClass El
			if ( thisEl.data('customstyle').indexOf('newElCLass') !== -1) {
				var newElClass = thisEl.data('customstyle').match(/newElCLass{(.*?)}/i)[1];
				newEl = $('.'+newElClass);
			}

			// Or if newId El
			if ( thisEl.data('customstyle').indexOf('newElId') !== -1 ) {
				var newElId = thisEl.data('customstyle').match(/newElId{(.*?)}/i)[1];
				newEl = $('.'+newElId);
			}

			// If custom style is defined
			errorOptions.newEl = newEl !== '' ? newEl : thisEl;
		}

		if ( thisEl.data('bcvalidate') !== undefined ) {
			// Email
			if ( thisEl.data('bcvalidate').indexOf('email') !== -1 ) {
				regExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
				
				// Error
				if ( regExp.test(thisElVal) === false) {
					thisElErrorState = true;
					if ( thisEl.next('.bc-validate-error-list').length === 0 ) {
						errorOptions.msg = 'Email is invalid';
						// Error view
						new bcValidateHelpers().errDesign(errorOptions);
						// Error message
						new bcValidateHelpers().errMsg(errorOptions);
					}
				} else {
					thisElErrorState = false;
				}
			}

			// Password match
			if ( thisEl.data('bcvalidate').indexOf('password2') !== -1 ) {
				errorOptions.msg = 'Password did not match';
				var password1 = $('input[data-bcvalidate*="password1"]').val(),
					password2 = $('input[data-bcvalidate*="password2"]').val();

				if ( password1 !== password2 && e.keyCode !== 9 ) {
					thisElErrorState = true;
					// Error view
					new bcValidateHelpers().errDesign(errorOptions);
					// Error message
					new bcValidateHelpers().errMsg(errorOptions);
				} else {
					thisElErrorState = false;
				}
			}

			// Numeric
			if ( thisEl.data('bcvalidate').indexOf('number') !== -1 ) {
				var numeric = !isNaN(parseFloat(thisElVal)) && isFinite(thisElVal);

				if ( numeric === false ) {
					thisElErrorState = true;
					
					// Error message
					errorOptions.msg = 'This field should be numeric';
					new bcValidateHelpers().errMsg(errorOptions);
				} else {
					thisElErrorState = false;
				}
			}

			// Range by digits
			if ( thisEl.data('bcvalidate').indexOf('rangebydigit') !== -1 ) {
				var numeric = !isNaN(parseFloat(thisElVal)) && isFinite(thisElVal);

				if ( numeric === false ) {
					thisElErrorState = true;

					// Error message
					errorOptions.msg = 'This field should be numeric';
					new bcValidateHelpers().errDesign(errorOptions);
					new bcValidateHelpers().errMsg(errorOptions);
				} else {					
					var range = thisEl.data('bcvalidate').split('rangebydigit')[1],
						regExp = new RegExp('^[0-9]{' + range + '}$', 'i');

					if ( regExp.test(thisElVal ) === true ) {
						thisElErrorState = false;

						new bcValidateHelpers().resetErrDesign(errorOptions);
					} else {
						thisElErrorState = true;
						errorOptions.msg = 'This field should be '+ range +' digits';
						new bcValidateHelpers().errDesign(errorOptions);
						new bcValidateHelpers().errMsg(errorOptions);
					}
				}
			}

			// Required
			if ( thisEl.data('bcvalidate').indexOf('required') !== -1 ) {
				errorOptions.msg = 'This field is required';
				errorOptions.thisElMarginBottom = thisElMarginBottom;

				// Error
				if ( thisElVal.length === 0 && e.keyCode !== 9 ) {
					thisElErrorState = true;

					// Error view
					new bcValidateHelpers().errDesign(errorOptions);
					// Error message
					new bcValidateHelpers().errMsg(errorOptions);
				} else {
					// Remove errors
					// Only if this el does not have an error from above validations
					if ( thisElErrorState === false ) {
						new bcValidateHelpers().resetErrDesign(errorOptions);
					}
				}
			}

			if ( errorOptions.newEl !== undefined ) {
				errorOptions.newEl.next().addClass(newStyleClass)
			}
		}
	});

	// When form is submit
	// $('yourForm').bcValidate({errors: response.errors});
	if ( options ) {
		if ( !options.errors.customFieldNames ) {
			// Prevent the custom field key from gettting undefined
			options.errors.customFieldNames === null;
		} else {
			// Custom field errors
			$.each(options.errors.customFieldNames, function(k,v) {
				// If defined custom error fields has a corresponding error in the backend
				if ( v in options.errors.backend === true ) {
					var errorOptions = {
						thisEl: $('.wrap-'+v),
						msg: options.errors.backend[v][0][1]
					};
					
					// Error message
					new bcValidateHelpers().errMsg(errorOptions);
				}
			});
		}

		$.each(options.errors.backend, function(fieldName,object) {
			var errorFields = '',
				thisEl = $(rootThis);

			// Generic errors only without custom fields
			if ( $.inArray(fieldName, options.errors.customFieldNames) === -1) {
				if ( fieldName === 'dateOfBirth' ) {
					errorFields = thisEl.find('input[name="dobDay"], input[name="dobYear"]');
					$('select[name="dobMon"]').css({'margin-bottom': 0});
				} else if ( fieldName === 'targetDate' ) {
					errorFields = thisEl.find('input[name="targetDay"], input[name="targetYear"]');
					$('select[name="targetMon"]').css({'margin-bottom': 0});
				} else {
					errorFields = thisEl.find('input[name="'+ fieldName +'"]');
				}

				var errorOptions = {
						thisEl: ( errorFields.length > 1) ? $(errorFields[1]) : errorFields,
						msg: object[0][1]
					};

				// Error view
				new bcValidateHelpers().errDesign(errorOptions);
				// Error message
				new bcValidateHelpers().errMsg(errorOptions);
			}
		});
	}
}