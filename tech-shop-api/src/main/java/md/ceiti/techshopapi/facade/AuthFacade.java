package md.ceiti.techshopapi.facade;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.LoginRequest;
import md.ceiti.techshopapi.dto.request.RegisterRequest;
import md.ceiti.techshopapi.entity.Account;
import md.ceiti.techshopapi.entity.AccountDetails;
import md.ceiti.techshopapi.exception.ValidationException;
import md.ceiti.techshopapi.mapper.AccountMapper;
import md.ceiti.techshopapi.security.JwtUtils;
import md.ceiti.techshopapi.service.AccountService;
import md.ceiti.techshopapi.util.ConstraintViolationMessage;
import md.ceiti.techshopapi.util.ErrorUtils;
import md.ceiti.techshopapi.validator.AccountValidator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

@Component
@RequiredArgsConstructor
public class AuthFacade {

    private final AuthenticationManager authenticationManager;

    private final AccountService accountService;

    private final AccountMapper accountMapper;

    private final AccountValidator accountValidator;

    private final JwtUtils jwtUtils;

    public String login (LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );

        try {
            Authentication auth = authenticationManager.authenticate(authenticationToken);
            AccountDetails accountDetails = (AccountDetails) auth.getPrincipal();

            return jwtUtils.generateToken(
                    accountDetails.getAccount()
            );
        } catch (BadCredentialsException e) {
            Map<String, Map<String, String>> errors = new TreeMap<>();
            if (accountService.findByUsername(loginRequest.getUsername()).isEmpty()) {
                errors.put("username", Map.of("notFound", ConstraintViolationMessage.NOT_FOUND));
                throw new ValidationException(errors);
            }

            errors.put("password", Map.of("notMatch", ConstraintViolationMessage.NOT_MATCH));
            throw new ValidationException(errors);
        }
    }

    public String register(RegisterRequest registerRequest,
                           BindingResult bindingResult) {
        Account account = accountMapper.toAccount(registerRequest);

        accountValidator.validate(account, bindingResult);
        ErrorUtils.validate(bindingResult);

        return jwtUtils.generateToken(
                accountService.save(account)
        );
    }
}
