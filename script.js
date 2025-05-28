// Initialisation panier vide
let panier = [];

// Sélection des éléments importants
const listePanier = document.getElementById('liste-panier');
const totalPanier = document.getElementById('total-panier');
const formCommande = document.getElementById('form-commande');
const confirmation = document.getElementById('confirmation');

// Ajouter un produit au panier
function ajouterAuPanier(nom, prix) {
  // Vérifie si produit déjà dans le panier
  const produitExist = panier.find(item => item.nom === nom);
  if (produitExist) {
    produitExist.quantite++;
  } else {
    panier.push({ nom, prix: Number(prix), quantite: 1 });
  }
  afficherPanier();
}

// Affiche le panier dans la page
function afficherPanier() {
  listePanier.innerHTML = '';

  if (panier.length === 0) {
    listePanier.innerHTML = '<li class="list-group-item text-center">Votre panier est vide</li>';
    totalPanier.textContent = '0 fcfa';
    return;
  }

  let total = 0;
  panier.forEach((item, index) => {
    const prixTotalItem = item.prix * item.quantite;
    total += prixTotalItem;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <div>
        <strong>${item.nom}</strong> x ${item.quantite}
      </div>
      <div>
        ${prixTotalItem} fcfa
        <button class="btn btn-sm btn-danger ms-3" data-index="${index}">Supprimer</button>
      </div>
    `;

    listePanier.appendChild(li);
  });

  totalPanier.textContent = `${total} fcfa`;

  // Ajout des événements sur les boutons supprimer
  const btnsSupprimer = listePanier.querySelectorAll('button');
  btnsSupprimer.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      panier.splice(idx, 1);
      afficherPanier();
    });
  });
}

// Écoute sur les boutons Ajouter au panier
document.querySelectorAll('.ajouter-panier').forEach(btn => {
  btn.addEventListener('click', () => {
    const nom = btn.getAttribute('data-nom');
    const prix = btn.getAttribute('data-prix');
    ajouterAuPanier(nom, prix);
  });
});

// Gestion du formulaire de commande
formCommande.addEventListener('submit', function(e) {
  e.preventDefault();

  if (panier.length === 0) {
    alert('Votre panier est vide, ajoutez des produits avant de valider la commande.');
    return;
  }

  // Récupérer les infos
  const nomAcheteur = document.getElementById('nom-acheteur').value.trim();
  const telephone = document.getElementById('telephone').value.trim();
  const modePaiement = document.getElementById('mode-paiement').value;

  // Validation simple
  if (!nomAcheteur || !telephone || !modePaiement) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

  // Afficher confirmation
  confirmation.textContent = `Merci ${nomAcheteur} pour votre commande de
