import os

base = r'e:/Android Studio Projects/freeze-dance/backend/src/main/java/com/freezedance/api'

files = {}

files['model/enums/OrderStatus.java'] = """package com.freezedance.api.model.enums;

public enum OrderStatus {
    PENDING,
    CONFIRMED,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    CANCELLED,
    RETURNED,
    PAYMENT_FAILED
}
"""

files['repository/UserRepository.java'] = """package com.freezedance.api.repository;

import com.freezedance.api.model.User;
import com.freezedance.api.model.enums.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Page<User> findByRole(Role role, Pageable pageable);
}
"""

files['controller/ReviewController.java'] = """package com.freezedance.api.controller;

import com.freezedance.api.dto.request.ReviewRequest;
import com.freezedance.api.dto.response.ApiResponse;
import com.freezedance.api.dto.response.ReviewResponse;
import com.freezedance.api.model.User;
import com.freezedance.api.repository.UserRepository;
import com.freezedance.api.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products/{slug}/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ReviewResponse>>> getReviews(
            @PathVariable String slug, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.getProductReviews(slug, pageable)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResponse>> submitReview(
            @PathVariable String slug, @RequestBody @Valid ReviewRequest request) {
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(ApiResponse.success("Review submitted for approval",
                reviewService.createReview(userId, slug, request)));
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(((UserDetails) auth.getPrincipal()).getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }
}
"""

files['controller/AdminController.java'] = """package com.freezedance.api.controller;

import com.freezedance.api.dto.response.AnalyticsResponse;
import com.freezedance.api.dto.response.ApiResponse;
import com.freezedance.api.dto.response.OrderResponse;
import com.freezedance.api.dto.response.ReviewResponse;
import com.freezedance.api.model.enums.OrderStatus;
import com.freezedance.api.model.enums.Role;
import com.freezedance.api.repository.UserRepository;
import com.freezedance.api.service.AnalyticsService;
import com.freezedance.api.service.OrderService;
import com.freezedance.api.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AnalyticsService analyticsService;
    private final OrderService orderService;
    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @GetMapping("/analytics/dashboard")
    public ResponseEntity<ApiResponse<AnalyticsResponse>> getDashboard() {
        return ResponseEntity.ok(ApiResponse.success(analyticsService.getDashboardAnalytics()));
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<Page<OrderResponse>>> getAllOrders(
            @RequestParam(required = false) OrderStatus status, Pageable pageable) {
        Page<OrderResponse> orders = status != null
                ? orderService.getOrdersByStatus(status, pageable)
                : orderService.getAllOrders(pageable);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam OrderStatus status,
            @RequestParam(required = false) String trackingNumber,
            @RequestParam(required = false) String trackingUrl) {
        return ResponseEntity.ok(ApiResponse.success("Order status updated",
                orderService.updateOrderStatus(orderId, status, trackingNumber, trackingUrl)));
    }

    @GetMapping("/customers")
    public ResponseEntity<ApiResponse<Page<?>>> getCustomers(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(userRepository.findByRole(Role.CUSTOMER, pageable)));
    }

    @PutMapping("/reviews/{reviewId}/approve")
    public ResponseEntity<ApiResponse<ReviewResponse>> approveReview(@PathVariable Long reviewId) {
        return ResponseEntity.ok(ApiResponse.success("Review approved", reviewService.approveReview(reviewId)));
    }
}
"""

files['controller/UserController.java'] = """package com.freezedance.api.controller;

import com.freezedance.api.dto.request.AddressRequest;
import com.freezedance.api.dto.response.ApiResponse;
import com.freezedance.api.model.Address;
import com.freezedance.api.model.User;
import com.freezedance.api.repository.AddressRepository;
import com.freezedance.api.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getProfile() {
        return ResponseEntity.ok(ApiResponse.success(getCurrentUser()));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<User>> updateProfile(@RequestBody Map<String, String> updates) {
        User user = getCurrentUser();
        if (updates.containsKey("fullName")) user.setFullName(updates.get("fullName"));
        if (updates.containsKey("phone")) user.setPhone(updates.get("phone"));
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", userRepository.save(user)));
    }

    @GetMapping("/addresses")
    public ResponseEntity<ApiResponse<List<Address>>> getAddresses() {
        return ResponseEntity.ok(ApiResponse.success(addressRepository.findByUserId(getCurrentUser().getId())));
    }

    @PostMapping("/addresses")
    public ResponseEntity<ApiResponse<Address>> addAddress(@RequestBody @Valid AddressRequest request) {
        User user = getCurrentUser();
        Address address = Address.builder()
                .user(user).fullName(request.getFullName()).phone(request.getPhone())
                .addressLine1(request.getAddressLine1()).addressLine2(request.getAddressLine2())
                .city(request.getCity()).state(request.getState()).pincode(request.getPincode())
                .isDefault(request.getIsDefault() != null && request.getIsDefault()).build();
        return ResponseEntity.ok(ApiResponse.success("Address added successfully", addressRepository.save(address)));
    }

    @PutMapping("/addresses/{id}")
    public ResponseEntity<ApiResponse<Address>> updateAddress(@PathVariable Long id, @RequestBody @Valid AddressRequest request) {
        User user = getCurrentUser();
        Address address = addressRepository.findById(id).orElseThrow(() -> new RuntimeException("Address not found"));
        if (!address.getUser().getId().equals(user.getId())) throw new RuntimeException("Unauthorized");
        address.setFullName(request.getFullName()); address.setPhone(request.getPhone());
        address.setAddressLine1(request.getAddressLine1()); address.setAddressLine2(request.getAddressLine2());
        address.setCity(request.getCity()); address.setState(request.getState()); address.setPincode(request.getPincode());
        if (request.getIsDefault() != null) address.setIsDefault(request.getIsDefault());
        return ResponseEntity.ok(ApiResponse.success("Address updated successfully", addressRepository.save(address)));
    }

    @DeleteMapping("/addresses/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAddress(@PathVariable Long id) {
        User user = getCurrentUser();
        Address address = addressRepository.findById(id).orElseThrow(() -> new RuntimeException("Address not found"));
        if (!address.getUser().getId().equals(user.getId())) throw new RuntimeException("Unauthorized");
        addressRepository.delete(address);
        return ResponseEntity.ok(ApiResponse.success("Address deleted successfully", null));
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(((UserDetails) auth.getPrincipal()).getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
"""

