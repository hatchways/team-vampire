from .shared import db, datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(80), unique=True)
    timezone = db.Column(db.String(50), nullable=False)
    access_token = db.Column(db.Text, nullable=False)
    stripe_customer_id = db.Column(db.String(25), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    availability = db.relationship("Availability", backref="user")
    meetings = db.relationship("Meeting", backref="user")