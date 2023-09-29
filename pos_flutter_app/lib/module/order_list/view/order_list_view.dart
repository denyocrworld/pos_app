import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';
import 'package:pos_flutter_app/core.dart';
import '../controller/order_list_controller.dart';

class OrderListView extends StatefulWidget {
  const OrderListView({Key? key}) : super(key: key);

  Widget build(context, OrderListController controller) {
    controller.view = this;

    return RefreshIndicator(
      onRefresh: () => controller.resetOrders(),
      child: IgnorePointer(
        ignoring: controller.loading,
        child: Column(
          children: [
            if (controller.loading) const LinearProgressIndicator(),
            Expanded(
              child: Scaffold(
                appBar: AppBar(
                  title: const Text("OrderList"),
                  actions: [
                    CircleAvatar(
                      backgroundColor: Colors.white,
                      child: Text(
                        "${controller.orders.length}",
                        style: const TextStyle(
                          fontSize: 12.0,
                        ),
                      ),
                    ),
                    IconButton(
                      onPressed: () => controller.exportToPdf(),
                      icon: Icon(
                        MdiIcons.filePdfBox,
                        size: 24.0,
                        color: Colors.red,
                      ),
                    ),
                  ],
                ),
                body: Container(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(8.0),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.5),
                              blurRadius: 5.0,
                              offset: const Offset(0, 3),
                            ),
                          ],
                        ),
                        child: TextField(
                          decoration: InputDecoration(
                            hintText: 'Search',
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8.0),
                              borderSide: BorderSide(
                                color: Colors.grey[300]!,
                              ),
                            ),
                            prefixIcon: Icon(
                              Icons.search,
                              color: Colors.blueGrey[900],
                            ),
                            suffixIcon: Container(
                              padding: const EdgeInsets.all(8.0),
                              child: InkWell(
                                onTap: () => controller.updateSort(),
                                child: Icon(
                                  controller.sort == "asc"
                                      ? MdiIcons.sortAscending
                                      : MdiIcons.sortDescending,
                                  color: Colors.blueGrey[900],
                                ),
                              ),
                            ),
                          ),
                          onSubmitted: (value) {
                            controller.updateSearch(value);
                          },
                        ),
                      ),
                      const SizedBox(
                        height: 20.0,
                      ),
                      Expanded(
                        child: ListView.builder(
                          itemCount: controller.orders.length,
                          physics: const ScrollPhysics(),
                          itemBuilder: (BuildContext context, int index) {
                            var item = controller.orders[index];
                            var createdAt = item["created_at"];
                            var fCreatedAt = DateFormat("d MMM")
                                .format(DateTime.parse(createdAt));
                            var fTime = DateFormat("kk:mm")
                                .format(DateTime.parse(createdAt));
                            return Card(
                              child: ListTile(
                                leading: Text(
                                  "${item["id"]}",
                                  style: const TextStyle(
                                    fontSize: 20.0,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                title: Text(item["customer_name"]),
                                subtitle:
                                    Text("Items: ${item["products"].length}"),
                                trailing: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    Text(
                                      fCreatedAt,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    Text(fTime),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            if (controller.loading) const LinearProgressIndicator(),
          ],
        ),
      ),
    );
  }

  @override
  State<OrderListView> createState() => OrderListController();
}
