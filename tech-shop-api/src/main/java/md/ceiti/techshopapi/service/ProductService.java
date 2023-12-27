package md.ceiti.techshopapi.service;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.entity.product.Category;
import md.ceiti.techshopapi.entity.product.Product;
import md.ceiti.techshopapi.exception.NotFoundException;
import md.ceiti.techshopapi.repository.ProductRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public List<Product> findAllByCategory(Category category) {
        List<Product> products = productRepository.findAllByCategory(category);
        products.addAll(productRepository.findAllByCategoryParent(category));
        return products;
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("id"));
    }

    @Transactional
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public Product update(Product oldProduct, Product newProduct) {
        BeanUtils.copyProperties(newProduct, oldProduct, "id");
        return productRepository.save(oldProduct);
    }

    @Transactional
    public void delete(Product product) {
        productRepository.delete(product);
    }
}
