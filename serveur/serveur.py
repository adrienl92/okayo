from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Autorise toutes les origines

# Configuration de la base de données SQLite
DB_PATH = 'bddokayo.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db_connection() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS Clients (
                id_client INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL,
                adresse TEXT,
                ville TEXT,
                code_postal TEXT,
                pays TEXT,
                email TEXT,
                telephone TEXT,
                date_debut_client DATE,
                date_fin_client DATE,
                type_client TEXT
            )
        ''')
        conn.commit()

@app.before_first_request
def create_tables():
    init_db()

@app.route('/api/clients', methods=['GET', 'POST'])
def clients():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM Clients')
        clients = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(client) for client in clients])
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO Clients (nom, adresse, ville, code_postal, pays, email, telephone, date_debut_client, date_fin_client, type_client)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['nom'],
            data['adresse'],
            data['ville'],
            data['code_postal'],
            data['pays'],
            data['email'],
            data['telephone'],
            data['date_debut_client'],
            data['date_fin_client'],
            data['type_client']
        ))
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return jsonify({'message': 'Client ajouté', 'id': last_id}), 201

@app.route('/api/produits', methods=['GET', 'POST'])
def produits():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM Produits')
        produits = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(produit) for produit in produits])
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO Produits (nom_produit, categorie_produit, date_debut, date_fin)
            VALUES (?, ?, ?, ?)
        ''', (
            data['nom_produit'],
            data['categorie_produit'],
            data['date_debut'],
            data['date_fin']
        ))
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return jsonify({'message': 'Produit ajouté', 'id': last_id}), 201

@app.route('/api/tvas', methods=['GET', 'POST'])
def tvas():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM TVA')
        tvas = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(tva) for tva in tvas])
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO TVA (taux_tva, date_debut_tva, date_fin_tva, type_tva)
            VALUES (?, ?, ?, ?)
        ''', (
            data['taux_tva'],
            data['date_debut_tva'],
            data['date_fin_tva'],
            data['type_tva']
        ))
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return jsonify({'message': 'TVA ajoutée', 'id': last_id}), 201

@app.route('/api/tarifications', methods=['GET', 'POST'])
def tarifications():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM Tarification')
        tarifications = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(tarification) for tarification in tarifications])
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO Tarification (id_produit, type_tarif, prix_ht, tva, date_debut, date_fin, remise)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['id_produit'],
            data['type_tarif'],
            data['prix_ht'],
            data['tva'],
            data['date_debut'],
            data['date_fin'],
            data['remise']
        ))
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return jsonify({'message': 'Tarification ajoutée', 'id': last_id}), 201

@app.route('/api/factures', methods=['GET', 'POST'])
def factures():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM Factures')
        factures = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(facture) for facture in factures])
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO Factures (date_facture, id_client, total_ht, total_tva, total_ttc)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            data['date_facture'],
            data['id_client'],
            data['total_ht'],
            data['total_tva'],
            data['total_ttc']
        ))
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return jsonify({'message': 'Facture ajoutée', 'id': last_id}), 201

@app.route('/api/lignes_facture', methods=['GET', 'POST'])
def lignes_facture():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM LignesFacture')
        lignes_facture = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([dict(ligne) for ligne in lignes_facture])
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO LignesFacture (id_facture, id_produit, designation, pu_ht, quantite, taux_tva, total_ht, total_tva, total_ttc)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['id_facture'],
            data['id_produit'],
            data['designation'],
            data['pu_ht'],
            data['quantite'],
            data['taux_tva'],
            data['total_ht'],
            data['total_tva'],
            data['total_ttc']
        ))
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return jsonify({'message': 'Ligne de facture ajoutée', 'id': last_id}), 201

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
