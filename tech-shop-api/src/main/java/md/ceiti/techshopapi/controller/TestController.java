package md.ceiti.techshopapi.controller;

import jakarta.validation.Valid;
import md.ceiti.techshopapi.entity.account.Account;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.url.base}/test")
public class TestController {

    @GetMapping(value = "/nush")
    public ResponseEntity<String> test() {
        return new ResponseEntity<>(
                "Test",
                HttpStatus.OK
        );
    }

    public ResponseEntity<String> nush (@RequestBody @Valid Account account,
                                        BindingResult bindingResult) {
        return  null;
    }
}
