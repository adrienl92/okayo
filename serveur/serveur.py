from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Configuration de la base de données
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'gestion_facturation'
}

def get_db_connection():
    conn = mysql.connector.connect(**db_config)
    return conn

@app.route('/api/clients', methods=['GET', 'POST'])
def clients():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Clients')
        clients = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(clients)
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO Clients (nom, adresse, ville, code_postal, pays, email, telephone, date_debut_client, date_fin_client, type_client)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
        cursor.close()
        conn.close()
        return jsonify({'message': 'Client ajouté', 'id': cursor.lastrowid})

@app.route('/api/produits', methods=['GET', 'POST'])
def produits():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Produits')
        produits = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(produits)
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO Produits (nom_produit, categorie_produit, date_debut, date_fin)
            VALUES (%s, %s, %s, %s)
        ''', (
            data['nom_produit'],
            data['categorie_produit'],
            data['date_debut'],
            data['date_fin']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Produit ajouté', 'id': cursor.lastrowid})

@app.route('/api/tvas', methods=['GET', 'POST'])
def tvas():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM TVA')
        tvas = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(tvas)
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO TVA (taux_tva, date_debut_tva, date_fin_tva, type_tva)
            VALUES (%s, %s, %s, %s)
        ''', (
            data['taux_tva'],
            data['date_debut_tva'],
            data['date_fin_tva'],
            data['type_tva']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'TVA ajoutée', 'id': cursor.lastrowid})

@app.route('/api/tarifications', methods=['GET', 'POST'])
def tarifications():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Tarification')
        tarifications = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(tarifications)
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO Tarification (id_produit, type_tarif, prix_ht, tva, date_debut, date_fin, remise)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
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
        cursor.close()
        conn.close()
        return jsonify({'message': 'Tarification ajoutée', 'id': cursor.lastrowid})

@app.route('/api/factures', methods=['GET', 'POST'])
def factures():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Factures')
        factures = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(factures)
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO Factures (date_facture, id_client, total_ht, total_tva, total_ttc)
            VALUES (%s, %s, %s, %s, %s)
        ''', (
            data['date_facture'],
            data['id_client'],
            data['total_ht'],
            data['total_tva'],
            data['total_ttc']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Facture ajoutée', 'id': cursor.lastrowid})

@app.route('/api/lignes_facture', methods=['GET', 'POST'])
def lignes_facture():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM LignesFacture')
        lignes_facture = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(lignes_facture)
    elif request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO LignesFacture (id_facture, id_produit, designation, pu_ht, quantite, taux_tva, total_ht, total_tva, total_ttc)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
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
        cursor.close()
        conn.close()
        return jsonify({'message': 'Ligne de facture ajoutée', 'id': cursor.lastrowid})

if __name__ == '__main__':
    app.run(debug=True)