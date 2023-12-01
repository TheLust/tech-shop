package md.ceiti.techshopapi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.LoginRequest;
import md.ceiti.techshopapi.dto.request.RegisterRequest;
import md.ceiti.techshopapi.facade.AuthFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.url.base}/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthFacade authFacade;

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequest loginRequest) {
        return new ResponseEntity<>(
                authFacade.login(loginRequest),
                HttpStatus.OK
        );
    }

    @PostMapping(value = "/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterRequest registerRequest,
                                           BindingResult bindingResult) {
        return new ResponseEntity<>(
                authFacade.register(registerRequest, bindingResult),
                HttpStatus.OK
        );
    }
}
