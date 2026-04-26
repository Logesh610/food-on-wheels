package com.foodonwheels.backend.config;

import com.foodonwheels.backend.model.MenuItem;
import com.foodonwheels.backend.model.Restaurant;
import com.foodonwheels.backend.repository.RestaurantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(RestaurantRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                // Restaurant 1
                Restaurant r1 = new Restaurant();
                r1.setName("The Burger Club");
                r1.setCuisine("American, Burgers");
                r1.setRating(4.5);
                r1.setDeliveryTime("25-30");
                r1.setPriceForTwo(500);
                r1.setImage("https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop&q=60");
                r1.setCategory("Fast Food");
                r1.setFeatured(true);

                MenuItem m1 = new MenuItem();
                m1.setName("Zesty Beast Burger");
                m1.setPrice(189.0);
                m1.setDescription("Double patty with secret sauce, jalapeños and cheddar.");
                m1.setImage("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60");
                m1.setCategory("Burgers");
                m1.setBestseller(true);
                m1.setRestaurant(r1);

                MenuItem m2 = new MenuItem();
                m2.setName("Peri Peri Fries");
                m2.setPrice(99.0);
                m2.setDescription("Crispy golden fries with house-blend spicy seasoning.");
                m2.setImage("https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60");
                m2.setCategory("Sides");
                m2.setRestaurant(r1);

                r1.setMenu(List.of(m1, m2));
                repository.save(r1);

                // Restaurant 2
                Restaurant r2 = new Restaurant();
                r2.setName("Spicy Tadka");
                r2.setCuisine("North Indian, Mughlai");
                r2.setRating(4.7);
                r2.setDeliveryTime("40-45");
                r2.setPriceForTwo(600);
                r2.setImage("https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60");
                r2.setCategory("Indian");
                r2.setFeatured(true);

                MenuItem m3 = new MenuItem();
                m3.setName("Butter Chicken");
                m3.setPrice(449.0);
                m3.setDescription("Creamy tomato-based chicken curry — a timeless classic.");
                m3.setImage("https://images.unsplash.com/photo-1603894584202-933259bb49ec?w=500&auto=format&fit=crop&q=60");
                m3.setCategory("Main Course");
                m3.setBestseller(true);
                m3.setRestaurant(r2);

                r2.setMenu(List.of(m3));
                repository.save(r2);

                System.out.println("Database seeded with initial restaurant data!");
            }
        };
    }
}
