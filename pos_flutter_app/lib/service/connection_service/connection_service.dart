import 'package:dio/dio.dart';

class ConnectionService {
  Future<bool> isOffline() async {
    return true;
    // wifi
    // data
    // ping google.com
    // get request reqres.in
    try {
      await Dio().get(
        "https://example.com",
        options: Options(
          headers: {
            "Content-Type": "application/json",
          },
        ),
      );
      return false;
    } on Exception {
      return true;
    }
  }
}
