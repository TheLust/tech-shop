package md.ceiti.techshopapi.repository;

import md.ceiti.techshopapi.entity.product.Category;
import md.ceiti.techshopapi.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByCategory(Category category);
    List<Product> findAllByCategoryParent(Category category);
}
