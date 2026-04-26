package com.foodonwheels.backend.controller;

import com.foodonwheels.backend.model.Restaurant;
import com.foodonwheels.backend.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:5173")
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        return restaurantRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/featured")
    public List<Restaurant> getFeaturedRestaurants() {
        return restaurantRepository.findByFeaturedTrue();
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return restaurantRepository.findDistinctCategories();
    }
}
