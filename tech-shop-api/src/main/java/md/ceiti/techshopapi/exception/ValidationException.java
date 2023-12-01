package md.ceiti.techshopapi.exception;

import lombok.Getter;
import org.springframework.validation.BindingResult;

import java.util.Map;
import java.util.TreeMap;

@Getter
public class ValidationException extends RuntimeException {

    private final Map<String, Map<String, String>> errors = new TreeMap<>();

    public ValidationException(BindingResult bindingResult) {
        errors.putAll(toMap(bindingResult));
    }

    public ValidationException(Map<String, Map<String, String>> errors) {
        this.errors.putAll(errors);
    }

    private Map<String, Map<String, String>> toMap(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, Map<String, String>> errorsMap = new TreeMap<>();
            bindingResult.getFieldErrors()
                    .forEach(field -> {
                        Map<String, String> fieldErrors = new TreeMap<>();
                        bindingResult.getFieldErrors()
                                .stream()
                                .filter(error -> error.getField().equals(field.getField()))
                                .forEach(error -> fieldErrors.put(error.getCode(), error.getDefaultMessage()));
                        errorsMap.put(field.getField(), fieldErrors);
                    });
            return errorsMap;
        }

        return new TreeMap<>();
    }
}
