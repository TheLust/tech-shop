package md.ceiti.techshopapi.mapper;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.RegisterRequest;
import md.ceiti.techshopapi.entity.Account;
import md.ceiti.techshopapi.entity.Role;
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
}
