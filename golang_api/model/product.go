package model

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	ProductName string  `json:"product_name" gorm:"-"`
	Description string  `json:"description" gorm:"-"`
	Price       float64 `json:"price" gorm:"-"`

	ProductCategory   ProductCategory `json:"product_category"`
	ProductCategoryID int             `json:"product_category_id"`
}

func (m Product) ToJSON() map[string]interface{} {
	return map[string]interface{}{
		"id":           m.ID,
		"product_name": m.ProductName,
		"description":  m.Description,
		"price":        m.Price,
		"created_at":   m.CreatedAt,
		"updated_at":   m.UpdatedAt,
		"deleted_at":   m.DeletedAt,
		"product_category": map[string]interface{}{
			"id":                    m.ProductCategory.ID,
			"product_category_name": m.ProductCategory.ProductCategoryName,
		},
	}
}
