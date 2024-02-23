import { IBook } from './IBook';
import { NewEntity } from '..'; // para fazer o PUT - atualizar

export interface IBookModel {
  create(data: Partial<IBook>): Promise<IBook>,
  /*
  Aqui estamos definindo um contrato que nossa Model de livros precisa seguir, ou seja, 
  estamos criando as regras do jogo para que a nossa Model funcione perfeitamente.
   Isso garante que a nossa Model tenha um método create que recebe os dados de um livro e retorna 
   o livro criado no banco de dados.
  
  Podemos dizer que aqui está o coração da nossa aplicação literária batendo forte!
   É através deste método que conseguimos adicionar novos livros à nossa coleção. 📚❤️
   
   */

  findAll(): Promise<IBook[]>,
  findById(id: IBook['id']): Promise<IBook | null>

  /*
  Além do método create anteriormente implementado, agora estamos definindo os contratos 
  dos métodos findAll e findById, que se destinarão a, respectivamente, retornar todos os 
  livros cadastrados e o livro específico pelo seu id. 📚❤️
  */

  update(id: IBook['id'], data: NewEntity<IBook>): Promise<IBook | null>

  delete(id: IBook['id']): Promise<number>,
}

// fazer a interface model é o primeiro passo, depois vai criar a model