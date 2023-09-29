## Cara Create Project
```go
mkdir golang_api
cd golang_api
go mod init golang_api
```

## Cara menambahkan dependencies/plugin
```
go get nama-plugin
```

Contoh:
```
go get github.com/gorilla/mux
```

## Cara Compile
```
go run main.go
```

## Hot Reload di Golang
```
go install github.com/cosmtrek/air@latest
```

Jalankan perintah ini:
```
air
```

atau bisa juga dengan modemon!
```
nodemon --exec go run main.go
```

## 1. Variable

Variabel adalah tempat untuk menyimpan data dalam Go. Jenis data yang bisa disimpan dalam variabel mencakup bilangan bulat, desimal, string, boolean, dan tipe data kustom yang Anda buat sendiri dengan struct.

```go
package main

import "fmt"

func main() {
    // Tipe data integer
    var umur int
    umur = 25

    // Tipe data floating-point
    var tinggi float64
    tinggi = 175.5

    // Tipe data string
    var nama string
    nama = "John Doe"

    // Tipe data boolean
    var aktif bool
    aktif = true

    fmt.Println("Umur:", umur)
    fmt.Println("Tinggi:", tinggi)
    fmt.Println("Nama:", nama)
    fmt.Println("Aktif:", aktif)
}
```

## 2. Operator Aritmatika

Go mendukung operator aritmatika dasar seperti +, -, *, /, dan %.

```go
package main

import "fmt"

func main() {
    a := 10
    b := 5
    tambah := a + b
    kurang := a - b
    kali := a * b
    bagi := a / b
    modulo := a % b

    fmt.Printf("Penambahan: %d\n", tambah)
    fmt.Printf("Pengurangan: %d\n", kurang)
    fmt.Printf("Perkalian: %d\n", kali)
    fmt.Printf("Pembagian: %d\n", bagi)
    fmt.Printf("Modulo: %d\n", modulo)
}
```

## 3. IF Statement

Pernyataan IF digunakan untuk mengambil keputusan berdasarkan kondisi tertentu.

```go
package main

import "fmt"

func main() {
    umur := 18

    if umur >= 18 {
        fmt.Println("Anda dewasa.")
    } else {
        fmt.Println("Anda masih anak-anak.")
    }
}
```

```go
...
if age >= 18 && isStudent {
    fmt.Println("Anda adalah mahasiswa dewasa.")
} else {
    fmt.Println("Anda bukan mahasiswa dewasa.")
}
...
```

```go
...
isWeekend := true
isHoliday := false

if isWeekend || isHoliday {
    fmt.Println("Hari ini adalah hari libur atau akhir pekan.")
} else {
    fmt.Println("Hari ini adalah hari kerja biasa.")
}
...
```

## 4. Array

Array adalah kumpulan elemen dengan tipe data yang sama. Di Go, panjang array harus ditentukan pada saat deklarasi.

```go
package main

import "fmt"

func main() {
    var angka [5]int // Deklarasi array dengan 5 elemen bertipe int
    angka[0] = 1
    angka[1] = 2
    angka[2] = 3
    angka[3] = 4
    angka[4] = 5

    fmt.Println(angka) // [1 2 3 4 5]
}
```

## 5. Struct

Struct adalah cara untuk membuat tipe data kustom yang berisi beberapa bidang (fields) dengan jenis data yang berbeda.

```go
package main

import "fmt"

type Mahasiswa struct {
    Nama    string
    Umur    int
    Jurusan string
}

func main() {
    mhs := Mahasiswa{"Alice", 20, "Informatika"}
    fmt.Printf("Nama: %s, Umur: %d, Jurusan: %s\n", mhs.Nama, mhs.Umur, mhs.Jurusan)
}
```

## 6. Struct (Named Argument)

Go tidak memiliki konsep "named arguments" seperti di beberapa bahasa pemrograman lain. Anda tetap harus menginisialisasi struct sesuai dengan urutan field yang telah dideklarasikan.

Namun bisa mengisialisasi nilai Struct-nya dengan nama variabel-nya
seperti dibawah ini.

```go
package main

import "fmt"

type Mahasiswa struct {
    Nama    string
    Umur    int
    Jurusan string
}

func main() {
    // Inisialisasi struct sesuai dengan urutan field.
    mhs := Mahasiswa{
        Nama:    "Alice",
        Umur:    20,
        Jurusan: "Informatika",
    }
    fmt.Printf("Nama: %s, Umur: %d, Jurusan: %s\n", mhs.Nama, mhs.Umur, mhs.Jurusan)
}
```

## 7. Looping

Go mendukung beberapa jenis loop, seperti `for`, `for-range`, dan `while`.

```go
package main

import "fmt"

func main() {
    // Loop dengan for
    for i := 0; i < 5; i++ {
        fmt.Println(i)
    }

    // Loop dengan for-range pada array
    angka := [5]int{1, 2, 3, 4, 5}
    for index, nilai := range angka {
        fmt.Printf("Index: %d, Nilai: %d\n", index, nilai)
    }

    // Loop dengan for sebagai while
    x := 0
    for x < 5 {
        fmt.Println(x)
        x++
    }
}
```

## 8. Function

Fungsi adalah blok kode yang dapat dipanggil dengan nama tertentu. Mereka digunakan untuk mengelompokkan logika kode.

```go
package main

import "fmt"

func tambah(a, b int) int {
    return a + b
}

func main() {
    hasil := tambah(5, 3)
    fmt.Println("Hasil penambahan:", hasil)
}
```

Dengan mengikuti tutorial ini, Anda akan memiliki pemahaman dasar tentang variabel, operator aritmatika, pernyataan IF, array, struct, pengulangan, dan fungsi dalam bahasa pemrograman Go. Anda dapat membangun dari sini untuk mengembangkan pengetahuan Anda dalam Go lebih lanjut.


