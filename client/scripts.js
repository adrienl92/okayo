function loadPage(page) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Effacer le contenu précédent

    switch (page) {
        case 'clients':
            contentDiv.innerHTML = generateForm('clients') + generateTable('clients');
            break;
        case 'produits':
            contentDiv.innerHTML = generateForm('produits') + generateTable('produits');
            break;
        case 'tvas':
            contentDiv.innerHTML = generateForm('tvas') + generateTable('tvas');
            break;
        case 'tarifications':
            contentDiv.innerHTML = generateForm('tarifications') + generateTable('tarifications');
            break;
        case 'factures':
            contentDiv.innerHTML = generateForm('factures') + generateTable('factures');
            break;
        case 'lignes_facture':
            contentDiv.innerHTML = generateForm('lignes_facture') + generateTable('lignes_facture');
            break;
        default:
            console.log('Page non reconnue');
    }

    loadData(page);
}

function generateForm(page) {
    let formHtml = `<h2>${capitalizeFirstLetter(page)}</h2>`;
    formHtml += `<button class="btn btn-primary mb-3" onclick="showForm('${page}')">Ajouter un ${capitalizeFirstLetter(page)}</button>`;
    formHtml += `<form id="${page}Form" class="form-container" style="display:none;">`;

    switch (page) {
        case 'clients':
            formHtml += `
                <div class="form-group">
                    <label for="nom">Nom</label>
                    <input type="text" class="form-control" id="nom" required>
                </div>
                <div class="form-group">
                    <label for="adresse">Adresse</label>
                    <textarea class="form-control" id="adresse"></textarea>
                </div>
                <div class="form-group">
                    <label for="ville">Ville</label>
                    <input type="text" class="form-control" id="ville">
                </div>
                <div class="form-group">
                    <label for="code_postal">Code Postal</label>
                    <input type="text" class="form-control" id="code_postal">
                </div>
                <div class="form-group">
                    <label for="pays">Pays</label>
                    <input type="text" class="form-control" id="pays">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email">
                </div>
                <div class="form-group">
                    <label for="telephone">Téléphone</label>
                    <input type="text" class="form-control" id="telephone">
                </div>
                <div class="form-group">
                    <label for="date_debut_client">Date Début Client</label>
                    <input type="date" class="form-control" id="date_debut_client">
                </div>
                <div class="form-group">
                    <label for="date_fin_client">Date Fin Client</label>
                    <input type="date" class="form-control" id="date_fin_client">
                </div>
                <div class="form-group">
                    <label for="type_client">Type Client</label>
                    <input type="text" class="form-control" id="type_client">
                </div>
                <button type="submit" class="btn btn-success">Sauvegarder</button>
                <button type="button" class="btn btn-secondary" onclick="hideForm('${page}')">Annuler</button>
            `;
            break;
        case 'produits':
            formHtml += `
                <div class="form-group">
                    <label for="nom_produit">Nom Produit</label>
                    <input type="text" class="form-control" id="nom_produit" required>
                </div>
                <div class="form-group">
                    <label for="categorie_produit">Catégorie Produit</label>
                    <input type="text" class="form-control" id="categorie_produit">
                </div>
                <div class="form-group">
                    <label for="date_debut">Date Début</label>
                    <input type="date" class="form-control" id="date_debut" required>
                </div>
                <div class="form-group">
                    <label for="date_fin">Date Fin</label>
                    <input type="date" class="form-control" id="date_fin">
                </div>
                <button type="submit" class="btn btn-success">Sauvegarder</button>
                <button type="button" class="btn btn-secondary" onclick="hideForm('${page}')">Annuler</button>
            `;
            break;
        case 'tvas':
            formHtml += `
                <div class="form-group">
                    <label for="taux_tva">Taux TVA</label>
                    <input type="number" step="0.01" class="form-control" id="taux_tva" required>
                </div>
                <div class="form-group">
                    <label for="date_debut_tva">Date Début TVA</label>
                    <input type="date" class="form-control" id="date_debut_tva" required>
                </div>
                <div class="form-group">
                    <label for="date_fin_tva">Date Fin TVA</label>
                    <input type="date" class="form-control" id="date_fin_tva">
                </div>
                <div class="form-group">
                    <label for="type_tva">Type TVA</label>
                    <input type="text" class="form-control" id="type_tva">
                </div>
                <button type="submit" class="btn btn-success">Sauvegarder</button>
                <button type="button" class="btn btn-secondary" onclick="hideForm('${page}')">Annuler</button>
            `;
            break;
        case 'tarifications':
            formHtml += `
                <div class="form-group">
                    <label for="id_produit">ID Produit</label>
                    <input type="number" class="form-control" id="id_produit" required>
                </div>
                <div class="form-group">
                    <label for="type_tarif">Type Tarif</label>
                    <input type="text" class="form-control" id="type_tarif">
                </div>
                <div class="form-group">
                    <label for="prix_ht">Prix HT</label>
                    <input type="number" step="0.01" class="form-control" id="prix_ht" required>
                </div>
                <div class="form-group">
                    <label for="tva">TVA</label>
                    <input type="number" class="form-control" id="tva" required>
                </div>
                <div class="form-group">
                    <label for="date_debut">Date Début</label>
                    <input type="date" class="form-control" id="date_debut" required>
                </div>
                <div class="form-group">
                    <label for="date_fin">Date Fin</label>
                    <input type="date" class="form-control" id="date_fin">
                </div>
                <div class="form-group">
                    <label for="remise">Remise</label>
                    <input type="number" step="0.01" class="form-control" id="remise">
                </div>
                <button type="submit" class="btn btn-success">Sauvegarder</button>
                <button type="button" class="btn btn-secondary" onclick="hideForm('${page}')">Annuler</button>
            `;
            break;
        case 'factures':
            formHtml += `
                <div class="form-group">
                    <label for="date_facture">Date Facture</label>
                    <input type="date" class="form-control" id="date_facture" required>
                </div>
                <div class="form-group">
                    <label for="id_client">ID Client</label>
                    <input type="number" class="form-control" id="id_client" required>
                </div>
                <div class="form-group">
                    <label for="total_ht">Total HT</label>
                    <input type="number" step="0.01" class="form-control" id="total_ht" required>
                </div>
                <div class="form-group">
                    <label for="total_tva">Total TVA</label>
                    <input type="number" step="0.01" class="form-control" id="total_tva" required>
                </div>
                <div class="form-group">
                    <label for="total_ttc">Total TTC</label>
                    <input type="number" step="0.01" class="form-control" id="total_ttc" required>
                </div>
                <button type="submit" class="btn btn-success">Sauvegarder</button>
                <button type="button" class="btn btn-secondary" onclick="hideForm('${page}')">Annuler</button>
            `;
            break;
        case 'lignes_facture':
            formHtml += `
                <div class="form-group">
                    <label for="id_facture">ID Facture</label>
                    <input type="number" class="form-control" id="id_facture" required>
                </div>
                <div class="form-group">
                    <label for="id_produit">ID Produit</label>
                    <input type="number" class="form-control" id="id_produit" required>
                </div>
                <div class="form-group">
                    <label for="designation">Désignation</label>
                    <input type="text" class="form-control" id="designation" required>
                </div>
                <div class="form-group">
                    <label for="pu_ht">Prix Unitaire HT</label>
                    <input type="number" step="0.01" class="form-control" id="pu_ht" required>
                </div>
                <div class="form-group">
                    <label for="quantite">Quantité</label>
                    <input type="number" class="form-control" id="quantite" required>
                </div>
                <div class="form-group">
                    <label for="taux_tva">Taux TVA</label>
                    <input type="number" step="0.01" class="form-control" id="taux_tva" required>
                </div>
                <div class="form-group">
                    <label for="total_ht">Total HT</label>
                    <input type="number" step="0.01" class="form-control" id="total_ht" required>
                </div>
                <div class="form-group">
                    <label for="total_tva">Total TVA</label>
                    <input type="number" step="0.01" class="form-control" id="total_tva" required>
                </div>
                <div class="form-group">
                    <label for="total_ttc">Total TTC</label>
                    <input type="number" step="0.01" class="form-control" id="total_ttc" required>
                </div>
                <button type="submit" class="btn btn-success">Sauvegarder</button>
                <button type="button" class="btn btn-secondary" onclick="hideForm('${page}')">Annuler</button>
            `;
            break;
        default:
            console.log('Page non reconnue');
    }

    formHtml += '</form>';
    return formHtml;
}

