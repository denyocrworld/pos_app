<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'photo' => 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            'product_name' => 'Camera Sony DX10',
            'price' => 93.99,
            'description' => 'Description for Product 1',
        ]);

        Product::create([
            'photo' => 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
            'product_name' => 'Car Miniature',
            'price' => 46.99,
            'description' => 'Description for Product 2',
        ]);

        // Tambahkan data produk lainnya sesuai kebutuhan
    }
}
