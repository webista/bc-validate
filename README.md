#Bc-validate

Javascript form validation for frontend and backend
###NOTE:
Be sure that your form field names are exactly the same as their corresponding fields in the backend.

##Instructions
###HTML
```javascript
// Sets the form as a target for bc-validate
data-validate="bc-validate"
ex.
<form data-validate="bc-validate">
</form>

// For required field
data-bcvalidate="required"
ex.
<input type="text" data-bcvalidate="required">

// For email field
data-bcvalidate="email"
ex.
<input type="text" data-bcvalidate="email">

// For numeric field
data-bcvalidate="number"
ex.
<input type="text" data-bcvalidate="number">

// Range by digits
data-bcvalidate="rangebydigit4"
ex.
<input type="text" data-bcvalidate="rangebydigit4"> // 4 digits

// For multiple validations, attributes should be separated by a pipe |
data-bcvalidate="email|required|number|rangebydigit4" 
ex.
<input type="text" data-bcvalidate="email|required|number|rangebydigit4">

// For password matching, create 2 password fields with password1 and password2 attributes
data-bcvalidate="password1" // first password 
data-bcvalidate="password2" // second password
ex.
<input type="password" data-bcvalidate="password1">
<input type="password" data-bcvalidate="password2">

// For creating custom styles
data-customstyle="class{zipcode-label-error}|newElId{signup-org-zip-label}"
      // You have to add a new class like this
      class{zipcode-label-error}
      // and if you want the error to append to a new element
      // define a new Id or Class
      newElId{signup-org-zip-label} // for id
      newElClass{signup-org-zip-label} // for class
```

###Javascript
####Form submit
```javascript
// Validate options:
var validateOptions = {
      errors: {
        // Catches the errors from the backend
        backend: {}
      }
};

validateOptions.errors.backend = response.errors;

if ( errorFlag === 'Y' ) {
  $('yourFormUniqueIndentifier').bcValidate(validateOptions);
}

// Custom error fields:
// By default, error messages are appended below the input field, but what if you want the error
// to appear somewhere after 
// the input's parent element container? That's simple.

// -- HTML
// Be sure that the parent element's container CLASS is the same as the name of the input inside
// the container but with a
// wrap word succeeded by a dash character (ex. wrap-inputname)
<div class="wrap-stdLogo"> // in this case stdLogo
    <span class="btn-file button">
        <span class="fileupload-new">Upload</span>
        <span class="fileupload-exists">Change</span>
        <input type="file" id="standard-logo-btn" name="stdLogo"> // input name is stdLogo
    </span>
    <span class="fileupload-preview"></span>
</div>

// -- Javascript
// Just add a customField key witn a value of empty array in the validation error object
validateOptions = {
    errors: {
        backend: {},
        customFieldNames: []
    }
};

validateOptions.errors.backend = response.errors;
// Multiple custom field error
validateOptions.errors.customFieldNames = ['stdLogo', 'sqrLogo'];

$('yourFormUniqueIndentifier').bcValidate(validateOptions);

// Custom field style
// Add customFieldStyle in validateOptions object

validateOptions = {
    errors: {
        backend: {},
        customFieldNames: [],
        customFieldStyle: {} // <---- this one
    }
}

// Then assign a style in a field name
// In the example, "addressZip" is the field name and the "zipcode-label-error" is the style
validateOptions.errors.customFieldStyle.addressZip = 'zipcode-label-error';

// If you want the defined style to append to a new element do this
// Notice that i just created a NewEl right after the field name that I created above "addressZipNewEl"
// then assign a class or an id in this case "#signup-org-zip-label"
validateOptions.errors.customFieldStyle.addressZipNewEl = '#signup-org-zip-label';
```
