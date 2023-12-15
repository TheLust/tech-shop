package md.ceiti.techshopapi.facade;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.CategoryRequest;
import md.ceiti.techshopapi.dto.response.CategoryResponse;
import md.ceiti.techshopapi.dto.response.ParentCategoryResponse;
import md.ceiti.techshopapi.entity.product.Category;
import md.ceiti.techshopapi.exception.NotFoundException;
import md.ceiti.techshopapi.mapper.CategoryMapper;
import md.ceiti.techshopapi.service.CategoryService;
import md.ceiti.techshopapi.util.ConstraintViolationMessage;
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
    private BindingResult bindingResult;

    public List<CategoryResponse> findAll() {
        return categoryService.findAllSubCategories()
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .toList();
    }

    public List<ParentCategoryResponse> findAllParentCategories() {
        return categoryService.findAllParentCategories()
                .stream()
                .map(categoryMapper::toParentCategoryResponse)
                .toList();
    }

    public CategoryResponse save(Long parentId,
                                 CategoryRequest categoryRequest,
                                 BindingResult bindingResult) {
        Category category = categoryMapper.toCategory(categoryRequest);

        if (parentId != null) {
            Optional<Category> parent = categoryService.findById(parentId);
            if (parent.isEmpty()) {
                bindingResult.rejectValue("parent", "notFound", ConstraintViolationMessage.NOT_FOUND);
            } else {
                category.setParent(parent.get());
            }
        }

        categoryValidator.validate(category, bindingResult);
        ErrorUtils.validate(bindingResult);

        return categoryMapper.toCategoryResponse(
                categoryService.save(category)
        );
    }

    public String delete(Long id) {
        Optional<Category> category = categoryService.findById(id);
        if (category.isEmpty()) {
            bindingResult.rejectValue("parent", "notFound", ConstraintViolationMessage.NOT_FOUND);
            ErrorUtils.validate(bindingResult);
        } else {
            categoryService.delete(category.get());
        }

        return "";
    }
}
