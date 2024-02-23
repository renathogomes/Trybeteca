export type NewEntity<T> = Omit<T, 'id'>;

/* Agora, a interface NewEntity é como aqueles óculos com nariz de palhaço, 
parece bobo mas é super importante! Ela é usada para criar novas entidades no banco de dados, 
como um novo livro. Ela basicamente remove o campo id do objeto, já que o banco de dados gera um 
valor para essa coluna de forma automática. Menos é mais, né? */