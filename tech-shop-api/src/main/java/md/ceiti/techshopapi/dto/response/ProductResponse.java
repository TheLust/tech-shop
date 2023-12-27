package md.ceiti.techshopapi.dto.response;

import lombok.Getter;
import lombok.Setter;
import md.ceiti.techshopapi.entity.product.DiscountType;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ProductResponse {

    private Long id;
    private String name;
    private CategoryNestedResponse category;
    private Double price;
    private DiscountType discountType;
    private Double discount;
    private Map<String, String> general;
    private Map<String, String> display;
    private Map<String, String> processor;
    private Map<String, String> memory;
    private Map<String, String> gpu;
    private Map<String, String> functionality;
    private List<String> images;
}
