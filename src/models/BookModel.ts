import SequelizeBook from '../database/models/SequelizeBook';
import { IBook } from '../interfaces/books/IBook';
import { IBookModel } from '../interfaces/books/IBookModel';
import { NewEntity } from '../interfaces';

export default class BookModel implements IBookModel {
  private model = SequelizeBook;

  async create(data: NewEntity<IBook>): Promise<IBook> {
    const dbData = await this.model.create(data);

    const { id, title, price, author, isbn }: IBook = dbData;
    return { id, title, price, author, isbn };
  }
  
  /*
  E aqui está a nossa BookModel, que parece um super-herói literário, salvando os dados dos 
  livros no banco de dados. Com essa classe, garantimos que cada parte do projeto tenha 
  responsabilidades bem definidas e separadas, tornando o código mais organizado e fácil de manter.
  
  E caso precisemos migrar de ORM, por exemplo, teríamos que mudar apenas uma parte do código,
  ao invés de ter que alterar todas as referências ao banco de dados na aplicação. Mais fácil 
  do que mudar o livro de lugar na estante! 😜
  
  */

  async findAll(): Promise<IBook[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, title, price, author, isbn }) => (
      { id, title, price, author, isbn }
    ));
  }

  async findById(id: IBook['id']): Promise<IBook | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { title, price, author, isbn }: IBook = dbData;
    return { id, title, price, author, isbn };
  }

  /*
  Pronto! Agora além do create, nossa BookModel também implementa o findAlle o findById, 
  aumentando ainda mais os poderes desse super-herói literário. 😜
  */

  async update(id: IBook['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: IBook['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}

// depois de criar a model vai criar o service