package com.example.authhentification.controller;
import com.example.authhentification.dto.AuthenticationRequest;
import com.example.authhentification.dto.RegisterRequest;
import com.example.authhentification.dto.UserDto;
import com.example.authhentification.entity.User;
import com.example.authhentification.repository.UserRepository;
import com.example.authhentification.services.auth.AuthService;
import com.example.authhentification.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor

public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    public final String TOKEN_PREFIX = "Bearer ";
    public final String HEADER_STRING = "Authorization";

    private final AuthService authService;
    @GetMapping("/api/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = authService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws IOException, JSONException {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch(BadCredentialsException e){
            throw  new BadCredentialsException("Incorrect username or password.");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        if(optionalUser.isPresent()){
            response.getWriter().write(new JSONObject()
                    .put("userId", optionalUser.get().getId())
                    .put("role", optionalUser.get().getRole())
                    .toString()
            );
            response.addHeader("Access-Control-Expose-Headers", "Authorization");
            response.addHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");
            response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        if(authService.hasUserWithEmail(registerRequest.getEmail())){
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto userDto = authService.createUser(registerRequest);
        return  new ResponseEntity<>(userDto, HttpStatus.OK);
    }
    @PostMapping("/adduser")
    public ResponseEntity<?>  createUser(@RequestBody RegisterRequest registerRequest){
        if(authService.hasUserWithEmail(registerRequest.getEmail())){
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto userDto = authService.createUser(registerRequest);
        return  new ResponseEntity<>(userDto, HttpStatus.OK);
    }


    @DeleteMapping("/deleteuser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        authService.deleteUser(id);
        return ResponseEntity.ok().body("User deleted successfully");
    }

    @PutMapping("/updateuser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody RegisterRequest registerRequest) {
        authService.updateUser(id, registerRequest);
        return ResponseEntity.ok().body("User updated successfully");
    }

}