----

# OOP

Bahasa pemrograman Go (Golang) memiliki pendekatan yang berbeda dalam mengimplementasikan konsep-konsep dasar dalam pemrograman berorientasi objek (OOP) dibandingkan dengan bahasa-bahasa OOP tradisional seperti Java atau Python. Di bawah ini, saya akan menjelaskan cara Go mendukung beberapa konsep OOP:

## 1. **Class dan Object**

Go tidak memiliki konsep kelas dan objek seperti dalam bahasa pemrograman OOP tradisional. Sebaliknya, Go menggunakan struktur (structs) untuk menggantikan kelas. Anda dapat membuat struktur yang berisi data dan metode untuk beroperasi pada data tersebut. Namun, tidak ada pewarisan dari kelas yang disebutkan dalam definisi Go.

Contoh penggunaan struktur di Go:

```go
package main

import "fmt"

type Person struct {
    Name    string
    Age     int
}

func main() {
    p := Person{Name: "John", Age: 30}
    fmt.Printf("Nama: %s, Umur: %d\n", p.Name, p.Age)
}
```

## 2. **Inheritance (Pewarisan)**

Go tidak mendukung konsep pewarisan (inheritance) seperti dalam OOP tradisional. Sebaliknya, Go mendorong komposisi (composition) melalui penggunaan struktur dan embedding (penanaman) untuk mencapai tujuan yang sama.

Contoh penggunaan komposisi di Go:

```go
package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

type Employee struct {
    Person // Embedding Person struct
    Role   string
}

func main() {
    emp := Employee{
        Person: Person{Name: "Alice", Age: 25},
        Role:   "Developer",
    }
    fmt.Printf("Nama: %s, Umur: %d, Role: %s\n", emp.Name, emp.Age, emp.Role)
}
```

## 3. **Abstraction (Abstraksi)**

Abstraksi adalah konsep di mana Anda menyembunyikan rincian implementasi suatu objek dan hanya mengekspos fungsionalitas yang diperlukan. Di Go, Anda dapat mencapai abstraksi dengan cara mendefinisikan interface yang menggambarkan fungsionalitas yang dibutuhkan dan kemudian mengimplementasikan interface ini oleh struktur atau tipe data lain.

Contoh penggunaan abstraksi di Go:

```go
package main

import (
	"fmt"
)

// Animal adalah antarmuka yang menggambarkan metode umum yang harus dimiliki oleh semua hewan.
type Animal interface {
	Speak() string
	Run() string
}

// Dog adalah sebuah struct yang mewakili hewan anjing.
type Dog struct {
	Name string
}

// Speak adalah metode yang mengimplementasikan antarmuka Animal untuk hewan anjing.
func (d Dog) Speak() string {
	return fmt.Sprintf("%s menggonggong", d.Name)
}

func (d Dog) Run() string {
	return fmt.Sprintf("%s menggonggong", d.Name)
}

// Cat adalah sebuah struct yang mewakili hewan kucing.
type Cat struct {
	Name string
}

// Speak adalah metode yang mengimplementasikan antarmuka Animal untuk hewan kucing.
func (c Cat) Speak() string {
	return fmt.Sprintf("%s meong-meong", c.Name)
}

func (c Cat) Run() string {
	return fmt.Sprintf("%s meong-meong", c.Name)
}

func main() {
	myDog := Dog{Name: "Buddy"}
	myCat := Cat{Name: "Whiskers"}

	animals := []Animal{myDog, myCat}

	for _, animal := range animals {
		fmt.Println(animal.Speak())
	}
}

```

## 4. **Encapsulation (Enkapsulasi)**

Go mendukung enkapsulasi melalui penggunaan huruf besar (uppercase) pada nama identitas (seperti field atau method) yang ingin di-export dari sebuah paket (package). Data atau fungsi yang tidak diekspos tidak dapat diakses dari luar paket tersebut.

Contoh enkapsulasi di Go:

```go
package main

import (
    "fmt"
    "mypackage" // Ini adalah paket buatan sendiri yang kita buat
)

func main() {
    data := mypackage.NewData("John")
    fmt.Println("Nama:", data.GetName()) // Mengakses metode yang diekspos
}
```

Di paket `mypackage`, kita hanya mengekspor fungsi `NewData` dan metode `GetName` yang memungkinkan akses ke data yang tersembunyi dalam struktur `Data`.

## 5. **Polymorphism (Polimorfisme)**

Go mendukung polimorfisme dengan menggunakan antarmuka (interface) seperti yang telah dijelaskan di bagian Abstraksi. Anda dapat memiliki berbagai tipe data yang mengimplementasikan antarmuka yang sama, dan kemudian menggunakannya secara polimorfik.

Contoh penggunaan polimorfisme di Go (dengan contoh yang sama seperti di bagian Abstraksi):

NOTES:
Pada contoh ini, Polymorphism yang terjadi adalah
method overriding. Dimana kita melakukan
method overriding terhadap method Area

```go
package main

import "fmt"

type Shape interface {
    Area() float64
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

type Rectangle struct {
    Width  float64
    Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func main() {
    circle := Circle{Radius: 5}
    rectangle := Rectangle{Width: 4, Height: 6}

    shapes := []Shape{circle, rectangle}

    for _, shape := range shapes {
        fmt.Printf("Luas: %f\n", shape.Area())
    }
}
```

Dalam contoh ini, meskipun `circle` dan `rectangle` adalah tipe data yang berbeda, keduanya mengimplementasikan antarmuka `Shape`, yang memungkinkan kita untuk menggunakan polimorfisme saat menghitung luas keduanya dalam loop.