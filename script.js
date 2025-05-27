const boutonsAjouter = document.querySelectorAll('.ajouter-panier');
const listePanier = document.getElementById('liste-panier');
const totalPanier = document.getElementById('total-panier');
const formCommande = document.getElementById('form-commande');
const confirmation = document.getElementById('confirmation');

let panier = [];
let total = 0;

function formatPrix(fcfa) {
  return fcfa.toLocaleString('fr-FR') + ' fcfa';
}

boutonsAjouter.forEach(bouton => {
  bouton.addEventListener('click', () => {
    const produit = bouton.closest('.card');
    const nom = produit.querySelector('.card-title').textContent;
    const prixTexte = produit.querySelector('.fw-bold').textContent;
    const prix = parseInt(prixTexte.replace(/\D/g, ''), 10); // enlever tout sauf chiffres

    // Ajouter produit au panier
    panier.push({ nom, prix });

    // Ajouter à la liste affichée
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = `${nom} - ${formatPrix(prix)}`;

    const btnSupprimer = document.createElement('button');
    btnSupprimer.className = 'btn btn-sm btn-danger';
    btnSupprimer.textContent = 'Supprimer';
    btnSupprimer.addEventListener('click', () => {
      listePanier.removeChild(li);
      panier = panier.filter(item => item !== panier.find(p => p.nom === nom && p.prix === prix));
      calculerTotal();
    });

    li.appendChild(btnSupprimer);
    listePanier.appendChild(li);

    calculerTotal();
  });
});

function calculerTotal() {
  total = panier.reduce((acc, item) => acc + item.prix, 0);
  totalPanier.textContent = formatPrix(total);
}

formCommande.addEventListener('submit', e => {
  e.preventDefault();

  if (panier.length === 0) {
    alert('Votre panier est vide ! Ajoutez des produits avant de valider la commande.');
    return;
  }

  const nomAcheteur = document.getElementById('nom-acheteur').value.trim();
  const telephone = document.getElementById('telephone').value.trim();
  const modePaiement = document.getElementById('mode-paiement').value;

  // Simple validation téléphone (peut être améliorée)
  const telRegex = /^\+?\d{8,15}$/;
  if (!telRegex.test(telephone)) {
    alert('Veuillez entrer un numéro de téléphone valide.');
    return;
  }

  if (!modePaiement) {
    alert('Veuillez choisir un mode de paiement.');
    return;
  }

  // Afficher confirmation
  confirmation.classList.remove('d-none');
  confirmation.innerHTML = `
    <h4>Commande validée !</h4>
    <p><strong>Nom :</strong> ${nomAcheteur}</p>
    <p><strong>Téléphone :</strong> ${telephone}</p>
    <p><strong>Mode de paiement :</strong> ${modePaiement === 'carte' ? 'Carte bancaire' : 'Cash à la livraison'}</p>
    <p><strong>Total à payer :</strong> ${formatPrix(total)}</p>
    <p>Merci pour votre achat chez MKT SHOP !</p>
  `;

  // Réinitialiser panier et formulaire
  panier = [];
  listePanier.innerHTML = '';
  calculerTotal();
  formCommande.reset();
});
