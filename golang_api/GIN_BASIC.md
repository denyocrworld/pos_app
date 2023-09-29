**Langkah 1: Instalasi Go, GIN, GORM, dan Driver MySQL**

1. **Instalasi Go**: Pastikan Anda telah menginstal Go di komputer Anda. Jika belum, Anda dapat mengunduhnya dari [situs resmi Go](https://golang.org/dl/).

2. **Instalasi GIN dan GORM**: Instalasi GIN dan GORM dengan menjalankan perintah berikut:

   ```shell
   go get -u github.com/gin-gonic/gin
   go get -u gorm.io/gorm
   ```

3. **Instalasi Driver MySQL**: Instalasi driver MySQL GORM dengan menjalankan perintah berikut:

   ```shell
   go get -u gorm.io/driver/mysql
   ```

**Langkah 2: Buat Struktur Direktori**
Buat struktur direktori yang sesuai dengan yang telah Anda tentukan sebelumnya:

```
- project-folder/
  - main.go
  - model/
    - user.go
  - database/
    - database.go
  - controller/
    - user_controller.go
```

**Langkah 3: Konfigurasi Database**
Di dalam folder `database`, buat file `database.go` untuk konfigurasi database MySQL menggunakan driver `gorm.io/driver/mysql`:

```go
// database/database.go
package database

import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

var (
    DB *gorm.DB
)

func InitDB() (*gorm.DB, error) {
    dsn := "username:password@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        return nil, err
    }
    DB = db
    return db, nil
}
```

Pastikan Anda mengganti `username`, `password`, `dbname`, dan konfigurasi lainnya sesuai dengan pengaturan MySQL Anda.

**Langkah 4: Buat Model**
Buat model `User` di dalam folder `model` seperti yang telah dijelaskan sebelumnya:

```go
// model/user.go
package model

import (
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Username string `json:"username"`
    Email    string `json:"email"`
    Password string `json:"-"`
}
```

**Langkah 5: Buat Controller**
Di dalam folder `controller`, buat file `user_controller.go` dan tambahkan rute CRUD:

```go
// controller/user_controller.go
package controller

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "path-to-your-project/model"
    "path-to-your-project/database"
    "gorm.io/gorm"
)

func GetUsers(c *gin.Context) {
    var users []model.User
    if err := database.DB.Find(&users).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, users)
}

func GetUserByID(c *gin.Context) {
    id := c.Param("id")
    var user model.User
    if err := database.DB.Where("id = ?", id).First(&user).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, user)
}

func CreateUser(c *gin.Context) {
    var user model.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    if err := database.DB.Create(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusCreated, user)
}

func UpdateUser(c *gin.Context) {
    id := c.Param("id")
    var user model.User
    if err := database.DB.Where("id = ?", id).First(&user).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    if err := database.DB.Save(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, user)
}

func DeleteUser(c *gin.Context) {
    id := c.Param("id")
    var user model.User
    if err := database.DB.Where("id = ?", id).First(&user).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    if err := database.DB.Delete(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
```

**Langkah 6: Panggil Fungsi-fungsi Rute di `main.go`**
Di dalam `main.go`, panggil fungsi-fungsi rute seperti ini:

```go
// main.go
package main

import (
    "github.com/gin-gonic/gin"
    "path-to-your-project/database"
    "path-to-your-project/controller"
)

func main() {
    r := gin.Default()
    
    // Inisialisasi database
    _, err := database.InitDB()
    if err != nil {
        panic("Gagal menghubungkan ke database")
    }

    // Panggil fungsi-fungsi rute CRUD
    r.GET("/api/users", controller.GetUsers)
    r.GET("/api/users/:id", controller.GetUserByID)
    r.POST("/api/users", controller.CreateUser)
    r.PUT("/api/users/:id", controller.UpdateUser)
    r.DELETE("/api/users/:id", controller.DeleteUser)

    r.Run(":8080")
}
```

**Langkah 7: Jalankan Aplikasi Anda**
Jalankan aplikasi Anda dengan perintah `go run main.go`. Aplikasi akan berjalan di `http://localhost:8080`.

Sekarang, Anda memiliki rute CRUD untuk entitas pengguna (users) dalam proyek GIN-GORM Anda,


## Menerapkan Middleware
Menerapkan middleware di Golang cukup mudah,
Misalnya disini kita ingin menerapkan Global Middleware
Dimana semua request harus memiliki headers Authorization.

`middleware/auth_middleware.go`
```go
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

```

Tambahkan kode ini di `main.go`
```go
    router := gin.Default()
	router.Use(middleware.GlobalMiddleware)
```
