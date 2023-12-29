package md.ceiti.techshopapi.entity.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import md.ceiti.techshopapi.util.ConstraintViolationMessage;
import org.hibernate.annotations.Check;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, columnDefinition = "varchar(255)")
    @NotBlank(message = ConstraintViolationMessage.NOT_BLANK)
    @Size(
            min = 10,
            max = 255,
            message = ConstraintViolationMessage.SIZE
    )
    private String name;

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

    @Column(nullable = false)
    @NotNull(message = ConstraintViolationMessage.NOT_NULL)
    private Integer available;

    /**
     * Must contain producer, series, model
     * */

    @ElementCollection
    private Map<String, String> general;

    /**
     * Must contain at least one
     * */

    @ElementCollection
    @NotEmpty(message = ConstraintViolationMessage.NOT_EMPTY)
    private List<byte[]> images;

    /**
     * Must contain diagonal, resolution
     * */

    @ElementCollection
    private Map<String, String> display;

    /**
     * Must contain processor
     * */

    @ElementCollection
    private Map<String, String> processor;

    /**
     * Must contain RAM, ROM
     * */

    @ElementCollection
    private Map<String, String> memory;

    /**
     * Must contain GPU, type
     * */

    @ElementCollection
    private Map<String, String> gpu;

    /**
     * Must contain ports, connectivity
     * */

    @ElementCollection
    private Map<String, String> functionality;

    /**
     * Must contain wifi, bluetooth
     * */

    @ElementCollection
    private Map<String, String> connectivity;
}
