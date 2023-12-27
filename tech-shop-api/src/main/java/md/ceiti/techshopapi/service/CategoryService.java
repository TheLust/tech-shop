package md.ceiti.techshopapi.service;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.entity.product.Category;
import md.ceiti.techshopapi.exception.NotFoundException;
import md.ceiti.techshopapi.repository.CategoryRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> findAllParentCategories() {
        return categoryRepository.findAllByParent(null);
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("id"));
    }

    public Optional<Category> findByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Transactional
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Transactional
    public Category update(Category oldCategory, Category newCategory) {
        BeanUtils.copyProperties(newCategory, oldCategory, "id");
        return categoryRepository.save(oldCategory);
    }

    @Transactional
    public void delete(Category category) {
        categoryRepository.delete(category);
    }
}
