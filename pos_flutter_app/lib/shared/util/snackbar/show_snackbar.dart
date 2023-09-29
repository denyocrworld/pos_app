import 'package:flutter/material.dart';
import 'package:pos_flutter_app/core.dart';

showSnackbar(String message) {
  final snackBar = SnackBar(
    content: Text(message),
  );
  ScaffoldMessenger.of(Get.currentContext).showSnackBar(snackBar);
}
