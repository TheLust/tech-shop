package md.ceiti.techshopapi.service;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.entity.Account;
import md.ceiti.techshopapi.entity.AccountDetails;
import md.ceiti.techshopapi.repository.AccountRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> account = accountRepository.findByUsername(username);
        if (account.isEmpty()) {
            throw new UsernameNotFoundException("Username not found");
        }
        return new AccountDetails(account.get());
    }
}
