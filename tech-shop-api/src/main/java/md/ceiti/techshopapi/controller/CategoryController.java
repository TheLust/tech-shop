package md.ceiti.techshopapi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.CategoryRequest;
import md.ceiti.techshopapi.dto.response.CategoryResponse;
import md.ceiti.techshopapi.facade.CategoryFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.url.base}/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryFacade categoryFacade;

    @GetMapping(value = "")
    public ResponseEntity<List<CategoryResponse>> findAllParentCategories() {
        return new ResponseEntity<>(
                categoryFacade.findAll(),
                HttpStatus.OK
        );
    }

    @PostMapping(value = "")
    public ResponseEntity<CategoryResponse> save(@RequestParam(value = "parentId", required = false) Long parentId,
                                                 @RequestBody @Valid CategoryRequest categoryRequest,
                                                 BindingResult bindingResult) {
        return new ResponseEntity<>(
                categoryFacade.save(parentId, categoryRequest, bindingResult),
                HttpStatus.OK
        );
    }

    @PutMapping(value = "")
    public ResponseEntity<CategoryResponse> update(@RequestParam(value = "id") Long id,
                                                   @RequestParam(value = "parentId", required = false) Long parentId,
                                                   @RequestBody @Valid CategoryRequest categoryRequest,
                                                   BindingResult bindingResult) {
        return new ResponseEntity<>(
                categoryFacade.update(id, parentId, categoryRequest, bindingResult),
                HttpStatus.OK
        );
    }

    @DeleteMapping(value = "")
    public ResponseEntity<String> delete(@RequestParam(value = "id") Long id) {
        return new ResponseEntity<>(
                categoryFacade.delete(id),
                HttpStatus.OK
        );
    }
}
