namespace ProdutosAPI.Models
{
    public class Produto
    {
        public Guid Id { get; set; } = Guid.NewGuid(); // Id gerado automaticamente
        public string Nome { get; set; }
        public decimal Preco { get; set; }
        public string Descricao { get; set; }


        public Produto(Guid id, string nome, decimal preco, string descricao)
        {
            Id = id;
            Nome = nome;
            Descricao = descricao;
            Preco = preco;
        }

    }
}
