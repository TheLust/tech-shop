package md.ceiti.techshopapi.advice;

import md.ceiti.techshopapi.exception.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.Set;

@RestControllerAdvice
public class ExceptionHandlerController {
    @ExceptionHandler
    private ResponseEntity<Map<String, Map<String, String>>> handleException(ValidationException e) {
         return new ResponseEntity<>(
                e.getErrors(),
                HttpStatus.BAD_REQUEST
        );
    }
}
