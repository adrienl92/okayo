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
    formHtml += `<form id="${page}Form" class="form-container">`;

    // Formulaire pour "clients"
    if (page === 'clients') {
        formHtml += `
            <div class="form-group">
                <label for="nom">Nom</label>
                <input type="text" class="form-control" id="nom" name="nom" required>
            </div>
            <div class="form-group">
                <label for="adresse">Adresse</label>
                <textarea class="form-control" id="adresse" name="adresse"></textarea>
            </div>
            <div class="form-group">
                <label for="ville">Ville</label>
                <input type="text" class="form-control" id="ville" name="ville">
            </div>
            <div class="form-group">
                <label for="code_postal">Code Postal</label>
                <input type="text" class="form-control" id="code_postal" name="code">
            </div>
            <div class="form-group">
                <label for="pays">Pays</label>
                <input type="text" class="form-control" id="pays" name="pays">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email">
            </div>
            <div class="form-group">
                <label for="telephone">Téléphone</label>
                <input type="text" class="form-control" id="telephone" name="telephone">
            </div>
            <div class="form-group">
                <label for="date_debut_client">Date Début Client</label>
                <input type="date" class="form-control" id="date_debut_client" name="dd">
            </div>
            <div class="form-group">
                <label for="date_fin_client">Date Fin Client</label>
                <input type="date" class="form-control" id="date_fin_client" name="df">
            </div>
            <div class="form-group">
                <label for="type_client">Type Client</label>
                <input type="text" class="form-control" id="type_client" name="type">
            </div>
            <button type="submit" class="btn btn-success">Sauvegarder</button>
            <button type="button" class="btn btn-secondary" onclick="hideForm('${page}')">Annuler</button>
        `;
    }

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
    console.log(`Affichage du formulaire pour ${page}`);
    const formElement = document.getElementById(`${page}Form`);
    if (formElement) {
        console.log(`Formulaire trouvé :`, formElement);
        formElement.classList.add('show');
    } else {
        console.error(`Formulaire non trouvé pour ${page}`);
    }
}

// Fonction pour cacher le formulaire
function hideForm(page) {
    console.log(`Masquage du formulaire pour ${page}`);
    const formElement = document.getElementById(`${page}Form`);
    if (formElement) {
        console.log(`Formulaire trouvé :`, formElement);
        formElement.classList.remove('show');
    } else {
        console.error(`Formulaire non trouvé pour ${page}`);
    }
}

// Fonction pour capitaliser la première lettre d'un mot
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Charger les données de la page depuis l'API
function loadData(page) {
    fetch(`http://127.0.0.1:8080/api/${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
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
    // Gérer la soumission du formulaire pour chaque page
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêcher la soumission classique du formulaire (c'est ici que le rechargement est empêché)

            // Récupérer les données du formulaire
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;  // Crée un objet JSON avec les données
            });

            // Afficher les données dans la console pour débogage
            console.log("Données envoyées :", data);

            const page = form.id.replace('Form', '');  // Récupère le nom de la page (clients, produits, etc.)

            // Envoyer la requête POST au serveur Flask
            fetch(`localhost:8080/api/${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)  // Envoyer les données sous forme de JSON
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert(`${capitalizeFirstLetter(page)} ajouté avec succès !`);
                loadData(page);  // Recharger les données de la page après ajout
                hideForm(page);  // Masquer le formulaire
            })
            .catch(error => {
                console.error(`Erreur lors de l'ajout de ${page}:`, error);
            });
        });
    });

    // Charger la page "clients" par défaut
    loadPage('clients');
});



