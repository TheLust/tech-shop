package md.ceiti.techshopapi.util;

import md.ceiti.techshopapi.exception.ValidationException;
import org.springframework.validation.BindingResult;

public class ErrorUtils {
    public static void validate(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult);
        }
    }
}
