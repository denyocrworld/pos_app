import * as fs from 'fs';

interface Field {
  field_name: string;
  type: string;
  required?: boolean;
  primary?: boolean;
}

interface Module {
  module_name: string;
  fields: Field[];
}

interface Config {
  modules: Module[];
}

function toWordCase(input: string): string {
  return input
    .split(/[-_ ]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const configPath = './config.json';
const outputPath = './src/model/';
const outputServicePath = './src/service/';
const outputControllerPath = './src/controller/';
const outputConfigPath = './src/config/';

function generateModel(module: Module) {
  const className = toWordCase(module.module_name);
  const fieldsCode = module.fields
    .map((field) => {
      const fieldName = field.field_name;
      const decorators = field.primary
        ? '@PrimaryGeneratedColumn()'
        : '@Column()';

      return `  ${decorators}\n  ${fieldName}: ${field.type};\n`;
    })
    .join('\n');

  const modelCode = `
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ${className} {
${fieldsCode}
}
  `;

  const filename = `${outputPath}${module.module_name.toLowerCase()}.entity.ts`;

  fs.writeFileSync(filename, modelCode);

  console.log(`Generated ${className} model at ${filename}`);
}
function generateService(module: Module) {
  const className = toWordCase(module.module_name);
  const modelFileName = `${module.module_name.toLowerCase()}.entity`;
  const serviceCode = `
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${className} } from '../model/${modelFileName}';

@Injectable()
export class ${className}Service {
  constructor(
    @InjectRepository(${className})
    private ${module.module_name.toLowerCase()}Repository: Repository<${className}>,
  ) {}

  async getAll(): Promise<${className}[]> {
    return this.${module.module_name.toLowerCase()}Repository.find();
  }

  async create(data: Partial<${className}>): Promise<${className}> {
    const ${module.module_name.toLowerCase()} = this.${module.module_name.toLowerCase()}Repository.create(data);
    return this.${module.module_name.toLowerCase()}Repository.save(${module.module_name.toLowerCase()});
  }

  async update(
    id: number,
    data: Partial<${className}>,
  ): Promise<${className} | undefined> {
    await this.${module.module_name.toLowerCase()}Repository.update(id, data);
    return this.${module.module_name.toLowerCase()}Repository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.${module.module_name.toLowerCase()}Repository.delete(id);
  }

  async findOneById(id: number): Promise<${className} | undefined> {
    return this.${module.module_name.toLowerCase()}Repository.findOneBy({ id });
  }
}
  `;

  const filename = `${outputServicePath}${module.module_name.toLowerCase()}.service.ts`;

  fs.writeFileSync(filename, serviceCode);

  console.log(`Generated ${className} service at ${filename}`);
}

function generateController(module: Module) {
  const className = toWordCase(module.module_name);
  const modelFileName = `${module.module_name.toLowerCase()}.entity`;
  const serviceClassName = `${className}Service`;
  const controllerCode = `
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ${className} } from '../model/${modelFileName}';
import { ${serviceClassName} } from '../service/${module.module_name.toLowerCase()}.service';

@Controller('${module.module_name.toLowerCase()}')
export class ${className}Controller {
  constructor(private readonly ${module.module_name.toLowerCase()}Service: ${serviceClassName}) {}

  @Get()
  getAll(): Promise<${className}[]> {
    return this.${module.module_name.toLowerCase()}Service.getAll();
  }

  @Post()
  create(@Body() data: Partial<${className}>): Promise<${className}> {
    return this.${module.module_name.toLowerCase()}Service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<${className}>): Promise<${className}> {
    return this.${module.module_name.toLowerCase()}Service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.${module.module_name.toLowerCase()}Service.delete(id);
  }
}
  `;

  const filename = `${outputControllerPath}${module.module_name.toLowerCase()}.controller.ts`;

  fs.writeFileSync(filename, controllerCode);

  console.log(`Generated ${className} controller at ${filename}`);
}

function generateModelsServicesAndControllersFromConfig(config: Config) {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  if (!fs.existsSync(outputServicePath)) {
    fs.mkdirSync(outputServicePath);
  }

  if (!fs.existsSync(outputControllerPath)) {
    fs.mkdirSync(outputControllerPath);
  }

  config.modules.forEach((module) => {
    generateModel(module);
    generateService(module);
    generateController(module);
  });

  console.log('Generation completed.');
}

try {
  const configFile = fs.readFileSync(configPath, 'utf-8');
  const config: Config = JSON.parse(configFile);

  const controllerFiles = fs.readdirSync(outputControllerPath);
  const controllerPaths = controllerFiles
    .filter((filename) => filename.endsWith('.controller.ts'))
    .map((filename) => `./src/controller/${filename}`);

  const modelFiles = fs.readdirSync(outputPath);
  const modelPaths = modelFiles
    .filter((filename) => filename.endsWith('.entity.ts'))
    .map((filename) => `./src/model/${filename}`);

  const serviceFiles = fs.readdirSync(outputServicePath);
  const servicePaths = serviceFiles
    .filter((filename) => filename.endsWith('.service.ts'))
    .map((filename) => `./src/service/${filename}`);

  generateModelsServicesAndControllersFromConfig(config);
  generateControllerConfig(
    './src/config/controller.config.ts',
    controllerPaths,
  );
  generateModelConfig('./src/config/model.config.ts', modelPaths);
  generateServiceConfig('./src/config/service.config.ts', servicePaths);
} catch (error) {
  console.error(
    'Error generating models, services, controllers, and config files:',
    error,
  );
}

function generateControllerConfig(
  configPath: string,
  controllerPaths: string[],
) {
  const controllerImports = controllerPaths.map((controllerPath) => {
    const className = controllerPath
      .split('/')
      .pop()
      ?.replace('.controller.ts', '');
    const wordCaseClassName = toWordCase(className);
    return `import { ${wordCaseClassName}Controller } from '../controller/${className.toLowerCase()}.controller';`;
  });

  const configCode = `
${controllerImports.join('\n')}

export const controllerConfigs = [
${controllerPaths
  .map((controllerPath) => {
    const className = controllerPath
      .split('/')
      .pop()
      ?.replace('.controller.ts', '');
    const wordCaseClassName = toWordCase(className);
    return `  ${wordCaseClassName}Controller,`;
  })
  .join('\n')}
];
  `;

  fs.writeFileSync(configPath, configCode);

  console.log(`Generated controller.config.ts at ${configPath}`);
}

function generateModelConfig(configPath: string, modelPaths: string[]) {
  const modelImports = modelPaths.map((modelPath) => {
    const className = modelPath.split('/').pop()?.replace('.entity.ts', '');
    const wordCaseClassName = toWordCase(className);
    return `import { ${wordCaseClassName} } from '../model/${className.toLowerCase()}.entity';`;
  });

  const configCode = `
${modelImports.join('\n')}

export const modelConfigs = [
${modelPaths
  .map((modelPath) => {
    const className = modelPath.split('/').pop()?.replace('.entity.ts', '');
    const wordCaseClassName = toWordCase(className);
    return `  ${wordCaseClassName},`;
  })
  .join('\n')}
];
  `;

  fs.writeFileSync(configPath, configCode);

  console.log(`Generated model.config.ts at ${configPath}`);
}

function generateServiceConfig(configPath: string, servicePaths: string[]) {
  const serviceImports = servicePaths.map((servicePath) => {
    const className = servicePath.split('/').pop()?.replace('.service.ts', '');
    const wordCaseClassName = toWordCase(className);
    return `import { ${wordCaseClassName}Service } from '../service/${className.toLowerCase()}.service';`;
  });

  const configCode = `
${serviceImports.join('\n')}

export const serviceConfigs = [
${servicePaths
  .map((servicePath) => {
    const className = servicePath.split('/').pop()?.replace('.service.ts', '');
    const wordCaseClassName = toWordCase(className);
    return `  ${wordCaseClassName}Service,`;
  })
  .join('\n')}
];
  `;

  fs.writeFileSync(configPath, configCode);

  console.log(`Generated service.config.ts at ${configPath}`);
}

try {
  const configFile = fs.readFileSync(configPath, 'utf-8');
  const config: Config = JSON.parse(configFile);

  const controllerFiles = fs.readdirSync(outputControllerPath);
  const controllerPaths = controllerFiles
    .filter((filename) => filename.endsWith('.controller.ts'))
    .map((filename) => `./src/controller/${filename}`);

  const modelFiles = fs.readdirSync(outputPath);
  const modelPaths = modelFiles
    .filter((filename) => filename.endsWith('.entity.ts'))
    .map((filename) => `./src/model/${filename}`);

  const serviceFiles = fs.readdirSync(outputServicePath);
  const servicePaths = serviceFiles
    .filter((filename) => filename.endsWith('.service.ts'))
    .map((filename) => `./src/service/${filename}`);

  generateModelsServicesAndControllersFromConfig(config);
  generateControllerConfig(
    './src/config/controller.config.ts',
    controllerPaths,
  );
  generateModelConfig('./src/config/model.config.ts', modelPaths);
  generateServiceConfig('./src/config/service.config.ts', servicePaths);
} catch (error) {
  console.error(
    'Error generating models, services, controllers, and config files:',
    error,
  );
}
