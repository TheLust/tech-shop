package md.ceiti.techshopapi.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(value = { "parent" })
public class CategoryRequest {
    private CategoryRequest parent;
    private String name;
}
