import 'package:flutter/material.dart';
import 'package:pos_flutter_app/core.dart';
import 'package:pos_flutter_app/service/connection_service/connection_service.dart';

class OrderListController extends State<OrderListView> {
  static late OrderListController instance;
  late OrderListView view;

  @override
  void initState() {
    instance = this;
    getOrders();
    super.initState();
  }

  @override
  void dispose() => super.dispose();

  @override
  Widget build(BuildContext context) => widget.build(context, this);

  List orders = [];
  bool loading = false;

  String search = "";
  updateSearch(String query) {
    search = query;
    getOrders();
  }

  String sort = "asc";
  updateSort() {
    sort = sort == "asc" ? "desc" : "asc";
    getOrders();
  }

  resetOrders() async {
    sort = "asc";
    search = "";
    getOrders();
  }

  getOrders() async {
    loading = true;
    setState(() {});

    await Future.delayed(const Duration(seconds: 1));
    orders = await OrderService().getOrders(
      customerName: search,
      sort: sort,
    );

    loading = false;
    setState(() {});
  }

  exportToPdf() async {
    var isOffline = await ConnectionService().isOffline();
    if (isOffline) {
      showSnackbar("Maaf bro lagi offline nih, gbsa export pdf dulu ya :(");
      return;
    }

    var pdf = await PDFService().generatePdf(orders);
    print("pdf: $pdf");
    showSnackbar("Export success bro");

    Get.to(CustomPdfViewerView(
      pdfPath: pdf,
    ));
  }
}
