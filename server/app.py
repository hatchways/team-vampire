from flask import Flask
from api.ping_handler import ping_handler
from api.home_handler import home_handler

# Database
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from models import shared
# Models
from models import user, appointment, meeting, availability


app = Flask(__name__)
# Load from config after
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.sqlite"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = shared.db
db.init_app(app)
ma = Marshmallow(app)

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

if __name__ == '__main__':
    manager.run()