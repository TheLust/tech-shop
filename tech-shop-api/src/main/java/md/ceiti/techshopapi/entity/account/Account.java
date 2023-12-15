package md.ceiti.techshopapi.entity.account;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import md.ceiti.techshopapi.util.ConstraintViolationMessage;
import org.hibernate.annotations.Check;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,
            unique = true,
            columnDefinition = "varchar(30)")
    @Check(constraints = "username ~ '^[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*$'")
    @NotBlank(message = ConstraintViolationMessage.NOT_BLANK)
    @Size(
            min = 6,
            max = 30,
            message = ConstraintViolationMessage.SIZE
    )
    @Pattern.List(
            {
                    @Pattern(
                            regexp = "^[a-zA-Z0-9.]+$",
                            message = ConstraintViolationMessage.CONTAIN_ONLY_LETTERS_NUMBERS_PERIODS
                    ),
                    @Pattern(
                            regexp = "^(?!\\.)(?!.*\\.$).*$",
                            message = ConstraintViolationMessage.CANNOT_BEGIN_OR_END_WITH_PERIODS
                    )
            }
    )
    private String username;

    @Column(nullable = false)
    @NotBlank(message = ConstraintViolationMessage.NOT_BLANK)
    @Size(
            min = 8,
            max = 100,
            message = ConstraintViolationMessage.SIZE
    )
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$",
            message = ConstraintViolationMessage.LEAST_CAPITAL_LETTER_NUMBER_SYMBOL
    )
    private String password;

    @Column(nullable = false,
            columnDefinition = "varchar(30)")
    @Enumerated(EnumType.STRING)
    @NotNull(message = ConstraintViolationMessage.NOT_NULL)
    private Role role;

    @Column(nullable = false)
    @NotBlank(message = ConstraintViolationMessage.NOT_BLANK)
    @Size(
            min = 2,
            max = 255,
            message = ConstraintViolationMessage.SIZE
    )
    private String firstName;

    @Column(nullable = false)
    @NotBlank(message = ConstraintViolationMessage.NOT_BLANK)
    @Size(
            min = 2,
            max = 255,
            message = ConstraintViolationMessage.SIZE
    )
    private String lastName;

    @Column(nullable = false, columnDefinition = "varchar(10)")
    @Enumerated(EnumType.STRING)
    @NotNull(message = ConstraintViolationMessage.NOT_NULL)
    private Gender gender;

    @Column(nullable = false)
    @Check(constraints = "date_part('year', age(date_of_birth)) >= 18")
    @NotNull(message = ConstraintViolationMessage.NOT_NULL)
    @Past(message = ConstraintViolationMessage.PAST)
    private LocalDate dateOfBirth;

    @Column(nullable = false,
            unique = true,
            columnDefinition = "varchar(254)")
    @Check(constraints = "email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+$'")
    @NotBlank(message = ConstraintViolationMessage.NOT_BLANK)
    @Size(
            min = 3,
            max = 254,
            message = ConstraintViolationMessage.EMAIL
    )
    @Email(message = ConstraintViolationMessage.EMAIL)
    private String email;

    @Column(nullable = false,
            unique = true,
            columnDefinition = "varchar(16)")
    @Check(constraints = "phone_number ~ '^\\+[0-9]+$'")
    @NotBlank(message = ConstraintViolationMessage.NOT_BLANK)
    @Size(
            min = 9,
            max = 16,
            message = ConstraintViolationMessage.INTERNATIONAL_FORMAT
    )
    @Pattern(
            regexp = "^(\\+[0-9]+)?([0-9]+)$",
            message = ConstraintViolationMessage.INTERNATIONAL_FORMAT
    )
    private String phoneNumber;

    @Column(nullable = false)
    @NotNull(message = ConstraintViolationMessage.NOT_NULL)
    private Boolean enabled;
}
