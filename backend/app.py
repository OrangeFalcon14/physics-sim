from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import json

app = Flask(__name__)
app.secret_key = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    scenes = db.relationship('Scene', backref='owner', lazy=True)

class Scene(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(20))
    data = db.Column(db.Text, nullable=False)
    last_edited = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

@app.route('/')
def home():
    if 'user_id' in session:
        return render_template('dashboard.html')
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            return redirect(url_for('home'))
        else:
            return 'Invalid credentials'
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        hashed_password = generate_password_hash(password, method='pbkdf2')
        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('home'))

@app.route('/scenes')
def get_scenes():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    user_scenes = Scene.query.filter_by(user_id=user_id).all()
    scenes_list = []
    for scene in user_scenes:
        scenes_list.append({
            'id': scene.id,
            'data': json.loads(scene.data),
            'last_edited': scene.last_edited.isoformat()
        })
    return jsonify(scenes_list)

@app.route('/my_scenes')
def my_scenes():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    user_id = session['user_id']
    user_scenes = Scene.query.filter_by(user_id=user_id).all()
    return render_template('my_scenes.html', scenes=user_scenes)

if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True)
