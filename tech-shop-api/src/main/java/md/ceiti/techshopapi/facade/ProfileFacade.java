package md.ceiti.techshopapi.facade;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.AccountProfileUpdateRequest;
import md.ceiti.techshopapi.dto.response.AccountProfileResponse;
import md.ceiti.techshopapi.entity.account.Account;
import md.ceiti.techshopapi.entity.account.AccountDetails;
import md.ceiti.techshopapi.exception.ValidationException;
import md.ceiti.techshopapi.mapper.AccountMapper;
import md.ceiti.techshopapi.service.AccountService;
import md.ceiti.techshopapi.util.ErrorUtils;
import md.ceiti.techshopapi.validator.AccountValidator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.Map;
import java.util.TreeMap;

@Component
@RequiredArgsConstructor
public class ProfileFacade {

    private final AccountService accountService;
    private final AccountMapper accountMapper;
    private final AccountValidator accountValidator;
    private final PasswordEncoder passwordEncoder;

    public AccountProfileResponse getProfileInfo(AccountDetails accountDetails) {
        return accountMapper.toAccountProfileResponse(
                accountDetails.getAccount()
        );
    }

    public AccountProfileResponse updateProfileInfo(AccountDetails accountDetails,
                                                    AccountProfileUpdateRequest accountProfileUpdateRequest,
                                                    BindingResult bindingResult) {
        Account updatedAccount = accountMapper.toAccount(accountProfileUpdateRequest);

        boolean match = passwordEncoder.matches(accountProfileUpdateRequest.getConfirmPassword(), accountDetails.getPassword());

        if (!match) {
            Map<String, Map<String, String>> errors = new TreeMap<>();
            errors.put("confirmation", Map.of("failed", "failed"));
            throw new ValidationException(errors);
        }
        updatedAccount.setRole(accountDetails.getAccount().getRole());
        updatedAccount.setEnabled(accountDetails.getAccount().getEnabled());
        accountValidator.validate(updatedAccount, accountDetails.getAccount().getId(), bindingResult);
        ErrorUtils.validate(bindingResult);

        return accountMapper.toAccountProfileResponse(
                accountService.update(
                        accountDetails.getAccount(),
                        updatedAccount
                )
        );
    }

}
