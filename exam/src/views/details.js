import { html } from "../../node_modules/lit-html/lit-html.js";
import { addLikes, deleteBook, getBookById, getLikes } from "../../api/data.js";


const detailsTemplate = (book, user, owner, onDelete, onLikeClick, likes)=> html`<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <div class="actions">
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->

        ${user == owner ? html` <a class="button" href="/edit/${book._id}">Edit</a>
        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` : ''}
       

        <!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        ${user && user!= owner ? html` <a @click=${onLikeClick} class="button" href="javascript:void(0)">Like</a>` : ''}
       

        <!-- ( for Guests and Users )  -->
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${likes}</span>
        </div>
        <!-- Bonus -->
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`;

export async function detailsPage(ctx){
    const id = ctx.params.id;
    const likes =await getLikes(id);
    const userId = sessionStorage.getItem('userId');
    const book = await getBookById(id);
    console.log(book)
    const ownerId = book._ownerId;
    ctx.render(detailsTemplate(book, userId, ownerId, onDelete, onLikeClick, likes));

    async function onDelete(ev){
        ev.preventDefault();
        await deleteBook(id);
       ctx.page.redirect('/dashboard');
}

console.log(likes)
async function onLikeClick(){
   
    const id = ctx.params.id
 await addLikes({id});
}

}

