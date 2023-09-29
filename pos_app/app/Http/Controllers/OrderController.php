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

    public function index()
    {
        $orders = Order::with('products')->get();
        return response()->json(['data' => $orders]);
    }
}
