import express from "express";
const router = express.Router();
import { Task } from "../model/task";
import { Op } from "sequelize";

// Rute GET dengan paginasi, pencarian, dan pengurutan
router.get("/", async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page || "1");
    const perPage = parseInt(req.query.per_page || "10");
    const search = req.query.search || "";
    const sortField = req.query.sort_field || "createdAt"; 
    const sortOrder = req.query.sort_order || "asc"; 

    const offset = (page - 1) * perPage; 
    const whereClause = {
      title: {
        [Op.like]: `%${search}%`,
      },
    };

    const totalCount = await Task.count({
      where: whereClause,
    }); 
    const totalPages = Math.ceil(totalCount / perPage);

    const tasks = await Task.findAll({
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
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.get("/:id", async (req: any, res: any) => {
  let task = await Task.findByPk(req.params.id);
  res.json({
    data: task,
  });
});

router.post("/", async (req: any, res: any) => {
  let post = req.body;
  let result = await Task.create({
    title: post.title,
  });

  res.json({
    data: result,
  });
});

router.put("/:id", async (req: any, res: any) => {
  let data = req.body;
  let task = await Task.findByPk(req.params.id);
  task!.title = data.title;
  var result = await task?.save();

  res.json({
    data: result,
  });
});

router.delete("/:id", async (req: any, res: any) => {
  let task = await Task.findByPk(req.params.id);
  var result = await task?.destroy();

  res.json({
    data: result,
  });
});

export default router;
