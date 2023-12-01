package md.ceiti.techshopapi.util;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;

public class ValidationUtils {

    public static <T> void validate(T object, Errors errors) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        for (ConstraintViolation<T> violation : validator.validate(object)) {
            errors.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
        }
    }
}
