package md.ceiti.techshopapi.dto.request;

import lombok.Getter;
import lombok.Setter;
import md.ceiti.techshopapi.entity.Gender;

import java.time.LocalDate;

@Getter
@Setter
public class AccountProfileUpdateRequest {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate dateOfBirth;
    private String email;
    private String phoneNumber;
}
