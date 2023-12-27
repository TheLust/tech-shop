package md.ceiti.techshopapi.facade;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.CategoryRequest;
import md.ceiti.techshopapi.dto.response.CategoryResponse;
import md.ceiti.techshopapi.entity.product.Category;
import md.ceiti.techshopapi.mapper.CategoryMapper;
import md.ceiti.techshopapi.service.CategoryService;
import md.ceiti.techshopapi.util.ErrorUtils;
import md.ceiti.techshopapi.validator.CategoryValidator;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CategoryFacade {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    private final CategoryValidator categoryValidator;

    public List<CategoryResponse> findAll() {
        return categoryService.findAllParentCategories()
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .toList();
    }

    public CategoryResponse save(Long parentId,
                                 CategoryRequest categoryRequest,
                                 BindingResult bindingResult) {
        Category category = categoryMapper.toCategory(categoryRequest);

        if (parentId != null) {
            category.setParent(categoryService.findById(parentId));
        }

        categoryValidator.validate(category, bindingResult);
        ErrorUtils.validate(bindingResult);

        return categoryMapper.toCategoryResponse(
                categoryService.save(category)
        );
    }

    public CategoryResponse update(Long id,
                                   Long parentId,
                                   CategoryRequest categoryRequest,
                                   BindingResult bindingResult) {
        Category category = categoryService.findById(id);
        Category updatedCategory = categoryMapper.toCategory(categoryRequest);

        if (parentId != null) {
            if (parentId == 0) {
                updatedCategory.setParent(null);
            } else {
                updatedCategory.setParent(categoryService.findById(parentId));
            }
        } else {
             updatedCategory.setParent(category.getParent());
        }

        categoryValidator.validate(updatedCategory, id, bindingResult);
        ErrorUtils.validate(bindingResult);

        return categoryMapper.toCategoryResponse(
                categoryService.update(category, updatedCategory)
        );
    }

    public String delete(Long id) {
        Category category = categoryService.findById(id);
        categoryService.delete(category);
        return "";
    }
}
