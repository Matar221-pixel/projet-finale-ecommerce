const boutonsAjouter = document.querySelectorAll('.ajouter-panier');
const listePanier = document.getElementById('liste-panier');
const totalPanier = document.getElementById('total-panier');

let total = 0;

boutonsAjouter.forEach(bouton => {
  bouton.addEventListener('click', () => {
    const produit = bouton.closest('.card');
    const nom = produit.querySelector('.card-title').textContent;
    const prixTexte = produit.querySelector('.fw-bold').textContent;
    const prix = parseFloat(prixTexte.replace('€', ''));

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = nom + ' - ' + prixTexte;

    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.className = 'btn btn-sm btn-danger';
    boutonSupprimer.textContent = 'Supprimer';
    boutonSupprimer.addEventListener('click', () => {
      listePanier.removeChild(li);
      total -= prix;
      totalPanier.textContent = total.toFixed(2) + '€';
    });

    li.appendChild(boutonSupprimer);
    listePanier.appendChild(li);

    total += prix;
    totalPanier.textContent = total.toFixed(2) + '€';
  });
});
