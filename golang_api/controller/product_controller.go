package controller

import (
	"net/http"
	"yourmodule/database"
	"yourmodule/model"

	"github.com/gin-gonic/gin"
)

func GetProducts(c *gin.Context) {
	var products []model.Product
	if err := database.DB.Preload("ProductCategory").Find(&products).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Map your products to JSON using the ToJSON method
	var productResponses []map[string]interface{}
	for _, product := range products {
		productResponses = append(productResponses, product.ToJSON())
	}

	c.JSON(http.StatusOK, gin.H{"data": productResponses})
}

// func GetProducts(c *gin.Context) {
// 	// Mengambil parameter query string "page", "search", "sort_field", "sort_order", dan "limit" dari permintaan HTTP
// 	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
// 	search := c.DefaultQuery("search", "")
// 	sortField := c.DefaultQuery("sort_field", "created_at")
// 	sortOrder := c.DefaultQuery("sort_order", "asc")
// 	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

// 	var products []model.Product
// 	var totalProducts int64

// 	// Membuat kueri dasar
// 	query := database.DB.Preload("ProductCategory").Model(&model.Product{})

// 	// Menambahkan pencarian jika parameter "search" ada
// 	if search != "" {
// 		query = query.Where("name LIKE ?", "%"+search+"%")
// 	}

// 	// Menghitung total produk yang tersedia berdasarkan kueri pencarian
// 	if err := query.Count(&totalProducts).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Menambahkan pengurutan berdasarkan parameter "sort_field" dan "sort_order"
// 	query = query.Order(sortField + " " + sortOrder)

// 	// Menghitung offset untuk paginasi
// 	offset := (page - 1) * limit

// 	// Mengambil data produk dengan paginasi dan parameter "limit"
// 	if err := query.Offset(offset).Limit(limit).Find(&products).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Mengembalikan hasil dalam respons JSON
// 	c.JSON(http.StatusOK, gin.H{
// 		"data":         products,
// 		"current_page": page,
// 		"page_count":   limit,
// 		"count":        totalProducts,
// 	})
// }

func GetProduct(c *gin.Context) {
	var product model.Product
	productID := c.Param("id")
	if err := database.DB.First(&product, productID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}
	c.JSON(http.StatusOK, product)
}

func CreateProduct(c *gin.Context) {
	var product model.Product
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the specified ProductCategoryID exists in the database.
	var category model.ProductCategory
	if err := database.DB.First(&category, product.ProductCategoryID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ProductCategoryID"})
		return
	}

	// Create the product with the specified ProductCategoryID.
	database.DB.Create(&product)
	c.JSON(http.StatusCreated, gin.H{"data": product})
}

func UpdateProduct(c *gin.Context) {
	productID := c.Param("id")
	var product model.Product
	if err := database.DB.First(&product, productID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Save(&product)
	c.JSON(http.StatusOK, gin.H{"data": product})
}

func DeleteProduct(c *gin.Context) {
	productID := c.Param("id")
	var product model.Product
	if err := database.DB.First(&product, productID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}
	database.DB.Delete(&product)
	c.JSON(http.StatusOK, gin.H{"data": gin.H{"message": "success"}})
}
