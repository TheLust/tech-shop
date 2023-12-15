package md.ceiti.techshopapi.entity.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import md.ceiti.techshopapi.util.ConstraintViolationMessage;
import org.hibernate.annotations.Check;

import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = ConstraintViolationMessage.NOT_NULL)
    @ManyToOne
    private Category category;

    @Column(nullable = false)
    @NotNull(message = ConstraintViolationMessage.NOT_NULL)
    private Double price;

    @Column(columnDefinition = "varchar(8)")
    @Enumerated(value = EnumType.STRING)
    private DiscountType discountType;

    @Check(
            constraints = "(discount_type IS NULL AND discount IS NULL) OR " +
                          "(discount_type = 'AMOUNT' AND discount > 0 AND discount < price) OR " +
                          "(discount_type = 'PERCENT' AND discount > 0 AND discount < 100)"
    )
    private Double discount;

    @ElementCollection
    private Map<String, String> general;

    @ElementCollection
    private Map<String, String> display;

    @ElementCollection
    private Map<String, String> processor;

    @ElementCollection
    private Map<String, String> memory;

    @ElementCollection
    private Map<String, String> gpu;

    @ElementCollection
    private Map<String, String> functionality;

    @ElementCollection
    private Map<String, String> connectivity;
}
