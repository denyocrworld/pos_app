Baik, berikut langkah-langkah untuk membuat proyek Laravel dengan otentikasi menggunakan Sanctum dan CRUD produk:

**Langkah 1: Membuat Database di MySQL**

1. Buka terminal atau command prompt Anda.

2. Login ke server MySQL dengan perintah berikut (mungkin perlu memasukkan kata sandi MySQL jika Anda mengaturnya sebelumnya):

   ```bash
   mysql -u root -p
   ```

3. Setelah berhasil masuk, Anda dapat membuat database dengan nama `laravel_db` dan username `root`. Tidak perlu menyertakan kata sandi jika Anda tidak mengaturnya.

   ```sql
   CREATE DATABASE laravel_db;
   ```

   Ini akan membuat database baru dengan nama `laravel_db`.

4. Keluar dari klien MySQL dengan mengetikkan:

   ```sql
   exit
   ```

**Langkah 2: Konfigurasi .env**

1. Buka file `.env` dalam direktori proyek Laravel Anda menggunakan editor teks.

2. Atur koneksi database sesuai dengan informasi yang Anda miliki:

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

   Pastikan `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` sesuai dengan pengaturan database yang telah Anda buat.

**Langkah 3: Migrasi Tabel Users dengan Kolom 'Role'**

1. Buat migrasi untuk menambahkan kolom 'role' ke tabel pengguna (users) dengan perintah berikut:

   ```bash
   php artisan make:migration add_role_to_users_table
   ```

2. Buka file migrasi yang baru saja dibuat dalam direktori `database/migrations`. Di dalam metode `up`, tambahkan perintah untuk menambahkan kolom 'role' ke tabel 'users'. Contoh:

   ```php
   public function up()
   {
       Schema::table('users', function (Blueprint $table) {
           $table->string('role')->default('user'); // Kolom 'role' dengan default 'user'
       });
   }
   ```

   Anda dapat menyesuaikan jenis kolom dan nilai default sesuai dengan kebutuhan Anda.

3. Jalankan migrasi untuk menerapkan perubahan ke dalam database:

   ```bash
   php artisan migrate
   ```

**Langkah 4: Buat Controller CRUD Users**

1. Buat controller untuk pengguna (UsersController) dengan perintah berikut:

   ```bash
   php artisan make:controller UsersController
   ```

2. Dalam controller `UsersController`, Anda dapat menambahkan metode-metode untuk CRUD pengguna sesuai kebutuhan Anda.

**Langkah 5: Buat AuthController dan Endpoint untuk Login, Logout, dan Refresh Token**

1. Buat controller untuk otentikasi (AuthController) dengan perintah berikut:

   ```bash
   php artisan make:controller AuthController
   ```

2. Dalam controller `AuthController`, tambahkan metode `login`, `logout`, dan `refreshToken` untuk mengelola otentikasi pengguna. Anda juga dapat mengembalikan data pengguna seperti name, email, dan role bersamaan dengan token dalam respons.

```php
public function login(Request $request)
{
    $credentials = $request->only(['email', 'password']);

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
        ]);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
}

public function logout(Request $request)
{
    $request->user()->tokens()->delete();

    return response()->json(['message' => 'Logged out successfully']);
}

public function refreshToken(Request $request)
{
    $user = $request->user();
    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json(['token' => $token]);
}
```

**Langkah 6: Daftarkan Rute Login, Logout, dan Refresh Token**

1. Buka file `routes/api.php` dan tambahkan rute untuk login, logout, dan refresh-token:

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Endpoint login
Route::post('/auth/login', [AuthController::class, 'login']);
// Endpoint logout
Route::post('/auth/logout', [AuthController::class, 'logout']);
// Endpoint refresh-token
Route::post('/auth/refresh-token', [AuthController::class, 'refreshToken']);
```

**Langkah 7: Buat Migrasi Tabel Products**

1. Buat migrasi untuk tabel produk (products) dengan perintah berikut:

```bash
php artisan make:migration create_products_table
```

2. Buka file migrasi yang baru saja dibuat dalam direktori `database/migrations`. Tentukan struktur tabel produk sesuai dengan kebutuhan Anda. Contoh:

```php
public function up()
{
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->string('photo');
        $table->string('product_name');
        $table->double('price');
        $table->text('description');
        $table->timestamps();
    });
}
```

3. Jalankan migrasi untuk membuat tabel produk:

```bash
php artisan migrate
```

**Langkah 8: Buat Controller CRUD Products**

1. Buat controller untuk produk (ProductController) dengan perintah berikut:

```bash
php artisan make:controller ProductController
```

2. Dalam controller `ProductController`, Anda dapat menambahkan metode-metode untuk CRUD produk sesuai kebutuhan Anda.

**Langkah 9: Terapkan Paging, Sort, dan Search pada Endpoint Products**

1. Dalam controller `ProductController`, terapkan paging, sort, dan search pada metode yang Anda buat untuk CRUD produk. Anda dapat menggunakan metode `paginate`, `orderBy`, dan `where` untuk melakukan ini.

Contoh implementasi paging, sort, dan search:

```php
public function index(Request $request)
{
    $query = Product::query();

    // Sorting
    if ($request->has('sort')) {
        $sortField = $request->input('sort');
        $query->orderBy($sortField);
    }

    // Searching
    if ($request->has('search')) {
        $searchTerm = $request->input('search');
        $query->where('product_name', 'like', "%$searchTerm%");
    }

    // Paging
    $perPage = $request->input('per_page', 10);
    $products = $query->paginate($perPage);

    return response()->

json(['data' => $products]);
}
```

**Langkah 10: Proteksi Endpoint Products dengan Sanctum**

1. Untuk melindungi endpoint products dengan Sanctum, Anda dapat menggunakan middleware `auth:sanctum` pada rute yang sesuai di `routes/api.php`. Pastikan Anda telah menambahkan Sanctum ke dalam proyek Laravel Anda.

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

// Endpoint products yang dilindungi oleh Sanctum
Route::middleware(['auth:sanctum'])->group(function () {
    Route::resource('products', ProductController::class);
});
```

Dengan langkah-langkah di atas, Anda telah membuat proyek Laravel yang menggunakan otentikasi Sanctum, memiliki CRUD untuk produk, serta terapkan paging, sorting, dan searching pada endpoint products. Endpoint products juga dilindungi oleh Sanctum sehingga hanya pengguna yang terotentikasi yang dapat mengaksesnya. Anda dapat menyesuaikan lebih lanjut sesuai dengan kebutuhan proyek Anda.