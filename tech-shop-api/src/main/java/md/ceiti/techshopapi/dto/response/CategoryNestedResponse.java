package md.ceiti.techshopapi.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryNestedResponse {

    private Long id;
    private CategoryNestedResponse parent;
    private String name;
}
