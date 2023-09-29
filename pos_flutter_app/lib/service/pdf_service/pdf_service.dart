import 'dart:io';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:syncfusion_flutter_pdf/pdf.dart';

class PDFService {
  Future<String> generatePdf(List orders) async {
    // Create a new PDF document.
    final PdfDocument document = PdfDocument();
    // Add a new page to the document.
    final PdfPage page = document.pages.add();
    // Create a PDF grid class to add tables.
    final PdfGrid grid = PdfGrid();
    // Specify the grid column count.
    grid.columns.add(count: 3);
    // Add a grid header row.
    final PdfGridRow headerRow = grid.headers.add(1)[0];
    headerRow.cells[0].value = 'Order ID';
    headerRow.cells[1].value = 'Customer Name';
    headerRow.cells[2].value = 'Product Count';
    // Set header font.
    headerRow.style.font =
        PdfStandardFont(PdfFontFamily.helvetica, 10, style: PdfFontStyle.bold);

    for (var order in orders) {
      PdfGridRow row = grid.rows.add();
      row.cells[0].value = order["id"].toString();
      row.cells[1].value = order["customer_name"];
      row.cells[2].value = (order["products"] as List).length.toString();
    }

    // Set grid format.
    grid.style.cellPadding = PdfPaddings(left: 5, top: 5);
    // Draw table in the PDF page.
    grid.draw(
        page: page,
        bounds: Rect.fromLTWH(
            0, 0, page.getClientSize().width, page.getClientSize().height));
    // Save the document.
    var path = await getTemporaryDirectory();
    var filePath = '${path.path}/report.pdf';
    File(filePath).writeAsBytes(await document.save());
    // Dispose the document.
    document.dispose();
    return filePath;
  }
}
