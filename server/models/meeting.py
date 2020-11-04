from . import shared
from datetime import datetime
db = shared.db


class Meeting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    name = db.Column(db.String(255), nullable=False, default="60 Minute Meeting")
    description = db.Column(db.Text, default="One-on-one")
    duration = db.Column(db.Integer, nullable=False, default=60)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    appointments = db.relationship("Appointment", backref="meeting")