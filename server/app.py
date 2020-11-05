from flask import Flask, request, jsonify
from config import DevelopmentConfig

# Routes
from api.ping_handler import ping_handler
from api.home_handler import home_handler
from api.user_handler import user_handler
from api.meeting_handler import meeting_handler
from api.appointment_handler import appointment_handler

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
app.secret_key = "secret key here"
db.init_app(app)
migrate = Migrate(app, db, render_as_batch=True, compare_type=True)
manager = Manager(app)
manager.add_command('db', MigrateCommand)


app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
app.register_blueprint(user_handler)
app.register_blueprint(meeting_handler)
app.register_blueprint(appointment_handler)


if __name__ == '__main__':
    manager.run()