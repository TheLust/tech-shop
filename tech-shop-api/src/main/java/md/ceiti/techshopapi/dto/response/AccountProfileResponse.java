package md.ceiti.techshopapi.dto.response;

import lombok.Getter;
import lombok.Setter;
import md.ceiti.techshopapi.entity.Gender;

import java.time.LocalDate;

@Getter
@Setter
public class AccountProfileResponse {
    private String username;
    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate dateOfBirth;
    private String email;
    private String phoneNumber;
}
