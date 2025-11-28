import java.util.ArrayList;
import java.util.List;

import dao.ProdutoDAO;
import model.Produto;
import util.ConnectionFactory;

public class App {
    public static void main(String[] args) {
                port(4567);

        // CORS AQUI – NO MESMO main QUE INICIA O SERVIDOR
        options("/*", (request, response) -> {
            String headers = request.headers("Access-Control-Request-Headers");
            if (headers != null) {
                response.header("Access-Control-Allow-Headers", headers);
            }
            String method = request.headers("Access-Control-Request-Method");
            if (method != null) {
                response.header("Access-Control-Allow-Methods", method);
            }
            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            response.header("Access-Control-Allow-Headers", "Content-Type");
        });

        // Inicializa as rotas
        ApiProduto rotas = new ApiProduto();
        rotas.configurarRotas();

        System.out.println("Servidor iniciado na porta 4567");

    }
}
