from .shared import db, datetime

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.Integer, db.ForeignKey("meeting.id"))
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(80), unique=False, nullable=False)
    time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    timezone = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)