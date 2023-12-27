package md.ceiti.techshopapi.facade;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.ProductRequest;
import md.ceiti.techshopapi.dto.response.ProductResponse;
import md.ceiti.techshopapi.entity.product.Category;
import md.ceiti.techshopapi.entity.product.Product;
import md.ceiti.techshopapi.exception.NotFoundException;
import md.ceiti.techshopapi.mapper.ProductMapper;
import md.ceiti.techshopapi.service.CategoryService;
import md.ceiti.techshopapi.service.ProductService;
import md.ceiti.techshopapi.util.ErrorUtils;
import md.ceiti.techshopapi.validator.ProductValidator;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ProductFacade {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final ProductMapper productMapper;
    private final ProductValidator productValidator;

    public List<ProductResponse> findAll(String categoryName) {
        if (categoryName != null) {
            Optional<Category> category = categoryService.findByName(categoryName);
            if (category.isEmpty()) {
                throw new NotFoundException("category");
            }

            return productService.findAllByCategory(category.get())
                    .stream()
                    .map(productMapper::toProductResponse)
                    .toList();
        } else {
            return productService.findAll()
                    .stream()
                    .map(productMapper::toProductResponse)
                    .toList();
        }
    }

    public ProductResponse save(Long categoryId,
                                MultipartFile[] images,
                                ProductRequest productRequest,
                                BindingResult bindingResult) {
        Category category = categoryService.findById(categoryId);
        Product product = productMapper.toProduct(productRequest, images);
        product.setCategory(category);

        productValidator.validate(product, bindingResult);
        ErrorUtils.validate(bindingResult);

        return productMapper.toProductResponse(
                productService.save(product)
        );
    }
}
