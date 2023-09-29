package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GlobalMiddleware is a middleware function that will be applied to all routes.
func GlobalMiddleware(c *gin.Context) {
	// Check if the Authorization header is present in the request.
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		c.Abort() // Abort further processing if unauthorized.
		return
	}

	// Continue to the next middleware or route handler.
	c.Next()
}
