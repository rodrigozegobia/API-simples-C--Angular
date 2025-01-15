using ProdutosAPI.Models;

namespace ProdutosAPI.Rotas
{
    public static class ProdutoRotas
    {
        public static List<Produto> Produtos = new List<Produto>()
        {
            new(Guid.NewGuid(), "Brinquedo", 10,""),
            new(Guid.NewGuid(), "Bola", 20,"")
        };

        public static void MapProdutoRotas(this WebApplication app)
        {
            app.MapGet("/produtos", () => Produtos);

            app.MapGet("/produtos/{nome}", (string nome) => Produtos.Find(x => x.Nome.StartsWith(nome)));

            app.MapPost("/produtos",
                (HttpContext request, Produto produto) =>
            {
                produto.Id = Guid.NewGuid();
                Produtos.Add(produto);
                return Results.Ok(produto);
            });
        }
    }
}
