import 'dart:io';

void main(List<String> args) {
  if (args.isEmpty) {
    print("Usage: dart generator.dart <module_name>");
    return;
  }

  var moduleName = args[0];
  var modelName = _capitalize(moduleName);
  var routerName = '${modelName}Router';

  _generateModel(modelName, moduleName);
  _generateRouter(routerName, modelName, moduleName);

  print("Model and CRUD Routes for $moduleName generated successfully!");
}

void _generateModel(String modelName, String moduleName) {
  var fieldName = '${moduleName}_name';
  var modelContent = '''
// src/model/$moduleName.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export class $modelName extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  $fieldName!: string;
}
''';

  _createFile('src/model/$moduleName.ts', modelContent);
}

void _generateRouter(String routerName, String modelName, String moduleName) {
  var routerContent = '''
// src/router/${moduleName}_router.ts
import { Router, Request, Response } from 'express';
import { $modelName } from './../model/$moduleName';

const router = Router();

// Index
router.get('/', async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query as any;
  const offset = (+page - 1) * +limit;

  try {
    const { count, rows } = await $modelName.findAndCountAll({
      offset,
      limit: +limit,
    });

    const totalPages = Math.ceil(count / +limit);

    res.json({
      data: rows,
      pagination: {
        totalItems: count,
        totalPages: totalPages,
        currentPage: +page,
        itemsPerPage: +limit,
      },
    });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});

// Define your CRUD routes here

export default router;
''';

  _createFile('src/router/${moduleName}_router.ts', routerContent);
}

void _createFile(String path, String content) {
  var file = File(path);

  if (file.existsSync()) {
    print("File already exists: $path");
    return;
  }

  var mode = FileMode.write;
  file.writeAsStringSync(content, mode: mode);
}

String _capitalize(String text) {
  return text[0].toUpperCase() + text.substring(1);
}
