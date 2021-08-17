import { logout as apiLoguot } from '../api/data.js';
import {render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { createPage } from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myBooksPage } from './views/myBooks.js';
import { registerPage } from './views/register.js';
const main = document.querySelector('main');
const logoutBtn = document.querySelector('#logoutBtn').addEventListener('click', async (e)=>{
    e.preventDefault();
    await apiLoguot();
    navBarDecor();
    page.redirect('/dashboard');
});
navBarDecor();

page('/', ctxDecor, dashboardPage);
page('/dashboard', ctxDecor, dashboardPage);
page('/login', ctxDecor, loginPage);
page('/register', ctxDecor, registerPage);
page('/details/:id', ctxDecor, detailsPage);
page('/create', ctxDecor, createPage);
page('/edit/:id', ctxDecor, editPage);
page('/myBooks', ctxDecor, myBooksPage)

page.start()
function ctxDecor(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.navBarDecor = navBarDecor;
    next()

}
function navBarDecor(){
    const email = sessionStorage.getItem('email');
    if(email){
        document.querySelector('#Welcome').textContent = `Welcome, ${email}`
document.getElementById('guest').style.display='none';

document.getElementById('user').style.display=''
    } 
    if(!email){
        document.querySelector('#Welcome').textContent =''
        document.getElementById('guest').style.display='';
        document.getElementById('user').style.display='none'
    }
}

