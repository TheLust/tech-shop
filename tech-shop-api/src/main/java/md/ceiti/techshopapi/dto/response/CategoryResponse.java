package md.ceiti.techshopapi.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponse {

    private Long id;

    private CategoryResponse parent;

    private String name;
}
