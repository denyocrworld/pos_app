import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Lakukan validasi autentikasi di sini
    // Misalnya, cek apakah user telah login atau memiliki token valid
    if (false) {
      next(); // Lanjutkan ke middleware atau handler berikutnya
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
