import 'package:dio/dio.dart';

class OrderService {
  //http://localhost:8000/api/orders?customer_name=&sort=asc&order_id=1&page=1&per_page=1

  Future<List> getOrders({
    String orderId = "",
    String customerName = "",
    String sort = "asc",
    int page = 1,
    int perPage = 10,
  }) async {
    var url =
        "http://192.168.1.3:8000/api/orders?customer_name=$customerName&sort=$sort&order_id=$orderId&page=$page&per_page=$perPage";

    var response = await Dio().get(
      url,
      options: Options(
        headers: {
          "Content-Type": "application/json",
        },
      ),
    );
    Map obj = response.data;
    return obj["data"];
  }
}
