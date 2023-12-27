package md.ceiti.techshopapi.exception;

import lombok.Getter;
import md.ceiti.techshopapi.util.ConstraintViolationMessage;
import md.ceiti.techshopapi.util.ErrorCode;

import java.util.Map;
import java.util.TreeMap;

@Getter
public class NotFoundException extends RuntimeException {
    private final Map<String, Map<String, String>> errors = new TreeMap<>();

    public NotFoundException(String field) {
        Map<String, String> error = new TreeMap<>();
        error.put(ErrorCode.NOT_FOUND, ConstraintViolationMessage.NOT_FOUND);
        errors.put(field, error);
    }
}
