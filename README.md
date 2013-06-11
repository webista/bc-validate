#Bc-validate

Javascript form validation for frontend and backend
###NOTE:
Be sure that your form field names are exactly the same as their corresponding fields in the backend.

##Instructions
###HTML
```javascript
// sets the form as a target for bc-validate
data-validate="bc-validate"
ex.
<form data-validate="bc-validate">
</form>

// for required field
data-bcvalidate="required"
ex.
<input type="text" data-bcvalidate="required">

// for email field
data-bcvalidate="email"
ex.
<input type="text" data-bcvalidate="email">

//for multiple validations, attibutes should be separated by a pipe | (required and email)
data-bcvalidate="email|required" 
ex.
<input type="text" data-bcvalidate="email|required">
```

###Javascript
```javascript
$('yourFormUniqueIndentifier').bcValidate({errors: response.errors});
```
