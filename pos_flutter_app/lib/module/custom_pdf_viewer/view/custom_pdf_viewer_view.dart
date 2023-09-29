import 'dart:io';

import 'package:flutter/material.dart';
import 'package:pos_flutter_app/core.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';
import '../controller/custom_pdf_viewer_controller.dart';

class CustomPdfViewerView extends StatefulWidget {
  final String pdfPath;
  const CustomPdfViewerView({
    Key? key,
    required this.pdfPath,
  }) : super(key: key);

  Widget build(context, CustomPdfViewerController controller) {
    controller.view = this;
    var path = pdfPath.replaceAll("/", "\\");
    print("path: $path");
    return Scaffold(
      appBar: AppBar(
        title: const Text("Custom Pdf Viewer"),
      ),
      body: SfPdfViewer.file(
        File(path),
      ),
    );
  }

  @override
  State<CustomPdfViewerView> createState() => CustomPdfViewerController();
}
