package com.foodonwheels.backend.repository;

import com.foodonwheels.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByFeaturedTrue();
    
    @Query("SELECT DISTINCT r.category FROM Restaurant r")
    List<String> findDistinctCategories();

    @Query("SELECT DISTINCT r FROM Restaurant r LEFT JOIN r.menu m " +
           "WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(m.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Restaurant> searchRestaurants(@Param("query") String query);

    @Query("SELECT r FROM Restaurant r WHERE " +
           "(:isVeg IS NULL OR r.isVeg = :isVeg) AND " +
           "(:rating IS NULL OR r.rating >= :rating) AND " +
           "(:cuisine IS NULL OR LOWER(r.cuisine) = LOWER(:cuisine)) AND " +
           "(:priceRange IS NULL OR r.priceForTwo <= :priceRange)")
    List<Restaurant> filterRestaurants(
            @Param("isVeg") Boolean isVeg,
            @Param("rating") Double rating,
            @Param("cuisine") String cuisine,
            @Param("priceRange") Integer priceRange
    );
}
