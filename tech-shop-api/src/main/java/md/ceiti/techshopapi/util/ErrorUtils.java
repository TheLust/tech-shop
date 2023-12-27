package md.ceiti.techshopapi.util;

import md.ceiti.techshopapi.exception.ValidationException;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;

public class ErrorUtils {
    public static void validate(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult);
        }
    }
}
