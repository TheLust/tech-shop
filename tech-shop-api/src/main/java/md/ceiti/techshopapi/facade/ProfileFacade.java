package md.ceiti.techshopapi.facade;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.AccountProfileUpdateRequest;
import md.ceiti.techshopapi.dto.response.AccountProfileResponse;
import md.ceiti.techshopapi.entity.Account;
import md.ceiti.techshopapi.entity.AccountDetails;
import md.ceiti.techshopapi.mapper.AccountMapper;
import md.ceiti.techshopapi.service.AccountService;
import md.ceiti.techshopapi.util.ErrorUtils;
import md.ceiti.techshopapi.validator.AccountValidator;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
public class ProfileFacade {

    private final AccountService accountService;
    private final AccountMapper accountMapper;
    private final AccountValidator accountValidator;

    public AccountProfileResponse getProfileInfo(AccountDetails accountDetails) {
        return accountMapper.toAccountProfileResponse(
                accountDetails.getAccount()
        );
    }

    public AccountProfileResponse updateProfileInfo(AccountDetails accountDetails,
                                                    AccountProfileUpdateRequest accountProfileUpdateRequest,
                                                    BindingResult bindingResult) {
        Account updatedAccount = accountMapper.toAccount(accountProfileUpdateRequest);

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
