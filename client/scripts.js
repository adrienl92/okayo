// Fonction pour charger la page demandée (clients, produits, etc.)
function loadPage(page) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Effacer le contenu précédent

    // Générer le formulaire et la table en fonction de la page demandée
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
            <button type="submit" class="btn btn-success">Sauvegarder</button>
            <button type="button" class="btn btn-secondary" onclick="hideForm('${page}')">Annuler</button>
        `;
    }

    // Vous pouvez ajouter d'autres pages comme 'produits', 'tvas', etc.

    formHtml += '</form>';
    return formHtml;
}

// Fonction pour générer une table pour afficher les données
function generateTable(page) {
    let tableHtml = `<table class="table table-striped" id="${page}Table">
        <thead>
            <tr>
    `;
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
    document.getElementById(`${page}Form`).classList.add('show');
}

// Fonction pour cacher le formulaire
function hideForm(page) {
    document.getElementById(`${page}Form`).classList.remove('show');
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

            fetch(`http://127.0.0.1:8080/api/${page}`, {
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

    // Charger la page "clients" par défaut
    loadPage('clients');
});


