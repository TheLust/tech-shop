package md.ceiti.techshopapi.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import md.ceiti.techshopapi.entity.account.Gender;

import java.time.LocalDate;

@Getter
@Setter
public class AccountProfileUpdateRequest {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Gender gender;

    @JsonFormat(pattern = "MM/dd/yyyy")
    private LocalDate dateOfBirth;
    private String email;
    private String phoneNumber;
    private String confirmPassword;
}
