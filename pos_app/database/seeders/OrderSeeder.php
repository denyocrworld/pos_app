<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Product;

class OrderSeeder extends Seeder
{
    public function run()
    {
        // Membuat pesanan pertama
        $order1 = Order::create([
            'customer_name' => 'Customer A',
            'address' => 'Address A',
        ]);

        // Menambahkan produk ke pesanan pertama
        $product1 = Product::find(1);
        $product2 = Product::find(2);

        $order1->products()->attach($product1, ['quantity' => 3]);
        $order1->products()->attach($product2, ['quantity' => 2]);

        // Membuat pesanan kedua
        $order2 = Order::create([
            'customer_name' => 'Customer B',
            'address' => 'Address B',
        ]);

        // Menambahkan produk ke pesanan kedua
        $order2->products()->attach($product2, ['quantity' => 1]);

        // Tambahkan pesanan lainnya sesuai kebutuhan
    }
}
