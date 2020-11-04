from flask import Flask, request, jsonify
from config import DevelopmentConfig

from api.ping_handler import ping_handler
from api.home_handler import home_handler

# Database
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

# Models
from models import db, Availability, Appointment, Meeting, User


app = Flask(__name__)
app.config.from_object(DevelopmentConfig())

db.init_app(app)
migrate = Migrate(app, db, render_as_batch=True)
manager = Manager(app)
manager.add_command('db', MigrateCommand)


app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)


if __name__ == '__main__':
    manager.run()