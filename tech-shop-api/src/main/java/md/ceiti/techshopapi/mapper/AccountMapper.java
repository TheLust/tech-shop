package md.ceiti.techshopapi.mapper;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.AccountProfileUpdateRequest;
import md.ceiti.techshopapi.dto.request.RegisterRequest;
import md.ceiti.techshopapi.dto.response.AccountProfileResponse;
import md.ceiti.techshopapi.entity.account.Account;
import md.ceiti.techshopapi.entity.account.Role;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccountMapper {

    private final ModelMapper mapper;

    public Account toAccount(RegisterRequest registerRequest) {
        Account account = mapper.map(registerRequest, Account.class);
        account.setRole(Role.ROLE_USER);
        account.setEnabled(true);
        return account;
    }

    public Account toAccount(AccountProfileUpdateRequest accountProfileUpdateRequest) {
        return mapper.map(accountProfileUpdateRequest, Account.class);
    }

    public AccountProfileResponse toAccountProfileResponse(Account account) {
        return mapper.map(account, AccountProfileResponse.class);
    }
}
