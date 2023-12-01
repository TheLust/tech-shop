package md.ceiti.techshopapi.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.SneakyThrows;
import md.ceiti.techshopapi.entity.Account;
import md.ceiti.techshopapi.entity.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.subject}")
    private String subject;
    private static final String USERNAME_FIELD = "username";
    private static final String ROLE_FIELD = "role";
    private final static Integer MINUTES = 24 * 60;

    public String generateToken(Account account) {
        return JWT.create()
                .withSubject(subject)
                .withClaim(USERNAME_FIELD, account.getUsername())
                .withClaim(ROLE_FIELD, account.getRole().toString())
                .withIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .withIssuer(issuer)
                .withExpiresAt(Date.from(ZonedDateTime.now().plusMinutes(MINUTES).toInstant()))
                .sign(Algorithm.HMAC256(secret));
    }

    public String validateTokenAndRetrieveClaim(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                .withSubject(subject)
                .withIssuer(issuer)
                .build();

        DecodedJWT jwt = verifier.verify(token);
        return jwt.getClaim(USERNAME_FIELD).asString();
    }

    @SneakyThrows
    public Role extractRoleFromToken(String jwtToken) {
        return JWT.require(Algorithm.HMAC256(secret))
                .build()
                .verify(jwtToken)
                .getClaim(ROLE_FIELD)
                .as(Role.class);
    }

    @SneakyThrows
    public String extractUsernameFromToken(String jwtToken) {
        return JWT.require(Algorithm.HMAC256(secret))
                .build()
                .verify(jwtToken)
                .getClaim(USERNAME_FIELD)
                .asString();
    }
}
