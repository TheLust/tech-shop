package md.ceiti.techshopapi.service;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.entity.Account;
import md.ceiti.techshopapi.repository.AccountRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    private final PasswordEncoder passwordEncoder;

    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public Optional<Account> findByPhoneNumber(String phoneNumber) {
        return accountRepository.findByPhoneNumber(phoneNumber);
    }

    @Transactional
    public Account save(Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepository.save(account);
    }

    @Transactional
    public Account update(Account oldAccount, Account newAccount) {
        if (newAccount.getPassword() != null) {
            oldAccount = updatePassword(oldAccount, newAccount.getPassword());
        }
        BeanUtils.copyProperties(newAccount, oldAccount, "id", "password");
        return accountRepository.save(oldAccount);
    }

    private Account updatePassword(Account oldAccount, String newPassword) {
        newPassword = passwordEncoder.encode(newPassword);
        oldAccount.setPassword(newPassword);
        return accountRepository.save(oldAccount);
    }

    @Transactional
    public void delete(Account account) {
        accountRepository.delete(account);
    }
}
