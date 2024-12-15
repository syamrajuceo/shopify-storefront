const validateFormFields = (values) => {
  const errors = {};

  // Helper functions for validation
  const isEmpty = (value) => !value || value.trim().length === 0;
  const isAlphabetic = (value) => /^[A-Za-z\s]+$/.test(value);
  const isValidPostalCode = (zip, country) => {
    switch (country) {
      case "US":
        return /^\d{5}(-\d{4})?$/.test(zip); // e.g., 12345 or 12345-6789
      case "India":
        return /^\d{6}$/.test(zip); // Indian 6-digit postal codes
      default:
        return zip.length >= 3 && zip.length <= 10; // General fallback
    }
  };

  // Validation rules
  // First Name
  if (isEmpty(values.firstName)) {
    errors.firstName = "First name is required.";
  } else if (!isAlphabetic(values.firstName)) {
    errors.firstName = "First name must only contain letters.";
  }

  // Last Name
  if (isEmpty(values.lastName)) {
    errors.lastName = "Last name is required.";
  } else if (!isAlphabetic(values.lastName)) {
    errors.lastName = "Last name must only contain letters.";
  }

  // Address Line 1
  if (isEmpty(values.address1)) {
    errors.address1 = "Address line 1 is required.";
  }

  // City
  if (isEmpty(values.city)) {
    errors.city = "City is required.";
  } else if (!isAlphabetic(values.city)) {
    errors.city = "City must only contain letters.";
  }

  // Country
  if (isEmpty(values.country)) {
    errors.country = "Country is required.";
  }

  // Postal Code
  if (isEmpty(values.zip)) {
    errors.zip = "Postal code is required.";
  } else if (!isValidPostalCode(values.zip, values.country)) {
    errors.zip = `Invalid postal code format for ${values.country || "selected country"}.`;
  }

  // Phone Number
  if (isEmpty(values.phone)) {
    errors.phone = "Phone number is required.";
  } else {
    const normalizedPhone = values.phone.replace(/\s+/g, '');
    if (!/^(?:\+?\d{1,3})?\d{9,14}$/.test(normalizedPhone)) {
      errors.phone = "Invalid phone number format. Use +countrycode followed by 9-14 digits, or just 9-14 digits.";
    }
  }

  // Optional Address Line 2
  if (values.address2 && values.address2.trim().length > 0) {
    if (!/^[A-Za-z0-9\s,.-]+$/.test(values.address2)) {
      errors.address2 = "Address line 2 contains invalid characters.";
    }
  }

  return errors;
};

export default validateFormFields;