files['service/ProductService.java'] = """package com.freezedance.api.service;

import com.freezedance.api.dto.request.ProductRequest;
import com.freezedance.api.dto.response.ProductResponse;
import com.freezedance.api.exception.ResourceNotFoundException;
import com.freezedance.api.model.Category;
import com.freezedance.api.model.Product;
import com.freezedance.api.repository.CategoryRepository;
import com.freezedance.api.repository.ProductRepository;
import com.freezedance.api.repository.ReviewRepository;
import com.freezedance.api.util.SlugGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;

    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(this::mapToResponse);
    }

    public ProductResponse getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + slug));
        return mapToResponse(product);
    }

    public List<ProductResponse> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public Page<ProductResponse> getProductsByCategory(String categorySlug, Pageable pageable) {
        Category category = categoryRepository.findBySlug(categorySlug)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + categorySlug));
        return productRepository.findByCategoryId(category.getId(), pageable).map(this::mapToResponse);
    }

    public Page<ProductResponse> searchProducts(String query, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query, pageable)
                .map(this::mapToResponse);
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + request.getCategoryId()));
        Product product = new Product();
        product.setName(request.getName());
        product.setSlug(SlugGenerator.toSlug(request.getName()));
        product.setDescription(request.getDescription());
        product.setShortDesc(request.getShortDesc());
        product.setBasePrice(request.getBasePrice());
        product.setDiscountPct(request.getDiscountPct() != null ? request.getDiscountPct() : BigDecimal.ZERO);
        product.setProductType(request.getProductType());
        product.setCategory(category);
        product.setIsFeatured(request.getIsFeatured() != null && request.getIsFeatured());
        product.setIsActive(true);
        product.setMetaTitle(request.getMetaTitle());
        product.setMetaDesc(request.getMetaDesc());
        return mapToResponse(productRepository.save(product));
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + request.getCategoryId()));
        product.setName(request.getName());
        product.setSlug(SlugGenerator.toSlug(request.getName()));
        product.setDescription(request.getDescription());
        product.setShortDesc(request.getShortDesc());
        product.setBasePrice(request.getBasePrice());
        if (request.getDiscountPct() != null) product.setDiscountPct(request.getDiscountPct());
        product.setProductType(request.getProductType());
        product.setCategory(category);
        if (request.getIsFeatured() != null) product.setIsFeatured(request.getIsFeatured());
        product.setMetaTitle(request.getMetaTitle());
        product.setMetaDesc(request.getMetaDesc());
        return mapToResponse(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.delete(productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id)));
    }

    private ProductResponse mapToResponse(Product product) {
        Double avgRating = reviewRepository.averageRatingByProductId(product.getId());
        long reviewCount = reviewRepository.countByProductIdAndIsApprovedTrue(product.getId());

        List<ProductResponse.VariantResponse> variants = product.getVariants() == null ? null :
                product.getVariants().stream().map(v -> ProductResponse.VariantResponse.builder()
                        .id(v.getId()).weightGrams(v.getWeightGrams()).price(v.getPrice())
                        .stockQty(v.getStockQty()).sku(v.getSku()).build()).collect(Collectors.toList());

        List<ProductResponse.ImageResponse> images = product.getImages() == null ? null :
                product.getImages().stream().map(img -> ProductResponse.ImageResponse.builder()
                        .id(img.getId()).imageUrl(img.getImageUrl()).altText(img.getAltText())
                        .isPrimary(img.getIsPrimary()).build()).collect(Collectors.toList());

        return ProductResponse.builder()
                .id(product.getId()).name(product.getName()).slug(product.getSlug())
                .description(product.getDescription()).shortDesc(product.getShortDesc())
                .productType(product.getProductType()).basePrice(product.getBasePrice())
                .discountPct(product.getDiscountPct())
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .categorySlug(product.getCategory() != null ? product.getCategory().getSlug() : null)
                .isFeatured(product.getIsFeatured()).variants(variants).images(images)
                .avgRating(avgRating != null ? avgRating : 0.0).reviewCount(reviewCount).build();
    }
}
"""

for rel_path, content in files.items():
    full_path = base + '/' + rel_path
    with open(full_path, 'w', newline='\n') as f:
        f.write(content)
    print('OK:', rel_path.split('/')[-1])

print('All files written')
