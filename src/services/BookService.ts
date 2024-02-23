import { NewEntity } from '../interfaces';
import BookModel from '../models/BookModel';
import { IBook } from '../interfaces/books/IBook';
import { IBookModel } from '../interfaces/books/IBookModel';
import { ServiceResponse, ServiceMessage } from '../interfaces/ServiceResponse';

export default class BookService {
  constructor(
    private bookModel: IBookModel = new BookModel(),
  ) { }

  public async createBook(book: NewEntity<IBook>): Promise<ServiceResponse<IBook>> {
    const newBook = await this.bookModel.create(book);
    return { status: 'SUCCESSFUL', data: newBook };
  }
  
  /* 
  
  Note que dessa forma a camada Service sempre responderá para a Controller com um objeto
  contendo status e data, e a depender do valor da chave status, será executada uma determinada ação.
  
  Outro ponto que vale ressaltar é o atributo bookModel que está sendo declarado no construtor. 
  Estamos definindo que caso não seja passado nenhum modelo durante a criação de uma instância, 
  por padrão será utilizado o BookModel. Caso seja necessário utilizar um modelo diferente,
  este deve ser enviado como parâmetro ao instanciar um objeto da classe BookService,
  desde que esse novo model seja de uma classe que implementa a interface IBookModel.
  
  */

  public async getAllBooks(): Promise<ServiceResponse<IBook[]>> {
    const allBooks = await this.bookModel.findAll();
    return { status: 'SUCCESSFUL', data: allBooks };
  }

  public async getBookById(id: number): Promise<ServiceResponse<IBook>> {
    const book = await this.bookModel.findById(id);
    if (!book) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };
    return { status: 'SUCCESSFUL', data: book };
  }

  public async updateBook(id: number, book: IBook): Promise<ServiceResponse<ServiceMessage>> {
    const bookFound = await this.bookModel.findById(id);
    if (!bookFound) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };

    const updatedBook = await this.bookModel.update(id, book);
    if (!updatedBook) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Book ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Book updated' } };
  }

  /* 
  Como de praxe, caso o id informado não corresponda a nenhum livro, o retorno ao usuário 
  será uma mensagem informando que o livro não foi encontrado. Porém, caso não seja possível 
  atualizar um livro existente porque as informações vindas da requisição já estão no banco de 
  dados, o retorno ao usuário será a mensagem There are no updates to perform in Book ${id}.
  */

  public async deleteBook(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const bookFound = await this.bookModel.findById(id);
    if (!bookFound) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };

    await this.bookModel.delete(id);
    return { status: 'SUCCESSFUL', data: { message: 'Book deleted' } };
  }
}

// depois de fazer o service vai fazer o controller