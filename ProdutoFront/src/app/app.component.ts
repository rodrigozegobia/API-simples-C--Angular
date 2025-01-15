import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Produto } from './models/produto';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProdutoFront';
  http = inject(HttpClient);
  url = 'http://localhost:5181';

  // Listar produtos
  produtos$?: Observable<Produto[]>;

  // Variáveis para adicionar produto
  nomeAdicionar = '';
  descAdicionar = '';
  precoAdicionar: string = '';  // Inicialize como string, pois o input será de texto

  // Função para adicionar produto
  adicionarProduto() {
    if (!this.nomeAdicionar || !this.precoAdicionar) {
      alert('Nome e preço são obrigatórios.');
      return;
    }

    // Converte o preço de string para número
    const preco = parseFloat(this.precoAdicionar);

    // Verifica se o preço é válido
    if (isNaN(preco) || preco <= 0) {
      alert('Por favor, insira um preço válido maior que zero.');
      return;
    }

    const produtoCriar: Produto = {
      id: undefined,  // Não enviamos o id, pois o backend vai gerar um id
      nome: this.nomeAdicionar,
      preco: preco,
      descricao: this.descAdicionar
    };

    // Envia o produto para a API
    this.http.post<void>(`${this.url}/produtos`, produtoCriar)
      .subscribe({
        next: () => {
          alert('Produto adicionado com sucesso!');
          this.obterProdutos();  // Atualiza a lista de produtos
          this.nomeAdicionar = '';  // Limpa o campo de nome
          this.precoAdicionar = '';  // Limpa o campo de preço
          this.descAdicionar = '';
        },
        error: (err) => {
          alert('Erro ao adicionar o produto!');
          console.error(err);
        }
      });
  }

  // Função para obter a lista de produtos
  obterProdutos() {
    this.produtos$ = this.http.get<Produto[]>(`${this.url}/produtos`);
  }

  ngOnInit(): void {
    this.obterProdutos();
  }
}
