"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const task_1 = require("../model/task");
const sequelize_1 = require("sequelize");
// Rute GET dengan paginasi, pencarian, dan pengurutan
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page || "1");
        const perPage = parseInt(req.query.per_page || "10");
        const search = req.query.search || "";
        const sortField = req.query.sort_field || "createdAt";
        const sortOrder = req.query.sort_order || "asc";
        const offset = (page - 1) * perPage;
        const whereClause = {
            title: {
                [sequelize_1.Op.like]: `%${search}%`,
            },
        };
        const totalCount = yield task_1.Task.count({
            where: whereClause,
        });
        const totalPages = Math.ceil(totalCount / perPage);
        const tasks = yield task_1.Task.findAll({
            where: whereClause,
            offset,
            limit: perPage,
            order: [[sortField, sortOrder]],
        });
        res.json({
            data: tasks,
            page: page,
            per_page: perPage,
            total_items: totalCount,
            total_pages: totalPages,
            search: search,
            sort_field: sortField,
            sort_order: sortOrder,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let task = yield task_1.Task.findByPk(req.params.id);
    res.json({
        data: task,
    });
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let post = req.body;
    let result = yield task_1.Task.create({
        title: post.title,
    });
    res.json({
        data: result,
    });
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    let task = yield task_1.Task.findByPk(req.params.id);
    task.title = data.title;
    var result = yield (task === null || task === void 0 ? void 0 : task.save());
    res.json({
        data: result,
    });
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let task = yield task_1.Task.findByPk(req.params.id);
    var result = yield (task === null || task === void 0 ? void 0 : task.destroy());
    res.json({
        data: result,
    });
}));
exports.default = router;
