package md.ceiti.techshopapi.controller;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.response.ProductResponse;
import md.ceiti.techshopapi.facade.ProductFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.url.base}/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductFacade productFacade;

    @GetMapping(value = "")
    public ResponseEntity<List<ProductResponse>> findAll(@RequestParam(value = "category", required = false) String categoryName) {
        return new ResponseEntity<>(
                productFacade.findAll(categoryName),
                HttpStatus.OK
        );
    }
}
