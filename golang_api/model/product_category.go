package model

import "gorm.io/gorm"

type ProductCategory struct {
	gorm.Model
	ProductCategoryName string `json:"product_category_name"`
	Products            []Product
}

func (m ProductCategory) ToJSON() map[string]interface{} {
	return map[string]interface{}{
		"id":                    m.ID,
		"product_category_name": m.ProductCategoryName,
		"products":              m.Products,
	}
}
