// src/router/user_router.ts
import { Router, Request, Response } from 'express';
import { User } from './../model/user';

const router = Router();

// Index
router.get('/', async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query as any;
  const offset = (+page - 1) * +limit;

  try {
    const { count, rows } = await User.findAndCountAll({
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
