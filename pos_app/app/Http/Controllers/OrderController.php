<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'customer_name' => 'required|string',
            'address' => 'required|string',
            'products' => 'required|array',
        ]);

        $order = Order::create([
            'customer_name' => $data['customer_name'],
            'address' => $data['address'],
        ]);

        foreach ($data['products'] as $productData) {
            $product = Product::findOrFail($productData['product_id']);
            $quantity = $productData['quantity'];

            $order->products()->attach($product, ['quantity' => $quantity]);
        }

        return response()->json(['message' => 'Order created successfully', 'data' => $order], 201);
    }

    public function index(Request $request)
    {
        $query = Order::with('products'); // Menyertakan produk dalam respons JSON

        // Filter berdasarkan order_id jika parameter ada
        if ($request->has('order_id') && $request->input('order_id') != "") {
            $query->where('id', $request->input('order_id'));
        }

        // Filter berdasarkan customer_name dengan penggunaan LIKE jika parameter ada
        if ($request->has('customer_name')) {
            $customerName = $request->input('customer_name');
            $query->where('customer_name', 'LIKE', "%$customerName%");
        }

        // Pengurutan berdasarkan 'created_at' dengan urutan menurun (desc) jika parameter 'sort' adalah 'desc'
        if ($request->input('sort') === 'desc') {
            $query->orderBy('customer_name', 'desc');
        } else {
            $query->orderBy('customer_name', 'asc');
        }

        // Menambahkan paging dengan jumlah data per halaman (contoh: 10 data per halaman)
        $perPage = $request->input('per_page', 10); // Jumlah data per halaman, default 10
        $orders = $query->paginate($perPage);

        return response()->json($orders);
    }
}