function generateTable(page) {
    let tableHtml = `<table class="table table-striped" id="${page}Table">
        <thead>
            <tr>
    `;

    switch (page) {
        case 'clients':
            tableHtml += `
                <th>ID</th>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Ville</th>
                <th>Code Postal</th>
                <th>Pays</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Date Début Client</th>
                <th>Date Fin Client</th>
                <th>Type Client</th>
            `;
            break;
        case 'produits':
            tableHtml += `
                <th>ID</th>
                <th>Nom Produit</th>
                <th>Catégorie Produit</th>
                <th>Date Début</th>
                <th>Date Fin</th>
            `;
            break;
        case 'tvas':
            tableHtml += `
                <th>ID</th>
                <th>Taux TVA</th>
                <th>Date Début TVA</th>
                <th>Date Fin TVA</th>
                <th>Type TVA</th>
            `;
            break;
        case 'tarifications':
            tableHtml += `
                <th>ID</th>
                <th>ID Produit</th>
                <th>Type Tarif</th>
                <th>Prix HT</th>
                <th>TVA</th>
                <th>Prix TTC</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Remise</th>
            `;
            break;
        case 'factures':
            tableHtml += `
                <th>ID</th>
                <th>Date Facture</th>
                <th>ID Client</th>
                <th>Total HT</th>
                <th>Total TVA</th>
                <th>Total TTC</th>
            `;
            break;
        case 'lignes_facture':
            tableHtml += `
                <th>ID</th>
                <th>ID Facture</th>
                <th>ID Produit</th>
                <th>Désignation</th>
                <th>Prix Unitaire HT</th>
                <th>Quantité</th>
                <th>Taux TVA</th>
                <th>Total HT</th>
                <th>Total TVA</th>
                <th>Total TTC</th>
            `;
            break;
        default:
            console.log('Page non reconnue');
    }

    tableHtml += `
            </tr>
        </thead>
        <tbody>
            <!-- Données seront chargées ici -->
        </tbody>
    </table>`;
    return tableHtml;
}

