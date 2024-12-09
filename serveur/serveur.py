from flask import Flask, request, jsonify
from flask_cors import CORS  # Importer CORS pour gérer les requêtes cross-origin
import sqlite3

app = Flask(__name__)
CORS(app)  # Activer CORS

DB_PATH = 'bddokayo.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Routes pour les Clients
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
            data['nom'], data['adresse'], data['ville'], data['code_postal'], data['pays'], 
            data['email'], data['telephone'], data['date_debut_client'], data['date_fin_client'], data['type_client']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Client ajouté', 'id': cursor.lastrowid})

if __name__ == '__main__':
    app.run(debug=True)

