import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CadastrarUsuario } from './pages/cadastrar-usuario/cadastrar-usuario';

export const routes: Routes = [
    {
        path: "pages/autenticar-usuario", //rota de navegação para a página de autenticação
        component: AutenticarUsuario //classe do componente
    },
    {
        path: "pages/cadastrar-usuario", //rota de navegação para a página de cadastro
        component: CadastrarUsuario
    },
    {
        path: "", //rota de navegação para a página inicial
        redirectTo: "/pages/autenticar-usuario", //redirecionamento para a página de autenticação
        pathMatch: "full"
    }
    
];