function showForm(page) {
    document.getElementById(`${page}Form`).classList.add('show');
}

function hideForm(page) {
    document.getElementById(`${page}Form`).classList.remove('show');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Fonctions pour charger les données
function loadData(page) {
    fetch(`/api/${page}`)
        .then(response => response.json())
        .then(data => {
            displayData(page, data);
        })
        .catch(error => {
            console.error(`Erreur lors du chargement des ${page}:`, error);
        });
}

function displayData(page, data) {
    const tableBody = document.getElementById(`${page}Table`).getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        switch (page) {
            case 'clients':
                row.innerHTML = `
                    <td>${item.id_client}</td>
                    <td>${item.nom}</td>
                    <td>${item.adresse}</td>
                    <td>${item.ville}</td>
                    <td>${item.code_postal}</td>
                    <td>${item.pays}</td>
                    <td>${item.email}</td>
                    <td>${item.telephone}</td>
                    <td>${item.date_debut_client}</td>
                    <td>${item.date_fin_client}</td>
                    <td>${item.type_client}</td>
                `;
                break;
            case 'produits':
                row.innerHTML = `
                    <td>${item.id_produit}</td>
                    <td>${item.nom_produit}</td>
                    <td>${item.categorie_produit}</td>
                    <td>${item.date_debut}</td>
                    <td>${item.date_fin}</td>
                `;
                break;
            case 'tvas':
                row.innerHTML = `
                    <td>${item.id_tva}</td>
                    <td>${item.taux_tva}</td>
                    <td>${item.date_debut_tva}</td>
                    <td>${item.date_fin_tva}</td>
                    <td>${item.type_tva}</td>
                `;
                break;
            case 'tarifications':
                row.innerHTML = `
                    <td>${item.id_tarif}</td>
                    <td>${item.id_produit}</td>
                    <td>${item.type_tarif}</td>
                    <td>${item.prix_ht}</td>
                    <td>${item.tva}</td>
                    <td>${item.prix_ttc}</td>
                    <td>${item.date_debut}</td>
                    <td>${item.date_fin}</td>
                    <td>${item.remise}</td>
                `;
                break;
            case 'factures':
                row.innerHTML = `
                    <td>${item.id_facture}</td>
                    <td>${item.date_facture}</td>
                    <td>${item.id_client}</td>
                    <td>${item.total_ht}</td>
                    <td>${item.total_tva}</td>
                    <td>${item.total_ttc}</td>
                `;
                break;
            case 'lignes_facture':
                row.innerHTML = `
                    <td>${item.id_ligne_facture}</td>
                    <td>${item.id_facture}</td>
                    <td>${item.id_produit}</td>
                    <td>${item.designation}</td>
                    <td>${item.pu_ht}</td>
                    <td>${item.quantite}</td>
                    <td>${item.taux_tva}</td>
                    <td>${item.total_ht}</td>
                    <td>${item.total_tva}</td>
                    <td>${item.total_ttc}</td>
                `;
                break;
            default:
                console.log('Page non reconnue');
        }
        tableBody.appendChild(row);
    });
}

// Gestion des formulaires
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            const page = form.id.replace('Form', '');

            fetch(`/api/${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                alert(`${capitalizeFirstLetter(page)} ajouté avec succès !`);
                loadData(page);
                hideForm(page);
            })
            .catch(error => {
                console.error(`Erreur lors de l'ajout de ${page}:`, error);
            });
        });
    });

    // Charger la page par défaut (par exemple, "clients")
    loadPage('clients');
});
