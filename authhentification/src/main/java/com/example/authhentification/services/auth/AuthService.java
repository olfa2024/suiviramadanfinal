package com.example.authhentification.services.auth;

import com.example.authhentification.dto.RegisterRequest;
import com.example.authhentification.dto.UserDto;
import com.example.authhentification.entity.User;
import com.example.authhentification.repository.UserRepository;

import java.util.List;
import java.util.Optional;

public interface AuthService {

    UserDto createUser(RegisterRequest registerRequest);


    Boolean hasUserWithEmail(String email);

    List<User> getAllUsers();

    void deleteUser(Long id);

    void updateUser(Long userId, RegisterRequest registerRequest);





    }
