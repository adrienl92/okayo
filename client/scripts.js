// Fonction pour charger la page demandée (clients, produits, etc.)
function loadPage(page) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Effacer le contenu précédent

    // Générer le formulaire et la table en fonction de la page demandée
    contentDiv.innerHTML = generateForm(page) + generateTable(page);
    
    loadData(page);  // Charger les données de la page via l'API
}

// Fonction pour générer un formulaire pour une page donnée
function generateForm(page) {
    let formHtml = `<h2>${capitalizeFirstLetter(page)}</h2>`;
    formHtml += `<button class="btn btn-primary mb-3" onclick="showForm('${page}')">Ajouter un ${capitalizeFirstLetter(page)}</button>`;
    formHtml += `<form id="${page}Form" class="form-container" style="display:none;">`;

    // Formulaire pour "clients"
    if (page === 'clients') {
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
        `;
    }

    // Formulaire pour "produits"
    if (page === 'produits') {
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
                <input type="date" class="form-control" id="date_debut">
            </div>
            <div class="form-group">
                <label for="date_fin">Date Fin</label>
                <input type="date" class="form-control" id="date_fin">
            </div>
        `;
    }

    // Formulaire pour "tvas"
    if (page === 'tvas') {
        formHtml += `
            <div class="form-group">
                <label for="taux_tva">Taux TVA</label>
                <input type="number" step="0.01" class="form-control" id="taux_tva">
            </div>
            <div class="form-group">
                <label for="date_debut_tva">Date Début TVA</label>
                <input type="date" class="form-control" id="date_debut_tva">
            </div>
            <div class="form-group">
                <label for="date_fin_tva">Date Fin TVA</label>
                <input type="date" class="form-control" id="date_fin_tva">
            </div>
            <div class="form-group">
                <label for="type_tva">Type TVA</label>
                <input type="text" class="form-control" id="type_tva">
            </div>
        `;
    }

    // Formulaire pour "tarifications"
    if (page === 'tarifications') {
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
                <input type="date" class="form-control" id="date_debut">
            </div>
            <div class="form-group">
                <label for="date_fin">Date Fin</label>
                <input type="date" class="form-control" id="date_fin">
            </div>
            <div class="form-group">
                <label for="remise">Remise</label>
                <input type="number" step="0.01" class="form-control" id="remise">
            </div>
        `;
    }

    // Ajouter des formulaires pour "factures" et "lignes_facture" ici

    formHtml += `
        <button type="submit" class="btn btn-success">Sauvegarder</button>
        <button type="button" class="btn btn-secondary" onclick="hideForm('${page}')">Annuler</button>
    </form>`;
    return formHtml;
}

// Fonction pour générer une table pour afficher les données
function generateTable(page) {
    let tableHtml = `<table class="table table-striped" id="${page}Table">
        <thead>
            <tr>
    `;

    // Colonnes pour "clients"
    if (page === 'clients') {
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
    }

    // Colonnes pour "produits"
    if (page === 'produits') {
        tableHtml += `
            <th>ID</th>
            <th>Nom Produit</th>
            <th>Catégorie Produit</th>
            <th>Date Début</th>
            <th>Date Fin</th>
        `;
    }

    // Colonnes pour "tvas"
    if (page === 'tvas') {
        tableHtml += `
            <th>ID</th>
            <th>Taux TVA</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Type TVA</th>
        `;
    }

    // Colonnes pour "tarifications"
    if (page === 'tarifications') {
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

// Fonction pour afficher le formulaire
function showForm(page) {
    const formElement = document.getElementById(`${page}Form`);
    if (formElement) {
        formElement.classList.add('show');
    }
}

// Fonction pour cacher le formulaire
function hideForm(page) {
    const formElement = document.getElementById(`${page}Form`);
    if (formElement) {
        formElement.classList.remove('show');
    }
}

// Fonction pour capitaliser la première lettre d'un mot
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Charger les données de la page depuis l'API
function loadData(page) {
    fetch(`http://127.0.0.1:8080/api/${page}`)
        .then(response => response.json())
        .then(data => {
            displayData(page, data);
        })
        .catch(error => {
            console.error(`Erreur lors du chargement des ${page}:`, error);
        });
}

// Afficher les données dans la table
function displayData(page, data) {
    const tableBody = document.getElementById(`${page}Table`).getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        if (page === 'clients') {
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
        }
        // Ajouter plus de cas pour les autres pages comme "produits", "tvas", etc.
        tableBody.appendChild(row);
    });
}


