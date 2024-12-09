// Fonction pour charger une page dynamique
function loadPage(page) {
    // Effectuer une requête AJAX pour obtenir les données de la page
    $.ajax({
        url: `http://127.0.0.1:5000/api/${page}`, // Requête vers l'API du serveur Flask
        type: 'GET',
        success: function(data) {
            let content = '';

            // Traitement des données pour l'affichage
            if (page === 'clients') {
                content = '<h2>Clients</h2><ul>';
                data.forEach(client => {
                    content += `<li>${client.nom} - ${client.email}</li>`;
                });
                content += '</ul>';
            }

            // Afficher le formulaire si on clique sur "Ajouter un client"
            if (page === 'clients') {
                document.getElementById('clientForm').classList.add('show');
            }

            // Mettre à jour le contenu de la page
            $('#content').html(content);
        },
        error: function(err) {
            $('#content').html('<p>Erreur lors du chargement des données.</p>');
        }
    });
}

// Ajouter un client via API
document.getElementById('addClientBtn').addEventListener('click', function() {
    var clientData = {
        nom: document.getElementById('clientName').value,
        adresse: document.getElementById('clientAdresse').value,
        email: document.getElementById('clientEmail').value
    };

    // Vérification que toutes les valeurs nécessaires sont présentes
    if (!clientData.nom || !clientData.email) {
        alert('Veuillez remplir tous les champs nécessaires.');
        return;
    }

    // Envoi des données au serveur via l'API
    fetch('http://127.0.0.1:5000/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Client ajouté avec succès:', data);
        // Réinitialiser le formulaire
        document.getElementById('clientFormData').reset();
        // Vous pouvez afficher un message ou mettre à jour la liste des clients
        loadPage('clients');
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout du client:', error);
    });
});

