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
Object.defineProperty(exports, "__esModule", { value: true });
// src/router/user_router.ts
const express_1 = require("express");
const user_1 = require("./../model/user");
const router = (0, express_1.Router)();
// Index
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const offset = (+page - 1) * +limit;
    try {
        const { count, rows } = yield user_1.User.findAndCountAll({
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
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Define your CRUD routes here
exports.default = router;
