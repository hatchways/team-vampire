from .shared import db, datetime

class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    day = db.Column(db.Integer, nullable=False)
    start_time = db.Column(db.Integer, nullable=False, default=540)
    end_time = db.Column(db.Integer, nullable=False, default=1020)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)