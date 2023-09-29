
import 'package:flutter/material.dart';
import 'package:pos_flutter_app/core.dart';
import '../view/custom_pdf_viewer_view.dart';

class CustomPdfViewerController extends State<CustomPdfViewerView> {
    static late CustomPdfViewerController instance;
    late CustomPdfViewerView view;

    @override
    void initState() {
        instance = this;
        super.initState();
    }

    @override
    void dispose() => super.dispose();

    @override
    Widget build(BuildContext context) => widget.build(context, this);
}
        
    