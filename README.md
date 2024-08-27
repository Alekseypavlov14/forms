### `createFormValidator` Function Documentation (Updated)

#### **Purpose**:
The `createFormValidator` function generates a validation function for a given form configuration. The generated function validates form data based on the provided validation rules and returns a collection of errors if any fields fail validation. Optionally, it allows the integration of a custom validation callback.

#### **Type Definitions**:
- **`T extends AnyForm`**: The generic type `T` represents the form data structure.
- **`ValidationConfig<T>`**: An object where keys correspond to the form field names, and values are validation functions that return a boolean indicating whether the field is valid.
- **`FormErrors<T>`**: An object where keys correspond to the form field names, and values are error messages as strings.

#### **Parameters**:
- **`config: Partial<ValidationConfig<T>>`**: A partial configuration object defining validation rules for each form field. Each field in the configuration is a function that takes the field's value and returns a boolean indicating whether the value is valid.
- **`callback?: (data: T) => FormErrors<T>`**: An optional callback function that performs additional validation on the form data and returns an object containing error messages for any fields that fail validation.

#### **Returns**:
- **`(data: T) => FormErrors<T>`**: A function that takes form data as input and returns an object containing error messages for fields that failed validation. If a field is valid, no error message is added for that field. Errors from the optional callback function are merged with the errors from the configuration validation.

#### **Example Usage**:

```typescript
import { createFormValidator, hasMinLength, isEmail, FormErrors } from '@oleksii-pavlov/forms'

interface MyForm {
  email: string
  password: string
  confirmPassword: string
}

const validateMyForm = createFormValidator<MyForm>({
  email: isEmail,
  password: hasMinLength(6),
}, comparePasswords)

function comparePasswords(data: MyForm): FormErrors<MyForm> | undefined {
  if (data.password !== data.confirmPassword) return ({
    password: 'Password is not valid',
    confirmPassword: 'Password is not valid',
  })
}

// client code

const formData: MyForm = {
  email: 'a@gmail.com',
  password: 'password1',
  confirmPassword: 'password2'
}

const errors = validateMyForm(formData)
console.log(errors)
// Output: { password: 'Password is not valid', confirmPassword: 'Password is not valid' }
```

#### **Explanation**:
- The `createFormValidator` function iterates over the form data fields using `Object.keys`. For each field, it checks if there is a corresponding validation function in the configuration.
- If the field has a validation function and the validation fails, an error message is added to the `errors` object, specifying that the field is invalid.
- If a `callback` is provided, it is called with the form data, and any errors returned by the callback are merged with the errors from the configuration validation.
- The function returns the `errors` object, which contains error messages for any fields that failed validation.


### `isFormValid` Function Documentation

#### **Purpose**:
The `isFormValid` function checks whether a form is valid by comparing the errors object with an empty object. If there are no errors (i.e., the errors object is empty), the form is considered valid.

#### **Type Definitions**:
- **`T extends AnyForm`**: The generic type `T` represents the form data structure.
- **`FormErrors<T>`**: An object where keys correspond to the form field names, and values are error messages as strings.

#### **Parameters**:
- **`errors: FormErrors<T>`**: An object containing error messages for form fields that failed validation. If the object is empty, the form is considered valid.

#### **Returns**:
- **`boolean`**: Returns `true` if the form is valid (i.e., the errors object is empty), otherwise returns `false`.

#### **Example Usage**:

```typescript
import { isFormValid, FormErrors } from '@oleksii-pavlov/forms'

interface MyForm {
  username: string
  email: string
  password: string
}

const errors: FormErrors<MyForm> = {
  username: 'username field is invalid',
}

const isValid = isFormValid(errors)
console.log(isValid) // Output: false
```

#### **Explanation**:
- The `isFormValid` function uses the `deepCompare` function from `@oleksii-pavlov/deep-merge` to compare the `errors` object with an empty object.
- If the `errors` object is empty (i.e., no errors are present), the function returns `true`, indicating that the form is valid.
- Otherwise, it returns `false`, indicating that the form is not valid and contains errors.

### List of validation rules

- `all` - checks if all array elements are valid by rule
- `hasMinLength` - checks if string has min length
- `hasMaxLength` - checks if string has max length
- `isEmail` - checks if string is email (regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
- `isMin` - checks if number is greater or equal than passed value
- `isMax` - checks if number is lower or equal than passed value
- `isNotEmptyString` - checks if string is not empty
- `isNot` - checks if value is not equal to passed value
- `isNumber` - checks type of value
- `isOneOf` - checks that value is one of passed options
- `isString` - checks if the value is string
- `matchesRegex` - tests value by regex
- `multiple` - receives several rules and combines them
- `skip` - always returns positive result
