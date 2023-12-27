package md.ceiti.techshopapi.dto.request;

import lombok.Getter;
import lombok.Setter;
import md.ceiti.techshopapi.entity.product.DiscountType;

import java.util.Map;

@Getter
@Setter
public class ProductRequest {

    private String name;
    private Double price;
    private DiscountType discountType;
    private Double discount;
    private Map<String, String> general;
    private Map<String, String> display;
    private Map<String, String> processor;
    private Map<String, String> memory;
    private Map<String, String> gpu;
    private Map<String, String> functionality;
    private Map<String, String> connectivity;
}
