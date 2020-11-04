from . import shared
from datetime import datetime
db = shared.db

class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.Integer, nullable=False)
    start_time = db.Column(db.Integer, nullable=False, default=540)
    end_time = db.Column(db.Integer, nullable=False, default=1020)
    created_at = db.Column(db.String(30), nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.String(30), nullable=False, default=datetime.utcnow)