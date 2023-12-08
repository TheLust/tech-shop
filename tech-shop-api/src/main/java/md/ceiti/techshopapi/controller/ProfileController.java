package md.ceiti.techshopapi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import md.ceiti.techshopapi.dto.request.AccountProfileUpdateRequest;
import md.ceiti.techshopapi.dto.response.AccountProfileResponse;
import md.ceiti.techshopapi.entity.AccountDetails;
import md.ceiti.techshopapi.facade.ProfileFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.url.base}/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileFacade profileFacade;

    @GetMapping(value = "")
    public ResponseEntity<AccountProfileResponse> getProfileInfo(@AuthenticationPrincipal AccountDetails accountDetails) {
        return new ResponseEntity<>(
                profileFacade.getProfileInfo(accountDetails),
                HttpStatus.OK
        );
    }

    @PutMapping(value = "")
    public ResponseEntity<AccountProfileResponse> updateProfileInfo(@AuthenticationPrincipal AccountDetails accountDetails,
                                                                    @RequestBody @Valid AccountProfileUpdateRequest account,
                                                                    BindingResult bindingResult) {
        return new ResponseEntity<>(
                profileFacade.updateProfileInfo(accountDetails, account, bindingResult),
                HttpStatus.OK
        );
    }
}
