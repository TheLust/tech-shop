package md.ceiti.techshopapi.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryResponse {

    private Long id;
    private String name;
    private List<CategoryResponse> subCategories;
}
