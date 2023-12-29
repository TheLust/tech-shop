package md.ceiti.techshopapi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.ProductRequest;
import md.ceiti.techshopapi.dto.response.ProductResponse;
import md.ceiti.techshopapi.facade.ProductFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("${api.url.base}/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProductFacade productFacade;

    @PostMapping(value = "/products")
    public ResponseEntity<ProductResponse> save(@RequestParam("categoryId") Long categoryId,
                                                @RequestPart("images") MultipartFile[] images,
                                                @RequestPart @Valid ProductRequest productRequest,
                                                BindingResult bindingResult) {
        return new ResponseEntity<>(
                productFacade.save(categoryId, images, productRequest, bindingResult),
                HttpStatus.OK
        );
    }
}
