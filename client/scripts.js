function loadPage(page) {
    const contentDiv = document.getElementById('content');
    fetch(page)
        .then(response => response.text())
        .then(data => {
            contentDiv.innerHTML = data;
            // Charger les données correspondantes
            loadData(page);
        })
        .catch(error => {
            contentDiv.innerHTML = `<p>Erreur lors du chargement de la page ${page}: ${error}</p>`;
        });
}

function loadData(page) {
    switch (page) {
        case 'clients.html':
            fetchClients();
            break;
        case 'produits.html':
            fetchProduits();
            break;
        case 'tvas.html':
            fetchTVAs();
            break;
        case 'tarifications.html':
            fetchTarifications();
            break;
        case 'factures.html':
            fetchFactures();
            break;
        case 'lignes_facture.html':
            fetchLignesFacture();
            break;
        default:
            console.log('Page non reconnue');
    }
}

// Fonctions pour charger les données
function fetchClients() {
    fetch('http://localhost:3000/api/clients')
        .then(response => response.json())
        .then(data => {
            displayClients(data);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des clients:', error);
        });
}

function displayClients(clients) {
    const contentDiv = document.getElementById('content');
    let html = '<h2>Clients</h2><table class="table table-striped"><thead><tr><th>ID</th><th>Nom</th><th>Adresse</th><th>Ville</th><th>Code Postal</th><th>Pays</th><th>Email</th><th>Téléphone</th><th>Date Début Client</th><th>Date Fin Client</th><th>Type Client</th></tr></thead><tbody>';
    clients.forEach(client => {
        html += `<tr><td>${client.id_client}</td><td>${client.nom}</td><td>${client.adresse}</td><td>${client.ville}</td><td>${client.code_postal}</td><td>${client.pays}</td><td>${client.email}</td><td>${client.telephone}</td><td>${client.date_debut_client}</td><td>${client.date_fin_client}</td><td>${client.type_client}</td></tr>`;
    });
    html += '</tbody></table>';
    contentDiv.innerHTML += html;
}

function fetchProduits() {
    fetch('http://localhost:3000/api/produits')
        .then(response => response.json())
        .then(data => {
            displayProduits(data);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des produits:', error);
        });
}

function displayProduits(produits) {
    const contentDiv = document.getElementById('content');
    let html = '<h2>Produits</h2><table class="table table-striped"><thead><tr><th>ID</th><th>Nom Produit</th><th>Catégorie Produit</th><th>Date Début</th><th>Date Fin</th></tr></thead><tbody>';
    produits.forEach(produit => {
        html += `<tr><td>${produit.id_produit}</td><td>${produit.nom_produit}</td><td>${produit.categorie_produit}</td><td>${produit.date_debut}</td><td>${produit.date_fin}</td></tr>`;
    });
    html += '</tbody></table>';
    contentDiv.innerHTML += html;
}

function fetchTVAs() {
    fetch('http://localhost:3000/api/tvas')
        .then(response => response.json())
        .then(data => {
            displayTVAs(data);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des taux de TVA:', error);
        });
}

function displayTVAs(tvas) {
    const contentDiv = document.getElementById('content');
    let html = '<h2>TVA</h2><table class="table table-striped"><thead><tr><th>ID</th><th>Taux TVA</th><th>Date Début TVA</th><th>Date Fin TVA</th><th>Type TVA</th></tr></thead><tbody>';
    tvas.forEach(tva => {
        html += `<tr><td>${tva.id_tva}</td><td>${tva.taux_tva}</td><td>${tva.date_debut_tva}</td><td>${tva.date_fin_tva}</td><td>${tva.type_tva}</td></tr>`;
    });
    html += '</tbody></table>';
    contentDiv.innerHTML += html;
}

function fetchTarifications() {
    fetch('http://localhost:3000/api/tarifications')
        .then(response => response.json())
        .then(data => {
            displayTarifications(data);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des tarifications:', error);
        });
}

function displayTarifications(tarifications) {
    const contentDiv = document.getElementById('content');
    let html = '<h2>Tarifications</h2><table class="table table-striped"><thead><tr><th>ID</th><th>ID Produit</th><th>Type Tarif</th><th>Prix HT</th><th>TVA</th><th>Prix TTC</th><th>Date Début</th><th>Date Fin</th><th>Remise</th></tr></thead><tbody>';
    tarifications.forEach(tarification => {
        html += `<tr><td>${tarification.id_tarif}</td><td>${tarification.id_produit}</td><td>${tarification.type_tarif}</td><td>${tarification.prix_ht}</td><td>${tarification.tva}</td><td>${tarification.prix_ttc}</td><td>${tarification.date_debut}</td><td>${tarification.date_fin}</td><td>${tarification.remise}</td></tr>`;
    });
    html += '</tbody></table>';
    contentDiv.innerHTML += html;
}

function fetchFactures() {
    fetch('http://localhost:3000/api/factures')
        .then(response => response.json())
        .then(data => {
            displayFactures(data);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des factures:', error);
        });
}

function displayFactures(factures) {
    const contentDiv = document.getElementById('content');
    let html = '<h2>Factures</h2><table class="table table-striped"><thead><tr><th>ID</th><th>Date Facture</th><th>ID Client</th><th>Total HT</th><th>Total TVA</th><th>Total TTC</th></tr></thead><tbody>';
    factures.forEach(facture => {
        html += `<tr><td>${facture.id_facture}</td><td>${facture.date_facture}</td><td>${facture.id_client}</td><td>${facture.total_ht}</td><td>${facture.total_tva}</td><td>${facture.total_ttc}</td></tr>`;
    });
    html += '</tbody></table>';
    contentDiv.innerHTML += html;
}

function fetchLignesFacture() {
    fetch('http://localhost:3000/api/lignes_facture')
        .then(response => response.json())
        .then(data => {
            displayLignesFacture(data);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des lignes de facture:', error);
        });
}

function displayLignesFacture(lignesFacture) {
    const contentDiv = document.getElementById('content');
    let html = '<h2>Lignes de Facture</h2><table class="table table-striped"><thead><tr><th>ID</th><th>ID Facture</th><th>ID Produit</th><th>Désignation</th><th>Prix Unitaire HT</th><th>Quantité</th><th>Taux TVA</th><th>Total HT</th><th>Total TVA</th><th>Total TTC</th></tr></thead><tbody>';
    lignesFacture.forEach(ligne => {
        html += `<tr><td>${ligne.id_ligne_facture}</td><td>${ligne.id_facture}</td><td>${ligne.id_produit}</td><td>${ligne.designation}</td><td>${ligne.pu_ht}</td><td>${ligne.quantite}</td><td>${ligne.taux_tva}</td><td>${ligne.total_ht}</td><td>${ligne.total_tva}</td><td>${ligne.total_ttc}</td></tr>`;
    });
    html += '</tbody></table>';
    contentDiv.innerHTML += html;
}

// Charger la page par défaut (par exemple, "clients.html")
document.addEventListener('DOMContentLoaded', () => {
    loadPage('clients.html');
});
