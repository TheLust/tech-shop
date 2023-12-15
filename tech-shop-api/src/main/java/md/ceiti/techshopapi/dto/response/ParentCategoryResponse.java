package md.ceiti.techshopapi.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ParentCategoryResponse {

    private String name;
    private List<String> subCategories;
}
