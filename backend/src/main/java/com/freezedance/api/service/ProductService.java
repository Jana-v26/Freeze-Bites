package com.freezedance.api.service;

import com.freezedance.api.dto.request.ProductRequest;
import com.freezedance.api.dto.response.ProductResponse;
import com.freezedance.api.exception.ResourceNotFoundException;
import com.freezedance.api.model.Category;
import com.freezedance.api.model.Product;
import com.freezedance.api.model.ProductImage;
import com.freezedance.api.model.ProductVariant;
import com.freezedance.api.repository.CategoryRepository;
import com.freezedance.api.repository.ProductRepository;
import com.freezedance.api.repository.ReviewRepository;
import com.freezedance.api.util.SlugGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;

    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findByIsActiveTrue(pageable).map(this::mapToResponse);
    }

    public ProductResponse getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with slug: " + slug));
        return mapToResponse(product);
    }

    public List<ProductResponse> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrueAndIsActiveTrue().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public Page<ProductResponse> getProductsByCategory(String categorySlug, Pageable pageable) {
        return productRepository.findByCategorySlugAndIsActiveTrue(categorySlug, pageable).map(this::mapToResponse);
    }

    public Page<ProductResponse> searchProducts(String query, Pageable pageable) {
        return productRepository.search(query, pageable)
                .map(this::mapToResponse);
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        Product product = new Product();
        product.setName(request.getName());
        product.setSlug(SlugGenerator.toSlug(request.getName()));
        product.setDescription(request.getDescription());
        product.setShortDesc(request.getShortDesc());
        product.setBasePrice(request.getBasePrice());
        product.setDiscountPct(request.getDiscountPct());
        product.setCategory(category);
        product.setProductType(request.getProductType());
        product.setIsFeatured(request.getIsFeatured() != null && request.getIsFeatured());
        product.setIsActive(true);
        product.setMetaTitle(request.getMetaTitle());
        product.setMetaDesc(request.getMetaDesc());

        Product saved = productRepository.save(product);
        return mapToResponse(saved);
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        product.setName(request.getName());
        product.setSlug(SlugGenerator.toSlug(request.getName()));
        product.setDescription(request.getDescription());
        product.setShortDesc(request.getShortDesc());
        product.setBasePrice(request.getBasePrice());
        product.setDiscountPct(request.getDiscountPct());
        product.setCategory(category);
        product.setProductType(request.getProductType());
        product.setIsFeatured(request.getIsFeatured() != null && request.getIsFeatured());
        product.setMetaTitle(request.getMetaTitle());
        product.setMetaDesc(request.getMetaDesc());

        Product saved = productRepository.save(product);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        productRepository.delete(product);
    }

    private ProductResponse mapToResponse(Product product) {
        Double avgRating = reviewRepository.averageRatingByProductId(product.getId());
        Long reviewCount = reviewRepository.countByProductIdAndIsApprovedTrue(product.getId());

        List<ProductResponse.VariantResponse> variantResponses = null;
        if (product.getVariants() != null) {
            variantResponses = product.getVariants().stream().map(v ->
                    ProductResponse.VariantResponse.builder()
                            .id(v.getId())
                            .weightGrams(v.getWeightGrams())
                            .sku(v.getSku())
                            .price(v.getPrice())
                            .stockQty(v.getStockQty())
                            .build()
            ).collect(Collectors.toList());
        }

        List<ProductResponse.ImageResponse> imageResponses = null;
        if (product.getImages() != null) {
            imageResponses = product.getImages().stream().map(img ->
                    ProductResponse.ImageResponse.builder()
                            .id(img.getId())
                            .imageUrl(img.getImageUrl())
                            .altText(img.getAltText())
                            .isPrimary(img.getIsPrimary())
                            .build()
            ).collect(Collectors.toList());
        }

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .description(product.getDescription())
                .shortDesc(product.getShortDesc())
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .categorySlug(product.getCategory() != null ? product.getCategory().getSlug() : null)
                .productType(product.getProductType())
                .basePrice(product.getBasePrice())
                .discountPct(product.getDiscountPct())
                .isFeatured(product.getIsFeatured())
                .variants(variantResponses)
                .images(imageResponses)
                .avgRating(avgRating != null ? avgRating : 0.0)
                .reviewCount(reviewCount != null ? reviewCount : 0L)
                .build();
    }
}
