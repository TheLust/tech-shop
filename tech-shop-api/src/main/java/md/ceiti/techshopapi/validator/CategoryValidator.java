package md.ceiti.techshopapi.validator;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.entity.product.Category;
import md.ceiti.techshopapi.service.AccountService;
import md.ceiti.techshopapi.service.CategoryService;
import md.ceiti.techshopapi.util.ConstraintViolationMessage;
import md.ceiti.techshopapi.util.ValidationUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@SuppressWarnings("NullableProblems")
public class CategoryValidator implements Validator {

    private final CategoryService categoryService;

    @Override
    public boolean supports(Class<?> clazz) {
        return Category.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Category category = (Category) target;

        ValidationUtils.validate(category, errors);

        if (category.getParent() != null) {
            if (category.getParent().getParent() != null) {
                errors.rejectValue("parent", "invalidParent", "invalid parent");
            }
        }

        if (category.getName() != null) {
            if (categoryService.findByName(category.getName()).isPresent()) {
                errors.rejectValue("name", "alreadyExists", ConstraintViolationMessage.ALREADY_EXISTS);
            }
        }
    }

    public void validate(Object target, @NotNull Long id, Errors errors) {
        Category category = (Category) target;

        ValidationUtils.validate(category, errors);

        if (category.getParent() != null) {
            if (category.getParent().getParent() != null) {
                errors.rejectValue("parent", "invalidParent", "invalid parent");
            }
        }

        if (category.getName() != null) {
            Optional<Category> foundCategory = categoryService.findByName(category.getName());
            if (foundCategory.isPresent() && !foundCategory.get().getId().equals(id)) {
                errors.rejectValue("name", "alreadyExists", ConstraintViolationMessage.ALREADY_EXISTS);
            }
        }
    }
}
