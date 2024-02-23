import { NextFunction, Request, Response } from 'express';

class Validations {
  static validateBook(req: Request, res: Response, next: NextFunction): Response | void {
    const book = req.body;
    const requiredKeys = ['title', 'price', 'author', 'isbn'];
    const notFoundKey = requiredKeys.find((key) => !(key in book));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }

    next();
  }
}

export default Validations;

/*
O nome dado a classe foi Validations pois nela implementaremos todas as outras validações 
de entradas, dessa forma concentramos essa parte da lógica em um lugar só, e as rotas que
possuem validações podem chamar apenas o método que precisarem.
*/