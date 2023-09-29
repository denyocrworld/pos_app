package main

import (
	"fmt"
	"yourmodule/controller"
	"yourmodule/database"

	"github.com/gin-gonic/gin"
)

func main() {
	// Inisialisasi koneksi database MySQL
	database.Connect()

	// Membuat router Gin
	router := gin.Default()
	// router.Use(middleware.GlobalMiddleware)

	// router.GET("/users", controller.GetUsers)
	// router.GET("/users/:id", controller.GetUser)
	// router.POST("/users", controller.CreateUser)
	// router.PUT("/users/:id", controller.UpdateUser)
	// router.DELETE("/users/:id", controller.DeleteUser)

	// router.GET("/products", controller.GetProducts)
	// router.GET("/products/:id", controller.GetProduct)
	// router.POST("/products", controller.CreateProduct)
	// router.PUT("/products/:id", controller.UpdateProduct)
	// router.DELETE("/products/:id", controller.DeleteProduct)

	// router.GET("/product_categories", controller.GetProductCategories)
	// router.GET("/product_categories/:id", controller.GetProductCategory)
	// router.POST("/product_categories", controller.CreateProductCategory)
	// router.PUT("/product_categories/:id", controller.UpdateProductCategory)
	// router.DELETE("/product_categories/:id", controller.DeleteProductCategory)

	// Contoh dengan routerGroup
	// Comment kode router yang di atas dulu yaa!

	routerGroup := router.Group("/api")
	routerGroup.GET("/products", controller.GetProducts)
	routerGroup.GET("/products/:id", controller.GetProduct)
	routerGroup.POST("/products", controller.CreateProduct)
	routerGroup.PUT("/products/:id", controller.UpdateProduct)
	routerGroup.DELETE("/products/:id", controller.DeleteProduct)

	routerGroup.GET("/product_categories", controller.GetProductCategories)
	routerGroup.GET("/product_categories/:id", controller.GetProductCategory)
	routerGroup.POST("/product_categories", controller.CreateProductCategory)
	routerGroup.PUT("/product_categories/:id", controller.UpdateProductCategory)
	routerGroup.DELETE("/product_categories/:id", controller.DeleteProductCategory)

	// Menjalankan server pada port 8080
	fmt.Println("OK!")
	router.Run(":8080")
}
