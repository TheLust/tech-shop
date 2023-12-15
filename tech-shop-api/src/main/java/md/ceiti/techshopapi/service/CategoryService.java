package md.ceiti.techshopapi.service;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.entity.product.Category;
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

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public List<Category> findAllParentCategories() {
        return categoryRepository.findAllByParent(null);
    }

    public List<Category> findAllSubCategories() {
        return categoryRepository.findAll()
                .stream()
                .filter(category -> category.getParent() != null)
                .toList();
    }

    public List<Category> findAllSubCategories(Long id) {
        Optional<Category> parent = categoryRepository.findById(id);
        if (parent.isEmpty()) {
            return new ArrayList<>();
        }

        return parent.get().getSubCategories();
    }

    public List<Category> findAllSubCategories(String name) {
        Optional<Category> parent = categoryRepository.findByName(name);
        if (parent.isEmpty()) {
            return new ArrayList<>();
        }

        return parent.get().getSubCategories();
    }

    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
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
        BeanUtils.copyProperties(oldCategory, newCategory, "id");
        return categoryRepository.save(oldCategory);
    }

    @Transactional
    public void delete(Category category) {
        categoryRepository.delete(category);
    }
}
