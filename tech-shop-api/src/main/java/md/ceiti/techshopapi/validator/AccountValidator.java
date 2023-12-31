package md.ceiti.techshopapi.validator;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.entity.account.Account;
import md.ceiti.techshopapi.service.AccountService;
import md.ceiti.techshopapi.util.ConstraintViolationMessage;
import md.ceiti.techshopapi.util.ValidationUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@SuppressWarnings("NullableProblems")
public class AccountValidator implements Validator {

    private final AccountService accountService;

    @Override
    public boolean supports(Class<?> clazz) {
        return Account.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Account account = (Account) target;

        ValidationUtils.validate(account, errors);

        if (account.getDateOfBirth() != null) {
            if (Period.between(account.getDateOfBirth(), LocalDate.now()).getYears() < 18) {
                errors.rejectValue("dateOfBirth", "ageLimitation", ConstraintViolationMessage.OVER18);
            }
        }

        if (account.getUsername() != null) {
            if (accountService.findByUsername(account.getUsername()).isPresent()) {
                errors.rejectValue("username", "alreadyExists", ConstraintViolationMessage.ALREADY_EXISTS);
            }
        }

        if (account.getEmail() != null) {
            if (accountService.findByEmail(account.getEmail()).isPresent()) {
                errors.rejectValue("email", "alreadyExists", ConstraintViolationMessage.ALREADY_EXISTS);
            }
        }

        if (account.getPhoneNumber() != null) {
            if (accountService.findByPhoneNumber(account.getPhoneNumber()).isPresent()) {
                errors.rejectValue("phoneNumber", "alreadyExists", ConstraintViolationMessage.ALREADY_EXISTS);
            }
        }
    }

    public void validate(Object target, @NotNull Long id, Errors errors) {
        Account account = (Account) target;

        if (account.getPassword() != null) {
            ValidationUtils.validate(account, errors);
        } else {
            ValidationUtils.validateExceptPassword(account, errors);
        }

        if (account.getDateOfBirth() != null) {
            if (Period.between(account.getDateOfBirth(), LocalDate.now()).getYears() < 18) {
                errors.rejectValue("dateOfBirth", "ageLimitation", ConstraintViolationMessage.OVER18);
            }
        }

        if (account.getUsername() != null) {
            Optional<Account> foundAccount = accountService.findByUsername(account.getUsername());
            if (foundAccount.isPresent() && !foundAccount.get().getId().equals(id)) {
                errors.rejectValue("username", "alreadyExists", ConstraintViolationMessage.ALREADY_EXISTS);
            }

        }

        if (account.getEmail() != null) {
            Optional<Account> foundAccount = accountService.findByEmail(account.getEmail());
            if (foundAccount.isPresent() && !foundAccount.get().getId().equals(id)) {
                errors.rejectValue("email", "alreadyExists", ConstraintViolationMessage.ALREADY_EXISTS);
            }
        }

        if (account.getPhoneNumber() != null) {
            Optional<Account> foundAccount = accountService.findByPhoneNumber(account.getPhoneNumber());
            if (foundAccount.isPresent() && !foundAccount.get().getId().equals(id)) {
                errors.rejectValue("phoneNumber", "alreadyExists", ConstraintViolationMessage.ALREADY_EXISTS);
            }
        }
    }
}
