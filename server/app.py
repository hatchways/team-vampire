from flask import Flask, request, jsonify, url_for, redirect, session
from config import DevelopmentConfig
import os
from datetime import timedelta

# dotenv setup
from dotenv import load_dotenv
load_dotenv()

# Routes
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.user_handler import user_handler
from api.meeting_handler import meeting_handler
from api.appointment_handler import appointment_handler
from api.availability_handler import availability_handler

#OAuth Library 
from authlib.integrations.flask_client import OAuth

# Database
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

# Models
from models.shared import db
from models.availability import Availability
from models.appointment import Appointment
from models.meeting import Meeting
from models.user import User


app = Flask(__name__)
app.config.from_object(DevelopmentConfig())
app.secret_key = os.getenv("APP_SECRET_KEY") # will change to stronger randomly generated password
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)
db.init_app(app)
migrate = Migrate(app, db, render_as_batch=True, compare_type=True)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

# OAuth Config
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',  # This is only needed if using openId to fetch user info
    client_kwargs={'scope': 'openid email profile'},
)

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(user_handler)
app.register_blueprint(meeting_handler)
app.register_blueprint(appointment_handler)
app.register_blueprint(availability_handler)

# Server Test Route
@app.route('/', methods=["GET"])
def hello_world():
    # email = dict(session).get('profile', {"email": "None"})['email']
    # print(email)
    return jsonify(dict(session)), 200

@app.route('/login')
def login():
    google = oauth.create_client('google')
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/authorize')
def authorize():
    google = oauth.create_client('google')
    token = google.authorize_access_token()
    resp = google.get('userinfo')
    user_info = resp.json()
    user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
    # Here you use the profile/user data that you got and query your database find/register the user
    # and set ur own data in the session not the profile from google
    session['profile'] = user_info
    # Create user in db with info provided
    new_user = User(username=user.name, email=user.email, access_token=123)
    db.session.add(new_user)
    db.session.commit()

    users = User.query.all()
    for u in users:
        print(u.id, u.username)


    session['token'] = token
    session.permanent = True  # make the session permanant so it keeps existing after broweser gets closed
    return redirect('/')

@app.route('/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect('/')

if __name__ == '__main__':
    manager.run()