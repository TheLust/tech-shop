package md.ceiti.techshopapi.validator;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.entity.product.Category;
import md.ceiti.techshopapi.entity.product.Product;
import md.ceiti.techshopapi.util.ValidationUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Map;

@Component
@RequiredArgsConstructor
@SuppressWarnings("NullableProblems")
public class ProductValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return Product.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Product product = (Product) target;

        ValidationUtils.validate(product, errors);
    }
}
