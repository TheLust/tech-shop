package md.ceiti.techshopapi.mapper;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.CategoryRequest;
import md.ceiti.techshopapi.dto.response.CategoryResponse;
import md.ceiti.techshopapi.dto.response.ParentCategoryResponse;
import md.ceiti.techshopapi.entity.product.Category;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoryMapper {

    private final ModelMapper mapper;

    public CategoryResponse toCategoryResponse(Category category) {
        return mapper.map(category, CategoryResponse.class);
    }

    public ParentCategoryResponse toParentCategoryResponse(Category category) {
        ParentCategoryResponse parentCategoryResponse = mapper.map(category, ParentCategoryResponse.class);
        parentCategoryResponse.setSubCategories(
                category.getSubCategories().stream()
                        .map(Category::getName)
                        .toList()
        );
        return parentCategoryResponse;
    }

    public Category toCategory(CategoryRequest categoryRequest) {
        return mapper.map(categoryRequest, Category.class);
    }
}
