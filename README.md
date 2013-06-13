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

// For multiple validations, attributes should be separated by a pipe | (required and email)
data-bcvalidate="email|required" 
ex.
<input type="text" data-bcvalidate="email|required">

// For password matching, create 2 password fields with password1 and password2 attributes
data-bcvalidate="password1" // first password 
data-bcvalidate="password2" // second password
ex.
<input type="password" data-bcvalidate="password1">
<input type="password" data-bcvalidate="password2">
```

###Javascript
####Form submit
```javascript
// Validate options
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
```
