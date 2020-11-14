import os
from dotenv import load_dotenv
load_dotenv()

class Config(object):
    DEBUG = False
    TESTING = False
    TEAM_NAME = os.getenv('TEAM_NAME')
    SQLALCHEMY_DATABASE_URI = "sqlite:///example.sqlite"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_COOKIE_NAME = "google-login-session"

class ProductionConfig(Config):
    pass
    #SQLALCHEMY_DATABASE_URI = 'mysql://user@localhost/foo'

class DevelopmentConfig(Config):
    DEBUG = True



