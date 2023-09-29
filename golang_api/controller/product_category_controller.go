package controller

import (
	"net/http"
	"yourmodule/database"
	"yourmodule/model"

	"github.com/gin-gonic/gin"
)

func GetProductCategories(c *gin.Context) {
	var categories []model.ProductCategory
	if err := database.DB.Preload("Products").Find(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Map your categories to JSON using the ToJSON method
	var categoryResponses []map[string]interface{}
	for _, category := range categories {
		// Create a slice to store product JSON representations
		var productResponses []map[string]interface{}

		// Loop through products in the category and convert them to JSON
		for _, product := range category.Products {
			productResponses = append(productResponses, product.ToJSON())
		}

		// Add category information to the categoryResponses slice
		categoryResponses = append(categoryResponses, map[string]interface{}{
			"id":                    category.ID,
			"product_category_name": category.ProductCategoryName,
			"products":              productResponses,
		})
	}

	c.JSON(http.StatusOK, gin.H{"data": categoryResponses})
}

func GetProductCategory(c *gin.Context) {
	var category model.ProductCategory
	categoryID := c.Param("id")
	if err := database.DB.First(&category, categoryID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product category not found"})
		return
	}
	c.JSON(http.StatusOK, category)
}

func CreateProductCategory(c *gin.Context) {
	var category model.ProductCategory
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&category)
	c.JSON(http.StatusCreated, gin.H{"data": &category})
}

func UpdateProductCategory(c *gin.Context) {
	categoryID := c.Param("id")
	var category model.ProductCategory
	if err := database.DB.First(&category, categoryID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product category not found"})
		return
	}
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Save(&category)
	c.JSON(http.StatusOK, category)
}

func DeleteProductCategory(c *gin.Context) {
	categoryID := c.Param("id")
	var category model.ProductCategory
	if err := database.DB.First(&category, categoryID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product category not found"})
		return
	}
	database.DB.Delete(&category)
	c.JSON(http.StatusNoContent, nil)
}
