package md.ceiti.techshopapi.mapper;

import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.ProductRequest;
import md.ceiti.techshopapi.dto.response.ProductResponse;
import md.ceiti.techshopapi.entity.product.Product;
import org.apache.tomcat.util.codec.binary.Base64;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final ModelMapper mapper;

    public Product toProduct(ProductRequest productRequest, MultipartFile[] images) {
        Product product = mapper.map(productRequest, Product.class);
        product.setImages(Arrays.stream(images).map(file -> {
            try {
                return file.getBytes();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).toList());

        return product;
    }

    public ProductResponse toProductResponse(Product product) {
        ProductResponse productResponse = mapper.map(product, ProductResponse.class);
        productResponse.setImages(
                product.getImages()
                        .stream()
                        .map(Base64::encodeBase64String)
                        .toList()
        );

        return productResponse;
    }
}
