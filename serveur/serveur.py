from flask import Flask, request, jsonify
from flask_cors import CORS  # Importer CORS pour gérer les requêtes cross-origin
import sqlite3

app = Flask(__name__)
CORS(app)  # Activer CORS pour permettre les requêtes depuis le front-end

DB_PATH = 'bddokayo.db'  # Chemin de la base de données SQLite

# Fonction pour se connecter à la base de données
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Permet d'accéder aux colonnes par leur nom
    return conn

# Route pour récupérer tous les clients
@app.route('/api/clients', methods=['GET', 'POST'])
def clients():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM clients')  # Table clients en minuscule
        clients = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(client) for client in clients])  # Retourne les clients en JSON
    elif request.method == 'POST':
        data = request.get_json()  # Récupère les données envoyées en JSON
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO clients (nom, adresse, ville, code_postal, pays, email, telephone, date_debut_client, date_fin_client, type_client)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['nom'], data['adresse'], data['ville'], data['code_postal'], data['pays'], 
            data['email'], data['telephone'], data['date_debut_client'], data['date_fin_client'], data['type_client']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Client ajouté', 'id': cursor.lastrowid}), 201  # Retourne un message de succès

# Route pour récupérer tous les produits
@app.route('/api/produits', methods=['GET', 'POST'])
def produits():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM produits')  # Table produits en minuscule
        produits = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(produit) for produit in produits])  # Retourne les produits en JSON
    elif request.method == 'POST':
        data = request.get_json()  # Récupère les données envoyées en JSON
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO produits (nom_produit, categorie_produit, date_debut, date_fin)
            VALUES (?, ?, ?, ?)
        ''', (
            data['nom_produit'], data['categorie_produit'], data['date_debut'], data['date_fin']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Produit ajouté', 'id': cursor.lastrowid}), 201  # Retourne un message de succès

# Route pour récupérer tous les taux de TVA
@app.route('/api/tvas', methods=['GET', 'POST'])
def tvas():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM tva')  # Table tva en minuscule
        tvas = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(tva) for tva in tvas])  # Retourne les taux de TVA en JSON
    elif request.method == 'POST':
        data = request.get_json()  # Récupère les données envoyées en JSON
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO tva (taux_tva, date_debut_tva, date_fin_tva, type_tva)
            VALUES (?, ?, ?, ?)
        ''', (
            data['taux_tva'], data['date_debut_tva'], data['date_fin_tva'], data['type_tva']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'TVA ajoutée', 'id': cursor.lastrowid}), 201  # Retourne un message de succès

# Route pour récupérer toutes les tarifications
@app.route('/api/tarifications', methods=['GET', 'POST'])
def tarifications():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM tarification')  # Table tarification en minuscule
        tarifications = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(tarification) for tarification in tarifications])  # Retourne les tarifications en JSON
    elif request.method == 'POST':
        data = request.get_json()  # Récupère les données envoyées en JSON
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO tarification (id_produit, type_tarif, prix_ht, tva, date_debut, date_fin, remise)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['id_produit'], data['type_tarif'], data['prix_ht'], data['tva'], 
            data['date_debut'], data['date_fin'], data['remise']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Tarification ajoutée', 'id': cursor.lastrowid}), 201  # Retourne un message de succès

# Route pour récupérer toutes les factures
@app.route('/api/factures', methods=['GET', 'POST'])
def factures():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM factures')  # Table factures en minuscule
        factures = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(facture) for facture in factures])  # Retourne les factures en JSON
    elif request.method == 'POST':
        data = request.get_json()  # Récupère les données envoyées en JSON
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO factures (date_facture, id_client, total_ht, total_tva, total_ttc)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            data['date_facture'], data['id_client'], data['total_ht'], 
            data['total_tva'], data['total_ttc']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Facture ajoutée', 'id': cursor.lastrowid}), 201  # Retourne un message de succès

# Route pour récupérer toutes les lignes de facture
@app.route('/api/lignes_facture', methods=['GET', 'POST'])
def lignes_facture():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM lignesfacture')  # Table lignesfacture en minuscule
        lignes_facture = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(ligne) for ligne in lignes_facture])  # Retourne les lignes de facture en JSON
    elif request.method == 'POST':
        data = request.get_json()  # Récupère les données envoyées en JSON
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO lignesfacture (id_facture, id_produit, designation, pu_ht, quantite, taux_tva, total_ht, total_tva, total_ttc)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['id_facture'], data['id_produit'], data['designation'], data['pu_ht'],
            data['quantite'], data['taux_tva'], data['total_ht'], data['total_tva'], data['total_ttc']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Ligne de facture ajoutée', 'id': cursor.lastrowid}), 201  # Retourne un message de succès

if __name__ == '__main__':
    app.run(debug=True)

