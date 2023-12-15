package md.ceiti.techshopapi.entity.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import md.ceiti.techshopapi.util.ConstraintViolationMessage;

import java.util.List;

@Entity
@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Category parent;

    @OneToMany(mappedBy = "parent")
    private List<Category> subCategories;

    @Column(nullable = false,
            unique = true,
            columnDefinition = "varchar(30)")
    @NotBlank(message = ConstraintViolationMessage.NOT_BLANK)
    @Size(
            min = 2,
            max = 30,
            message = ConstraintViolationMessage.SIZE
    )
    private String name;
}
