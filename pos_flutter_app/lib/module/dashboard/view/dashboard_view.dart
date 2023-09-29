
import 'package:flutter/material.dart';
import 'package:pos_flutter_app/core.dart';
import '../controller/dashboard_controller.dart';

class DashboardView extends StatefulWidget {
    const DashboardView({Key? key}) : super(key: key);

    Widget build(context, DashboardController controller) {
    controller.view = this;

    return Scaffold(
        appBar: AppBar(
        title: const Text("Dashboard"),
        actions: const [],
        ),
        body: SingleChildScrollView(
        child: Container(
            padding: const EdgeInsets.all(10.0),
            child: const Column(
            children: [],
            ),
        ),
        ),
    );
    }

    @override
    State<DashboardView> createState() => DashboardController();
}
    